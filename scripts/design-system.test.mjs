import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import postcss from 'postcss';
const tokens = new Map();
const darkOverrides = new Map();
postcss.parse(readFileSync(new URL('../src/app/design-tokens.css', import.meta.url), 'utf8')).walkRules(rule => {
  if (rule.selector === ':root') rule.walkDecls(decl => tokens.set(decl.prop, decl.value));
  if (rule.selector === ':root[data-tgpi-theme="dark"]') rule.walkDecls(decl => darkOverrides.set(decl.prop, decl.value));
});
const darkTokens = new Map([...tokens, ...darkOverrides]);
function resolve(name, themeTokens = tokens, seen = new Set()) {
  assert.ok(!seen.has(name), `Circular token: ${name}`);
  seen.add(name);
  const value = themeTokens.get(name);
  assert.ok(value, `Missing token: ${name}`);
  const alias = /^var\((--[\w-]+)\)$/.exec(value);
  return alias ? resolve(alias[1], themeTokens, seen) : value;
}
function luminance(hex) {
  const c=hex.slice(1).match(/../g).map(v => parseInt(v,16)/255).map(v => v<=.04045?v/12.92:((v+.055)/1.055)**2.4);
  return c[0]*.2126+c[1]*.7152+c[2]*.0722;
}
function contrast(a,b,themeTokens) { const l=[luminance(resolve(a,themeTokens)),luminance(resolve(b,themeTokens))].sort((a,b)=>b-a); return (l[0]+.05)/(l[1]+.05); }
for(const [fg,bg] of [['ink','canvas'],['muted','canvas'],['gold-strong','canvas'],['blue','surface'],['inverse','navy'],['inverse-muted','navy'],['gold-light','navy'],['success','success-soft'],['danger','danger-soft'],['navy','gold']]) {
  test(`WCAG AA text contrast: ${fg} on ${bg}`,()=>assert.ok(contrast(`--tgpi-${fg}`,`--tgpi-${bg}`)>=4.5));
}
test('focus indicator contrasts with editorial surfaces',()=>assert.ok(contrast('--tgpi-focus','--tgpi-surface')>=3));
test('legacy aliases resolve without cycles',()=>{ for(const [key,value] of tokens) if(/^var\(--/.test(value)&&!value.includes(',')) resolve(key); });
function cssFiles(dir) { return readdirSync(dir,{withFileTypes:true}).flatMap(item=>item.isDirectory()?cssFiles(join(dir,item.name)):item.name.endsWith('.css')?[join(dir,item.name)]:[]); }
test('all application stylesheets parse after token migration',()=>{ for(const path of cssFiles(new URL('../src',import.meta.url).pathname)) postcss.parse(readFileSync(path,'utf8'),{from:path}); });

for (const [theme, themeTokens] of [['light', tokens], ['dark', darkTokens]]) {
  for (const [fg, bg, minimum] of [
    ['heading', 'surface', 4.5],
    ['heading', 'blue-soft', 4.5],
    ['muted', 'surface', 4.5],
    ['control-on-primary', 'control-primary', 4.5],
    ['control-on-primary', 'control-primary-hover', 4.5],
    ['control-border', 'surface-strong', 3],
    ['focus', 'surface', 3],
    ['focus', 'focus-halo', 3],
  ]) {
    test(`${theme}: ${fg} on ${bg} meets ${minimum}:1`, () => {
      assert.ok(contrast(`--tgpi-${fg}`, `--tgpi-${bg}`, themeTokens) >= minimum);
    });
  }
}
