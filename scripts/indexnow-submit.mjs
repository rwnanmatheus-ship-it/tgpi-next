// Public protocol ownership key, not a credential. Only submits canonical public URLs.
import { readFile } from "node:fs/promises";
import { changedPublicUrls, publicSitemapUrls } from "./indexnow-plan.mjs";
const origin = "https://www.theglobalpolymath.com";
const key = "fed8c3ace0299e7f08380188d09c89f1";
const args=process.argv.slice(2), changedIndex=args.indexOf('--changed-files');
if (!args.includes('--all') && (changedIndex<0||!args[changedIndex+1])) throw new Error('Choose --all or --changed-files PATH.');
const sitemap=await fetch(`${origin}/sitemap.xml`,{signal:AbortSignal.timeout(30000)});
if(!sitemap.ok)throw new Error('Production sitemap is unavailable.');
const urls=publicSitemapUrls(await sitemap.text());
if(!urls.length)throw new Error('No canonical public URLs in production sitemap.');
const changed=changedIndex>=0?(await readFile(args[changedIndex+1],'utf8')).split(/\r?\n/):[];
const selected=args.includes('--all')?urls:changedPublicUrls(changed,urls);
if(!selected.length){console.log(JSON.stringify({skipped:true,reason:'No changed public routes in this deployment.'}));process.exit(0);}
const verification = await fetch(`${origin}/${key}.txt`, { signal: AbortSignal.timeout(20000) });
if (!verification.ok || (await verification.text()).trim() !== key) throw new Error("Production ownership file not available; refusing submission.");
let accepted=0;
for(let offset=0;offset<selected.length;offset+=10000){
 const urlList=selected.slice(offset,offset+10000);
 const result=await fetch("https://api.indexnow.org/indexnow",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({host:new URL(origin).host,key,keyLocation:`${origin}/${key}.txt`,urlList}),signal:AbortSignal.timeout(30000)});
 const details=await result.text();
 console.log(JSON.stringify({status:result.status,accepted:result.status === 200||result.status === 202,details,urls:urlList.length}));
 if(result.status!==200&&result.status!==202)throw new Error('Search engine notification was not accepted.');
 accepted+=urlList.length;
}
console.log(JSON.stringify({acceptedUrls:accepted,indexationGuaranteed:false}));
