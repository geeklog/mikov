
export function replaceAll(str, pattern, replacement) {
  if (typeof str === 'string') {
    return str.replace(new RegExp(pattern, 'g'), replacement);
  } else {
    return str.replace(pattern, replacement);
  }
}

export function wcharLen(str) {
  str = str + '';
  let len = 0;
  for (var i=0; i<str.length; i++)
      len += str.charCodeAt(i) > 255? 2: 1;
  return len;
}

export function pad(str, n) {
  str = str + '';
  let w = wlen(str);
  if (w >= n)
      return str;
  return str + repeat(' ', n-w);
}

export function repeat(ch, n) {
  let str = '';
  for (let i=0; i<n; i++)
      str += ch;
  return str;
}