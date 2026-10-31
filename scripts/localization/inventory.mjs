import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import ts from 'typescript';

export const locales = ['en', 'pt-BR', 'es', 'fr', 'de', 'it'];
const presentation = new Set(['title','description','summary','label','eyebrow','heading','copy','text','question','prompt','explanation','answer','objective','scenario','meaning','example','instruction','reason','avoid','useInstead','guidedPractice','independentPractice','workedExample','recovery','diagnostic','continuation','outcome','statement','name','error','message','notice','subtitle','placeholder','aria-label','alt']);
const lists = new Set(['benefits','successCriteria','commonErrors','checks','coachNotes','skills','competencies','keyPhrases','dialogue','principles','requirements','prerequisites','outcomes','content','paragraphs','steps']);
const literalTags = new Set(['script','style','code','pre']);
const brands = new Set(['TGPI','The Global Polymath Institute','TGPI Premium','TGPI Global Key','TGPI Global ID','Global Key','TGPI GLOBAL EDUCATION LTDA','Stripe','Clerk','Vercel','Firebase','OpenAI','LinkedIn','Instagram','Power BI','Python','Excel','Google Sheets','Power Query']);
function decode(value) { return value.replace(/&(amp|apos|quot|nbsp|lt|gt);/g, (_, name) => ({amp:'&',apos:"'",quot:'"',nbsp:' ',lt:'<',gt:'>'})[name]).replace(/&#(x[0-9a-f]+|[0-9]+);/gi, (_, code) => String.fromCodePoint(code[0].toLowerCase() === 'x' ? parseInt(code.slice(1),16) : Number(code))); }
export function meaningful(value) {
  return typeof value === 'string' && /\p{L}{2}/u.test(value) && !brands.has(value.trim()) && !/^(?:https?:|mailto:|tel:|\/|@\/|#[\da-f]{3,8}$)/i.test(value) && !/^\S+@\S+$/.test(value) && !/^[a-z0-9_]+(?:-[a-z0-9_]+)+$/.test(value) && !/^(?:[\w-]+:)?(?:bg-|text-|flex|grid|rounded|border|font-|px-|py-)/.test(value);
}
function sourceLanguage(file, value) {
  return file.includes('/professional/') || /\b(?:você|usuário|certificado|prática|países|projeto|aprendizagem|seu|sua|não|Acesso antecipado)\b/i.test(value) ? 'pt-BR' : 'en';
}
function getPropertyName(node, source) { return ts.isIdentifier(node) || ts.isStringLiteral(node) ? node.text : node.getText(source); }
function isInLiteralElement(node, source) {
  for (let parent=node.parent;parent;parent=parent.parent) {
    if (ts.isJsxElement(parent) && literalTags.has(parent.openingElement.tagName.getText(source))) return true;
  }
  return false;
}
function isDisplayLiteral(node, source, file) {
  const parent=node.parent;
  if (ts.isJsxAttribute(parent)) return presentation.has(parent.name.text);
  if (ts.isPropertyAssignment(parent) && parent.initializer === node) return presentation.has(getPropertyName(parent.name,source));
  if (ts.isCallExpression(parent) || ts.isNewExpression(parent)) {
    const name=parent.expression.getText(source);
    return ['t','translate','setError','setMessage','setNotice','Error','AtlasError','window.confirm'].includes(name) && parent.arguments?.[0]===node;
  }
  if (ts.isConditionalExpression(parent)) {
    if (parent.whenTrue!==node && parent.whenFalse!==node) return false;
    for (let ancestor=parent.parent;ancestor;ancestor=ancestor.parent) {
      if (ts.isJsxExpression(ancestor)) return !ts.isJsxAttribute(ancestor.parent) || presentation.has(ancestor.parent.name.text);
      if (ts.isPropertyAssignment(ancestor)) return presentation.has(getPropertyName(ancestor.name,source));
      if (ts.isFunctionLike(ancestor)||ts.isVariableDeclaration(ancestor)) return false;
    }
    return false;
  }
  if (ts.isJsxExpression(parent)) return !ts.isJsxAttribute(parent.parent) || presentation.has(parent.parent.name.text);
  if (ts.isArrayLiteralExpression(parent)) {
    for (let p=parent.parent;p;p=p.parent) {
      if (ts.isPropertyAssignment(p)) return lists.has(getPropertyName(p.name,source));
      if (ts.isVariableDeclaration(p)) return /criteria|labels|options|messages|copy|content|questions/i.test(p.name.getText(source));
    }
  }
  return file.startsWith('src/data/') && /\s/.test(node.text) && !ts.isImportDeclaration(parent);
}
export function collectSource(file, text) {
  const source=ts.createSourceFile(file,text,ts.ScriptTarget.Latest,true,file.endsWith('.tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS);
  const entries=[];
  const visibility=file.includes('/api/') || file.endsWith('.server.ts') ? 'private' : 'public';
  function add(value,node,kind) {
    value=decode(value).replace(/\r\n/g,'\n').trim();
    if (!meaningful(value) || isInLiteralElement(node,source)) return;
    const location=source.getLineAndCharacterOfPosition(node.getStart(source));
    entries.push({id:crypto.createHash('sha256').update(value).digest('hex'),source:value,sourceLocale:sourceLanguage(file,value),visibility,origins:[{file,line:location.line+1,kind}]});
  }
  function visit(node) {
    if (ts.isJsxText(node)) add(node.text.replace(/\s+/g,' '),node,'jsx');
    if ((ts.isStringLiteral(node)||ts.isNoSubstitutionTemplateLiteral(node)) && isDisplayLiteral(node,source,file)) add(node.text,node,'literal');
    if (ts.isTemplateExpression(node) && isDisplayLiteral(node,source,file)) add(node.head.text+node.templateSpans.map((span,i)=>`{value${i}}${span.literal.text}`).join(''),node,'template');
    ts.forEachChild(node,visit);
  }
  visit(source);
  return entries;
}
export function buildInventory(root=process.cwd()) {
  const bySource=new Map();
  function walk(directory) {
    if (!fs.existsSync(path.join(root,directory))) return;
    for (const entry of fs.readdirSync(path.join(root,directory),{withFileTypes:true})) {
      const file=path.posix.join(directory,entry.name);
      if (entry.isDirectory()) { if (!file.startsWith('src/lib/localization')) walk(file); continue; }
      if (!/\.(?:tsx|ts)$/.test(file) || file.endsWith('.d.ts')) continue;
      for (const item of collectSource(file,fs.readFileSync(path.join(root,file),'utf8'))) {
        const previous=bySource.get(item.source);
        if (!previous) bySource.set(item.source,item);
        else {
          // A public occurrence makes the phrase public; private-only assessment explanations stay server-only.
          if (item.visibility==='public') previous.visibility='public';
          previous.origins.push(...item.origins);
        }
      }
    }
  }
  for (const directory of ['src/app','src/components','src/data','src/lib']) walk(directory);
  const entries=[...bySource.values()].sort((a,b)=>a.id.localeCompare(b.id));
  const revision=crypto.createHash('sha256').update(JSON.stringify(entries.map(({id,visibility})=>({id,visibility})))).digest('hex');
  return {schemaVersion:1,revision,locales,entries};
}
export function loadExistingCatalog(root=process.cwd()) {
  const source=fs.readFileSync(path.join(root,'src/lib/localization/messages.ts'),'utf8');
  const result={};
  new Function('exports',ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText)(result);
  return result.messages;
}
