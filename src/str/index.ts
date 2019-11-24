import { isArray, isObject } from "../is";
import { Mapper } from '../types';

interface Str2str {[index: string]: string; }

/**
 * replaceAll('ayz', 'a', 'x') => 'xyz'
 * replaceAll('abc', {a: 'x', b: 'y', c: 'z'}) => 'xyz'
 * replaceAll('abc', ['a', 'b', 'c'], 'x') => 'xxx'
 */
export function replaceAll(
  str: string,
  pattern: string | RegExp | string[] | Str2str,
  replacement: string
) {
  if (isArray(pattern)) {
    for (const pat of pattern) {
      str = exports.replaceAll(str, pat, replacement);
    }
    return str;
  }

  if (isObject(pattern)) {
    for (const k of Object.keys(pattern)) {
      str = exports.replaceAll(str, k, (pattern as Str2str)[k]);
    }
    return str;
  }

  if (typeof pattern === 'string') {
    return str.replace(new RegExp(pattern, 'g'), replacement);
  }

  return str.replace(pattern, replacement);
}

export function wcharLen(str: string) {
  return [...Array.from(str)].length;
}

export function repeat(ch: string, n: number) {
  let str = '';
  for (let i = 0; i < n; i++) {
    str += ch;
  }
  return str;
}

export function pad(str: string, n: number) {
  str = str + '';
  const w = wcharLen(str);
  if (w >= n) {
    return str;
  }
  return str + repeat(' ', n - w);
}

export function explode(str: string, spliter: string|RegExp, replaceFn?: (a: any, i: number) => any) {
  const parts = [];
  let r: any = str.match(spliter);
  let icol = 0;
  while (r) {
    if (r.index > 0) {
      let colVal = str.slice(0, r.index);
      if (replaceFn) { colVal = replaceFn(colVal, icol); }
      parts.push(colVal);
      icol++;
    }
    parts.push(r[0]);
    str = str.slice(r.index + r[0].length, str.length);
    r = str.match(spliter);
  }
  if (str !== '') {
    if (replaceFn) { str = replaceFn(str, icol); }
    parts.push(str);
  }
  return parts;
}

export function replaceColumn(str: string, spliter: string, replaceFn: any) {
  const parts = [];
  let r: any = str.match(spliter);
  while (r) {
    let icol = 0;
    if (r.index > 0) {
      let colVal = str.slice(0, r.index);
      if (replaceFn) { colVal = replaceFn(colVal, icol); }
      parts.push(colVal);
      icol++;
    }
    parts.push(r[0]);
    str = str.slice(r.index + r[0].length, str.length);
    r = str.match(spliter);
  }
  if (str !== '') {
    parts.push(str);
  }
  return parts;
}

/**
 * Examples:
 *   extract("abc(xy)efg", "()") => "xy"
 *   extract("abc((xy)ef)g", "()", true) => "(xy)ef"
 */
export function extract(str: string, brackets: string, greedy: boolean = false) {
  if (!str) { return ''; }

  let s = -1;
  let e = -1;
  const len = str.length;
  for (let i = 0; i < len; i++) {
    if (str[i] === brackets[0]) {
      s = i;
      break;
    }
  }
  if (greedy) {
    for (let i = len - 1; i >= 0; i--) {
      if (str[i] === brackets[1]) {
        e = i;
        break;
      }
    }
  } else {
    for (let i = 0; i < len; i++) {
      if (str[i] === brackets[1]) {
        e = i;
        break;
      }
    }
  }

  if (s === -1 || e === -1) { return ''; }
  if (s + 1 >= e) { return ''; }

  return str.substring(s + 1, e);
}

export function quote(val: string, t: string) {
  return t + val + t;
}

export function removeLastChar(str: string, c: string) {
  if (c === undefined || str.endsWith(c)) {
    str = str.slice(0, str.length - 1);
  }
  return str;
}

export function splitMapJoin(str: string, delimiter: string, mapper: Mapper<string>) {
  return str.split(delimiter).map(mapper).join(delimiter);
}

export function isWhitespace(str: string) {
  return !!str.match(/^\s+$/);
}
