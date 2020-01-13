import { isArray, isObject, isFunction } from "../is";
import { Mapper } from '../types';
import { between } from '../index';

interface Str2str {[index: string]: string; }

export function replaceFirst(str, match: string = '', replacement: string | ((s: string) => string)) {
  if (!match) {
    match = str[0];
  }
  if (str.startsWith(match)) {
    const first = isFunction(replacement) ? (replacement as (s: string) => string)(match) : replacement;
    return first + str.slice(match.length);
  } else {
    return str;
  }
}

export function replaceLast(str: string, match: string, replacement: string) {
  if (str.endsWith(match)) {
    return str.slice(0, str.length - match.length) + replacement;
  }
  return str;
}

export function isControlChar(str: string) {
  if (str.length !== 1) {
    return false;
  }
  const i = str.charCodeAt(0);
  return (0 <= i && i <= 32) || (127 <= i && i <= 160) || i === 173;
}

/**
 * escape the unvisible control chars as hex value
 * @param str
 */
export function escapeCharSequence(str: string) {
  return charCodes(str).map(i => {
    const ch = String.fromCharCode(i);
    if ( (0 <= i && i <= 32) || (127 <= i && i <= 160) || i === 173) {
      return '\\u' + i.toString(16).padStart(4, '0');
    } else {
      return ch;
    }
  }).join('');
}

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

export function splitByChars(str: string, spliter: string[] | string) {
  const parts = [];
  let currStr = '';
  let spliters = [];
  if (typeof spliter === 'string') {
    spliters.push(spliter);
  } else {
    spliters = spliter;
  }
  const spliterSet = new Set(spliter);
  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (!spliterSet.has(ch)) {
      currStr += str[i];
    } else {
      if (currStr.length > 0) {
        parts.push(currStr);
      }
      currStr = '';
    }
  }
  if (currStr.length > 0) {
    parts.push(currStr);
  }
  return parts;
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

export function charCodes(str: string, format: 'decimal'|'hex' = 'decimal') {
  const arr = [];
  for (let i = 0; i < str.length; i++) {
    arr.push(format === 'hex' ? (str.charCodeAt(i)).toString(16) : str.charCodeAt(i));
  }
  return arr;
}

/**
 * removeCharAt('abcdefg', 2) => 'abdefg'
 */
export function removeCharAt(str: string, index: number) {
  return str.substring(0, index) + str.substring(index + 1, str.length);
}

/**
 * replaceCharAt('abcdefg', 2, 'x') => 'abxdefg'
 */
export function replaceCharAt(str: string, index: number, replacement: string) {
  return str.substring(0, index) + replacement + str.substring(index + 1, str.length);
}

/**
 * replaceCharAt('abcdefg', 2, 'x') => 'abxcdefg'
 */
export function insertCharAt(str: string, index: number, char: string) {
  return str.substring(0, index) + char + str.substring(index, str.length);
}

/**
 * 012345678
 * abc  efg
 *      <--^    (1) currently at 8
 *     ^        (2) should return 4
 * if not found: return -1
 */
export function toEndOfPrevSpace(str: string , currIndex: number) {
  currIndex = between(0, currIndex, str.length - 1);
  let inWhitespace = false;
  if (isWhitespace(str[currIndex])) {
    inWhitespace = true;
  }
  for (let i = currIndex; i >= 0; i--) {
    if (inWhitespace && isWhitespace(str[i])) {
      continue;
    }
    inWhitespace = false;
    if (isWhitespace(str[i])) {
      return i;
    }
  }
  return -1;
}

/**
 * 012345678
 * abc  efg
 *   ^->     (1) currently at 2
 *      ^    (2) should return 5
 * if not found: return -1
 */
export function toStartOfNextWord(str: string, currIndex: number) {
  currIndex = between(0, currIndex, str.length - 1);
  let foundWhitespace = false;
  for (let i = currIndex; i < str.length; i++) {
    if (isWhitespace(str[i])) {
      foundWhitespace = true;
      continue;
    } else if (foundWhitespace) {
      return i;
    }
  }
  return -1;
}

/**
 *
 * 012345678
 * abc  defgh
 *       <-^  (1) currently at 8
 *      ^     (2) should return 5
 *
 * 012345678
 * abc  defgh
 *     ^      (1) if is in whitespace, just return current index;
 */
export function toStartOfCurrentWord(str: string, currIndex: number): number {
  currIndex = between(0, currIndex, str.length - 1);
  if (isWhitespace(str[currIndex])) {
    return currIndex;
  }
  for (let i = currIndex; i >= 0; i--) {
    if (!isWhitespace(str[i])) {
      continue;
    }
    return i + 1;
  }
  return 0;
}

export function removeCharBetween(str: string, start: number, end: number) {
  start = between(0, start, str.length - 1);
  end   = between(start, end, str.length - 1);
  let r = '';
  for (let i = 0; i < str.length; i++) {
    if (i < start || i > end) {
      r += str[i];
    }
  }
  return r;
}
