const origin = 'https://www.theglobalpolymath.com';
const privateRoute = /^\/(admin|api|profile|dashboard|plan|notifications|sign-in|sign-up|onboarding|ranking|authority|country-fit|premium|workspace|settings|account|members|member|login|checkout|upgrade)(\/|$)/;
export const isPrivateSearchPath = path => privateRoute.test(path) || /^\/courses\/[^/]+\/(study|lessons|history|assessment|certificate|progress)(\/|$)/.test(path);
export function publicSitemapUrls(xml) {
 return [...new Set([...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)].flatMap(match=>{
  try {const url=new URL(match[1].trim().replaceAll('&amp;','&'));return url.origin===origin&&!url.search&&!url.hash&&!isPrivateSearchPath(url.pathname)?[url.href]:[];} catch{return [];}
 }))];
}
export function changedPublicUrls(paths, urls) {
 const changed=paths.filter(Boolean);
 if(changed.some(path=>/^src\/app\/layout\.tsx$|^src\/components\/(GlobalFooter|Navbar)\.tsx$|^src\/lib\/localization\/|^public\/locales\//.test(path)))return urls;
 const learning=changed.some(path=>/^src\/app\/courses\/\[id\]/.test(path)||/^src\/(data\/courses|components\/courses|lib\/(learning|seo\/course-directory))/.test(path));
 const countries=changed.some(path=>/^src\/app\/countries\/\[/.test(path)||/^src\/(data\/countr|components\/countr|lib\/countr)/.test(path));
 const guides=changed.some(path=>/^src\/lib\/public-guides|^src\/app\/guides\/\[/.test(path));
 const directory=changed.some(path=>/^src\/app\/courses\/directory\//.test(path));
 const routes=changed.flatMap(path=>{
  const match=/^src\/app\/(.*)\/(?:page|layout)\.tsx$/.exec(path);
  if(path==='src/app/page.tsx')return ['/'];
  if(!match||match[1].includes('[')||match[1].includes('('))return [];
  return ['/'+match[1]];
 });
 const discovery=changed.some(path=>/^src\/lib\/discovery|^src\/components\/discovery|^src\/app\/discover/.test(path));
 return urls.filter(url=>{
  const path=new URL(url).pathname;
  return routes.includes(path)||(learning&&/^\/courses(?:\/|$)/.test(path))||(countries&&/^\/countries(?:\/|$)/.test(path))||(guides&&/^\/guides(?:\/|$)/.test(path))||(directory&&path.startsWith('/courses/directory'))||(discovery&&path.startsWith('/discover/'));
 });
}
