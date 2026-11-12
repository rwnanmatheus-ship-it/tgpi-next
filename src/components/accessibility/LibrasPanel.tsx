'use client';

import { useId, useState } from 'react';
import { useLocale } from '@/components/localization/LocaleProvider';
import { accessCopy } from '@/lib/localization/accessibility-center';
import styles from './accessibility-center.module.css';

function publicFrame(text: string) {
  const escaped = text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<meta name="referrer" content="no-referrer">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src https://vlibras.gov.br https://cdn.jsdelivr.net/gh/spbgovbr-vlibras/vlibras-portal@v7.12.2/; style-src 'unsafe-inline' https://vlibras.gov.br https://cdn.jsdelivr.net; frame-src https://vlibras.gov.br; font-src https://vlibras.gov.br https://cdn.jsdelivr.net; img-src https://vlibras.gov.br https://cdn.jsdelivr.net data:; connect-src https://vlibras.gov.br https://cdn.jsdelivr.net; form-action 'none'; base-uri 'none'">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Texto para tradução em Libras</title>
<style>body{font:1rem/1.6 system-ui,sans-serif;color:#14263e;background:#f6f9ff;margin:1rem;padding-right:3.5rem}main{white-space:pre-wrap;overflow-wrap:anywhere}</style>
</head><body><main>${escaped}</main><script src="https://cdn.jsdelivr.net/gh/spbgovbr-vlibras/vlibras-portal@v7.12.2/app/vlibras-plugin.js" defer></script></body></html>`;
}

export default function LibrasPanel({ text }: { text: string }) {
  const { locale } = useLocale();
  const [active, setActive] = useState(false);
  const id = useId();
  return <div className={styles.librasPanel}>
    <p>{accessCopy(locale, 'librasConsent')}</p>
    <div className={styles.languages}>
      <button className={styles.action} type="button" aria-expanded={active} aria-controls={id}
        onClick={() => setActive(value => !value)}>{accessCopy(locale, active ? 'librasClose' : 'librasEnable')}</button>
      <a href="https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/vlibras" target="_blank" rel="noopener noreferrer">{accessCopy(locale, 'librasOfficial')}</a>
    </div>
    <div id={id} hidden={!active}>
      {active && <>
        <p>{accessCopy(locale, 'librasUse')}</p>
        <iframe className={styles.librasFrame} title={accessCopy(locale, 'libras')} sandbox="allow-scripts"
          referrerPolicy="no-referrer" srcDoc={publicFrame(text)} />
      </>}
    </div>
  </div>;
}
