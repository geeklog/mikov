
export function trimLines(str: string) {
  return str.split('\n').map(s => s.trim()).join('\n');
}

export function removeEmptyLines(str: string, consecutive?: number) {
  if (!consecutive) {
    return str.split('\n').filter(line => !!line.trim()).join('\n');
  }

  const res = [];
  const lines = str.split('\n');
  let whiteLineCount = 0;
  for (const line of lines) {
    if (!!line.trim()) {
      res.push(line);
      whiteLineCount = 0;
      continue;
    }
    whiteLineCount++;
    if (whiteLineCount < consecutive) {
      res.push(line);
    }
  }

  return res.join('\n');
}
