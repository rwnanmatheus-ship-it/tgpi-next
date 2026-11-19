import 'server-only';
import { internationalCatalog } from './catalog';
import family1 from './alimentacao-coletiva.server';
import family2 from './hotelaria.server';
import family3 from './transporte-de-passageiros.server';
import family4 from './construcao.server';
import family5 from './economia-da-reparacao.server';
import family6 from './vestuario.server';
import family7 from './calcados-e-acessorios.server';
import family8 from './varejo-alimentar.server';
import family9 from './horticultura-comercial.server';
import family10 from './servicos-urbanos.server';
import family11 from './agua-e-saneamento.server';
import family12 from './servicos-de-energia.server';
import family13 from './economia-audiovisual.server';
import family14 from './musica.server';
import family15 from './artes-cenicas.server';
import family16 from './esporte.server';
import family17 from './educacao.server';
import family18 from './bibliotecas.server';
import family19 from './setor-imobiliario.server';
import family20 from './mobilidade-compartilhada.server';
import family21 from './saude-administrativa.server';
import family22 from './economia-do-cuidado.server';
import family23 from './traducao-profissional.server';
import family24 from './comercio-exterior.server';
import family25 from './industria-grafica.server';
import family26 from './analitica-de-produto.server';
import family27 from './operacoes-de-ia.server';
import family28 from './servicos-de-campo.server';
import family29 from './pesquisa-social.server';

const cases = new Map([
  ...family1,
  ...family2,
  ...family3,
  ...family4,
  ...family5,
  ...family6,
  ...family7,
  ...family8,
  ...family9,
  ...family10,
  ...family11,
  ...family12,
  ...family13,
  ...family14,
  ...family15,
  ...family16,
  ...family17,
  ...family18,
  ...family19,
  ...family20,
  ...family21,
  ...family22,
  ...family23,
  ...family24,
  ...family25,
  ...family26,
  ...family27,
  ...family28,
  ...family29
].map(item => [item.id, item]));

export const internationalSpecs = internationalCatalog.map(listing => {
  const courseCase = cases.get(listing.id);
  if (!courseCase) throw new Error('Missing course case: ' + listing.id);
  return { ...listing, ...courseCase };
});
