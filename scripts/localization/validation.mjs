const controlCharacters=/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u202a-\u202e\u2066-\u2069]/;
export function placeholders(value) { return (value.match(/\{[A-Za-z][A-Za-z\d_]*\}/g)||[]).sort(); }
export function protectedTokens(value) {
  return [
    ...(value.match(/https?:\/\/[^\s<>"')\]]+|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/g)||[]),
    ...(value.match(/```[\s\S]*?```|`[^`\n]+`/g)||[]),
    ...(value.match(/\b\d+(?:[.,:/-]\d+)*%?/g)||[]),
  ].sort();
}
export function validateTranslation(source,value) {
  const failures=[];
  if (typeof value!=='string'||!value.trim()) return ['empty or invalid translation'];
  if (value.length>Math.max(500,source.length*5+200)) failures.push('unexpected translation length');
  if (controlCharacters.test(value)) failures.push('control characters');
  if (JSON.stringify(placeholders(source))!==JSON.stringify(placeholders(value))) failures.push('placeholders changed');
  if (JSON.stringify(protectedTokens(source))!==JSON.stringify(protectedTokens(value))) failures.push('numbers, contacts, URLs or code changed');
  return failures;
}
export function validateBatch(entries, response) {
  if (!response || !Array.isArray(response.translations)) throw Error('Invalid batch response');
  const expected=new Map(entries.map(entry=>[entry.id,entry]));
  const result=new Map();
  for (const item of response.translations) {
    if (!item || !expected.has(item.id) || result.has(item.id)) throw Error('Unexpected or duplicate translation ID');
    const errors=validateTranslation(expected.get(item.id).source,item.value);
    if (errors.length) throw Error(`Translation ${item.id.slice(0,12)} failed validation: ${errors.join(', ')}`);
    result.set(item.id,item.value);
  }
  if (result.size!==expected.size) throw Error('Missing translations in batch');
  return result;
}
