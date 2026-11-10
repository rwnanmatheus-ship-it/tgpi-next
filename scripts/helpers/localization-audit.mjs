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

/** JSX text/attributes decode entities; JavaScript strings deliberately do not. */
export function renderedMessageText(raw, node) {
  const jsxLiteral = ts.isJsxText(node) || ts.isJsxAttribute(node);
  const text = jsxLiteral ? raw.replaceAll('&apos;', "'").replaceAll('&quot;', '"').replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>') : raw;
  return text.replace(/\s+/g, ' ').trim();
}
