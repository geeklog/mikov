/**
 * 所有文件路径相关的函数
 */
import { homedir, tmpdir } from 'os';
import { isRawType } from '../url';
import { replaceLast } from '../array';
import { endsWith } from '../fn/op';
import { removeLastChar, extract } from '../str';

import md5 from '../md5';
import * as p from 'path';

export const dir     = (path: string) => p.join(__dirname, path);
export const dirname = (path: string) => p.dirname(path);
export const cwd     = (fpath: string) => p.join(process.cwd(), fpath);

export function absolute(fpath: string) {
  if (fpath.startsWith('~/')) {
    return homedir() + fpath.slice(1, fpath.length);
  }
  if (fpath.startsWith('./')) {
    return p.resolve(p.join(process.cwd(), fpath));
  }
  return p.resolve(fpath);
}

export function absPath(fpath: string) {
  if (fpath.startsWith('~/')) {
    return homedir() + fpath.slice(1, fpath.length);
  }
  if (fpath.startsWith('./')) {
    return p.resolve(p.join(process.cwd(), fpath));
  }
  return p.resolve(fpath);
}

export function tmpPath(fpath: string) {
  return p.join(tmpdir(), fpath);
}

/**
 * Escape使得路径可以被bash正确识别
 */
export function escapeForBash(str: string) {
  if (str) {
    str = str.replace(/ /g, "\\ ");
    str = str.replace(/\[/g, "\\[");
    str = str.replace(/\]/g, "\\]");
  }
  return str;
}

/**
 * {nohttp}
 * {urlparts}
 * {id}
 * {-}
 * {hash}
 * {urlencode}
 */
export function applyFilePathPattern(key: string, pathPattern: string) {
  if (pathPattern.startsWith('tmp/')) {
    pathPattern = pathPattern.replace('tmp', tmpdir());
  } else if (pathPattern.startsWith('./')) {
    pathPattern = pathPattern.replace('./', p.join(process.cwd(), '/'));
  }

  const rules = extract(pathPattern, '{}').split(',');
  const pathPatternPrefix = pathPattern.split('{')[0];
  const pathPatternPostfix = pathPattern.split('}')[1];

  let rule;
  let parts = [key];

  // tslint:disable-next-line: no-conditional-assignment
  while (rule = rules.shift()) {
    if (rule === 'urlparts') {
      parts = key.split('/').map(s => removeLastChar(s, ':'));
      continue;
    }
    if (rule === 'nohttp') {
      parts = parts.map(s => s.replace('http://', '').replace('https://', ''));
    }
    if (rule === 'urlencode') {
      parts = parts.map(s => encodeURIComponent(s));
      continue;
    }
    if (rule === 'id') {
      continue;
    }
    if (rule === 'hash') {
      parts = parts.map(s => md5(s));
      continue;
    }
    if (rule === '-') {
      parts = parts.map(s => s.replace(/:/g, '-').replace(/\//g, '-'));
      continue;
    }
    if (rule === 'random') {
      parts = parts.map(s => Math.random().toString(36).substring(2, 15));
      continue;
    }
    const rgx = /\.(\w+)$/;
    if (rule.match(rgx)) {
      const postfix = (rule.match(rgx) as any)[1];

      parts = replaceLast(parts, lastPart => {
        if (isRawType(lastPart)) {
          return lastPart;
        }
        const isHtml = endsWith(['.html', '.htm', '.xhtml', '.md', '.asp', '.aspx', '.php']);
        if (isHtml(lastPart)) {
          return replaceLast(lastPart.split('.'), _ => postfix).join('.');
        }
        return lastPart + '.' + postfix;
      });

      continue;
    }
  }

  let str = p.join(pathPatternPrefix, ...parts);
  if (pathPatternPostfix.startsWith('.')) {
    str += pathPatternPostfix;
  } else {
    str = p.join(str, pathPatternPostfix);
  }
  return str;
}
