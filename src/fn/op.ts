import { isString, isArray, isRegExp } from 'util';
import { Mapper } from '../types';

export const trim = (s: string) => s.trim();

export const exists = (a: any) => !!a;

export function collect<T>(val: T, memo: T[]) {
  memo.push(val);
  return memo;
}

export function tap<T>(fn: (a: T) => void) {
  return (a: T) => {
    fn(a);
    return a;
  };
}

export function oneOf<T>(fns: Array<Mapper<T>>) {
  return (a: T) => {
    for (const fn of fns) {
      const r = fn(a);
      if (r !== a) {
        return r;
      }
    }
    return a;
  };
}

export function compare<T>(arr: T[] | T, brr: T[] | T) {
  if (isArray(arr) && isArray(brr)) {
    for (let i = 0; i < arr.length; i++) {
      if (!arr[i] && !brr[i]) { continue; }
      if (arr[i] && !brr[i]) { return 1; }
      if (!arr[i] && brr[i]) { return -1; }
      if (arr[i] < brr[i]) { return -1; }
      if (arr[i] > brr[i]) { return 1; }
      continue;
    }
  } else {
    if (arr < brr) { return -1; }
    if (arr > brr) { return 1; }
  }
  return 0;
}

export const asc = compare;

export function desc<T>(a: T[] | T, b: T[] | T) {
  return -asc(a, b);
}

export const replace = (pattern: string | RegExp, replacement: string) =>
  (str: string) => str.replace(pattern, replacement);

export const random = (a?: number, b?: number ) => () => {
  if (a === undefined && b === undefined) {
    return Math.random();
  }
  if (b === undefined) {
    return Math.random() * (a as number);
  }
  return (a as number) + Math.random() * b;
};

export const startsWith = (prefix: string[] | string) => (str: string) => {
  if (isString(prefix)) {
    return str.startsWith(prefix);
  }
  if (isArray(prefix)) {
    for (const p of prefix) {
      if (str.startsWith(p)) {
        return true;
      }
    }
    return false;
  }
  return str.startsWith(prefix);
};

export const endsWith = (postfix: string[] | string | RegExp) => (str: string) => {
  if (isString(postfix)) {
    return str.endsWith(postfix);
  }
  if (isRegExp(postfix)) {
    return !!str.match(postfix);
  }
  if (isArray(postfix)) {
    for (const p of postfix) {
      if (str.endsWith(p)) {
        return true;
      }
    }
    return false;
  }
  return str.endsWith(postfix);
};
