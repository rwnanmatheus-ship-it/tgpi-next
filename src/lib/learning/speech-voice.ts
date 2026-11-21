type Voice = {lang:string;localService:boolean};
/** Never substitute Cantonese for Mandarin or another Portuguese variety for a Brazilian model. */
export function selectLocalSpeechVoice<T extends Voice>(voices:readonly T[],target:string):T|undefined {
  const normalize=(value:string)=>value.toLowerCase().replaceAll('_','-');
  const requested=normalize(target),base=requested.split('-')[0],local=voices.filter(voice=>voice.localService);
  const exact=local.find(voice=>normalize(voice.lang)===requested);
  if(exact)return exact;
  if(requested==='pt-br')return undefined;
  if(base==='zh'||base==='cmn')return local.find(voice=>/^(?:zh|cmn)(?:-(?:hans|hant))?-(?:cn|tw|sg)$/.test(normalize(voice.lang)));
  return local.find(voice=>normalize(voice.lang).split('-')[0]===base);
}
