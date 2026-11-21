import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { createRequire } from 'node:module';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';

function render({ user, sessions = null, loaded = true, pathname = '/profile/security', locale = 'pt-BR' }) {
  let slot = 0;
  const native = createRequire(import.meta.url);
  const overrides = {
    react: { ...React, useState(initial) { const state = React.useState(initial); return [slot++ === 0 ? sessions : state[0], state[1]]; } },
    '@clerk/nextjs': { useUser: () => ({ user, isLoaded: loaded }), useSession: () => ({ session: {id:'current'} }), useClerk: () => ({}), UserProfile: () => React.createElement('div', null, 'Native settings') },
    'next/navigation': { usePathname: () => pathname },
    '@/components/localization/LocaleProvider': { useLocale: () => ({locale}) },
  };
  function load(file) {
    const result = {};
    const compiled = ts.transpileModule(readFileSync(file, 'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS, target:ts.ScriptTarget.ES2022, jsx:ts.JsxEmit.ReactJSX, esModuleInterop:true}}).outputText;
    new Function('require', 'exports', compiled)(name => {
      if (name in overrides) return overrides[name];
      if (name.endsWith('.css')) return {default:{}};
      if (name.startsWith('@/')) return load(resolve('src', name.slice(2)) + '.ts');
      if (name.startsWith('.')) return load(resolve(dirname(file), name) + '.ts');
      return native(name);
    }, result);
    return result;
  }
  return renderToStaticMarkup(React.createElement(load(resolve('src/components/profile/SecurityCenter.tsx')).default));
}
const user = {primaryEmailAddress:{emailAddress:'learner@example.test',verification:{status:'verified'}},passwordEnabled:false,twoFactorEnabled:false,backupCodeEnabled:false,passkeys:[],externalAccounts:[]};
const session = id => ({id,lastActiveAt:new Date('2026-11-21T14:00:00Z'),latestActivity:{browserName:id,city:'Campinas'}});

test('current session has no revoke action; another session does', () => {
  const html = render({user,sessions:[session('current'), session('other')]});
  assert.match(html, /Esta sessão/);
  const list = html.split('<ul')[1].split('</ul>')[0];
  assert.equal((list.match(/Encerrar sessão/g) || []).length, 1);
  assert.ok(!list.split('</li>')[0].includes('<button'));
  assert.match(html, /learner@example.test/);
  assert.match(html, /Nenhuma senha configurada/);
  assert.ok(!html.includes('Códigos de recuperação configurados'));
});

test('all six locales render actual protection and recovery state', () => {
  const protectedUser = {...user,twoFactorEnabled:true,backupCodeEnabled:true,passkeys:[{id:'key'}]};
  for (const locale of ['en','pt-BR','es','fr','de','it']) {
    const html = render({user:protectedUser,locale,sessions:[]});
    assert.match(html, /<strong>3<span>\/3<\/span>/);
    assert.ok(!html.includes('undefined'));
    assert.ok(!html.includes('learner@example.test</button>'));
  }
});

test('loading account does not expose old session data; existing nested authentication routes are preserved', () => {
  assert.ok(!render({user,loaded:false,sessions:[session('old-device')]}).includes('old-device'));
  const html = render({user,pathname:'/profile/security/security'});
  assert.equal(html, '<div>Native settings</div>');
});
