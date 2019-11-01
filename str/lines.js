

export function trimLines(str) {
  return str.split('\n').map(s => s.trim()).join('\n');
}

export function removeEmptyLines(str) {
  str.split('\n').filter(line => !!line).join('\n');
}
