import { splitMapJoin } from '../str';
import { exist } from '../array';
import { entries } from '..';

export const removeComments = (src: string, commentType: string) => {
  if (commentType === '//') {
    return src
      .split('\n')
      .map(s => s.trim())
      .map(s => s.replace(/\/\/.*$/g, ''))
      .join('\n');
  }
  throw new Error('Unsupported');
};

export function insertEndingCommas(src: string, c: string, skipEndings: string[]) {
  return splitMapJoin(src, '\n', (line) => {
    if (line.endsWith(c)) {
      return line;
    }
    if (exist(skipEndings, s => line.endsWith(s))) {
      return line;
    }
    return `${line}${c}`;
  });
}

export function countWords(str: string) {
  const tokenLines = str
    .split('\n')
    .map(line =>
      line.split(/\W/).filter(t => t.replace(/\s+/g, '') !== '')
    )
    .filter(line => line.length);

  const counts: {[index: string]: number} = {};
  for (const tokens of tokenLines) {
    for (const token of tokens) {
      if (counts[token]) { counts[token]++; } else { counts[token] = 1; }
    }
  }

  return entries(counts).sort(([k1, v1], [k2, v2]) => v2 - v1);
}
