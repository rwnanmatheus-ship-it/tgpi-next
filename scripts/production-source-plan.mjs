import { readFile, writeFile, appendFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
const shaPattern=/^[a-f0-9]{40}$/i;
export function previousProductionSha(deployments, statuses, currentId, before) {
 const cutoff=Date.parse(before);let selected;
 if(!Number.isFinite(cutoff))return undefined;
 for(const deployment of deployments){
  if(deployment.id===currentId||!/^production(?:\s|$)/i.test(deployment.environment??'')||!shaPattern.test(deployment.sha??''))continue;
  for(const status of statuses[deployment.id]??[]){
   const time=Date.parse(status.created_at);
   if(status.state==='success'&&Number.isFinite(time)&&time<cutoff&&(!selected||time>selected.time))selected={sha:deployment.sha,time};
  }
 }
 return selected?.sha;
}
export function comparisonSourcePlan(comparison) {
 if(comparison.status==='identical')return {mode:'changed',paths:[]};
 if(comparison.status!=='ahead'||!Array.isArray(comparison.files)||comparison.files.length>=300)return {mode:'full',paths:[]};
 return {mode:'changed',paths:[...new Set(comparison.files.flatMap(file=>[file.filename,file.previous_filename].filter(path=>typeof path==='string')))]};
}
async function main(){
 const repository=process.env.GITHUB_REPOSITORY;
 if(!/^[\w.-]+\/[\w.-]+$/.test(repository??''))throw new Error('Expected a GitHub repository.');
 const head=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
 if(!shaPattern.test(head))throw new Error('Invalid checked-out commit.');
 const event=JSON.parse(await readFile(process.env.GITHUB_EVENT_PATH,'utf8'));
 const before=event.deployment_status?.created_at??new Date().toISOString();
 let plan={mode:'full',paths:[]},base;
 try{
  async function api(path){
   const response=await fetch(`https://api.github.com/repos/${repository}/${path}`,{headers:{Accept:'application/vnd.github+json',Authorization:`Bearer ${process.env.GITHUB_TOKEN}`,'X-GitHub-Api-Version':'2022-11-28'},signal:AbortSignal.timeout(15000)});
   if(!response.ok)throw new Error(`GitHub HTTP ${response.status}`);
   return response.json();
  }
  const deployments=await api('deployments?per_page=100');
  const candidates=deployments.filter(d=>/^production(?:\s|$)/i.test(d.environment??'')&&d.id!==event.deployment?.id).slice(0,20);
  const pairs=await Promise.all(candidates.map(async d=>[d.id,await api(`deployments/${d.id}/statuses?per_page=100`)]));
  base=previousProductionSha(candidates,Object.fromEntries(pairs),event.deployment?.id,before);
  if(base)plan=comparisonSourcePlan(await api(`compare/${base}...${head}`));
 }catch{console.log('Previous production comparison unavailable; using full public submission.');}
 await writeFile('changed-public-source.txt',plan.paths.join('\n'));
 if(process.env.GITHUB_OUTPUT)await appendFile(process.env.GITHUB_OUTPUT,`mode=${plan.mode}\n`);
 console.log(JSON.stringify({mode:plan.mode,base:base??null,head,changedPaths:plan.paths.length}));
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href)await main();
