/** Keep generated QA identifiers compatible with the guarded cleanup command. */
export function createQaRunId(now = Date.now()) {
  return `tgpi-qa-${now}`;
}

export function isQaRunId(value) {
  return typeof value === 'string' && /^tgpi-qa-(?:\d{8}|\d{13})(?:-[a-z]+)?$/.test(value);
}
