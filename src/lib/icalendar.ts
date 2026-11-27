export const escapeCalendarText = (value: string) => value.replace(/[\\;,\r\n]/g, char => /[\r\n]/.test(char) ? ' ' : '\\' + char);
export function foldCalendarLine(line: string) {
  const encoder = new TextEncoder();
  let bytes = 0;
  let output = '';
  for (const char of line) {
    const size = encoder.encode(char).length;
    if (bytes + size > 75) {
      output += '\r\n ';
      bytes = 1;
    }
    output += char;
    bytes += size;
  }
  return output;
}
