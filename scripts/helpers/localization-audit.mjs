import ts from 'typescript';

/** Follow only literal alternatives; dynamic data needs its own presentation tests. */
export function messageLiterals(node) {
  if (!node) return [];
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return [node];
  if (ts.isParenthesizedExpression(node)) return messageLiterals(node.expression);
  if (ts.isConditionalExpression(node)) return [...messageLiterals(node.whenTrue), ...messageLiterals(node.whenFalse)];
  if (ts.isBinaryExpression(node) && [ts.SyntaxKind.BarBarToken, ts.SyntaxKind.QuestionQuestionToken].includes(node.operatorToken.kind)) return [...messageLiterals(node.left), ...messageLiterals(node.right)];
  return [];
}

const JSX_ENTITIES = {
  apos: "'",
  quot: '"',
  amp: '&',
  lt: '<',
  gt: '>',
};
const CATALOG_ENTITIES = { ...JSX_ENTITIES, nbsp: ' ' };

/** Decode the original entity matches exactly once. */
export function decodeMessageEntities(value, includingNonbreakingSpace = false) {
  const entities = includingNonbreakingSpace ? CATALOG_ENTITIES : JSX_ENTITIES;
  return value.replace(/&(apos|quot|amp|lt|gt|nbsp);/g, (literal, entity) =>
    Object.hasOwn(entities, entity) ? entities[entity] : literal
  );
}

/** JSX text/attributes decode entities; JavaScript strings deliberately do not. */
export function renderedMessageText(raw, node) {
  const jsxLiteral = ts.isJsxText(node) || ts.isJsxAttribute(node);
  const text = jsxLiteral ? decodeMessageEntities(raw) : raw;
  return text.replace(/\s+/g, ' ').trim();
}
