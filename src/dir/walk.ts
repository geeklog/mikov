import { isFunction, isArray, isString } from 'util';
import walkSync from 'walk-sync';
import { resolve, join } from 'path';

type FileHandler = (f: string) => void;

interface FilterRule {
  startsWith ?: string;
  endsWith ?: string;
  fileOrDir ?: string;
  excludes ?: string[];
  supressError ?: boolean;
}

/**
 * rule = {
 *   startsWith: '',
 *   endsWith: '.js',
 *   fileOrDir: 'file',
 *   excludes: ['node_modules', 'astcache']
 * };
 */
export default function walk(dir: string, rule?: FilterRule, fnHandler?: FileHandler) {
  if (!dir.startsWith('/')) {
    dir = join(process.cwd(), dir);
  }

  rule = rule || {};
  rule.excludes = rule.excludes || ['node_modules', '.git'];

  const paths = walkSync(dir);

  for (const p of paths) {
    const path = join(dir, p);
    if (matchRule(path, rule)) {
      try {
        fnHandler ? fnHandler(path) : null;
      } catch (err) {
        console.error('trying:' + path, err);
      }
    }
  }
}

function matchRule(path: string, rule: FilterRule) {
  if (isArray(rule.startsWith)) {
    for (const s of rule.startsWith) {
      if (!path.startsWith(s)) { return false; }
    }
  }
  if (isString(rule.startsWith)) {
    if (!path.startsWith(rule.startsWith)) { return false; }
  }

  if (isArray(rule.endsWith)) {
    for (const s of rule.endsWith) {
      if (!path.endsWith(s)) { return false; }
    }
  }
  if (isString(rule.endsWith)) {
    if (!path.endsWith(rule.endsWith)) { return false; }
  }

  if (isArray(rule.excludes)) {
    for (const s of rule.excludes) {
      if (path.indexOf(s) >= 0) { return false; }
    }
  }

  if (rule.fileOrDir) {
    try {
      const stat = require('fs').lstatSync(path);
      if (rule.fileOrDir === 'file' && stat.isDirectory()) {
        return false;
      }
      if (rule.fileOrDir === 'dir' && !stat.isDirectory()) {
        return false;
      }
    } catch (e) {
      if (!rule.supressError) {
        console.error(e);
      }
      return false;
    }
  }
  return true;
}
