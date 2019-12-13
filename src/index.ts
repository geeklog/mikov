import { Filter } from './types';
import { splitTail } from './array';
import { isRegExp, isArray, isObject, isNumber, isFunction } from './is';

export * from './control-flow';

export const str = s => `${s}`;

export function int(a: any) {
  return Math.floor(Number(a) || 0);
}

export { run } from './control-flow';

/**
 * shalow comparation
 */
export function equals(a: any, b: any): boolean {
  if ((isArray(a) && isArray(b)) || (isObject(a) && isObject(b))) {
    for (const k in a) {
      if (a[k] !== b[k]) {
        return false;
      }
    }
    return true;
  }
  if (a.equals && b.equals) {
    return a.equals(b);
  }
  return a === b;
}

export function cmp(a: any, b: any): number {
  if ((isArray(a) && isArray(b)) || (isObject(a) && isObject(b))) {
    let r;
    for (const k in a) {
      r = cmp(a[k], b[k]);
      if (r !== 0) {
        return r;
      }
    }
    return r;
  }
  if (a === undefined && b !== undefined) {
    return -1;
  }
  if (a !== undefined && b === undefined) {
    return 1;
  }
  if (a !== undefined && !isNaN(Number(a))) {
    a = Number(a);
  }
  if (a !== undefined && !isNaN(Number(b))) {
    b = Number(b);
  }
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}

export function entries(o: any) {
  const arr = [];
  for (const k of Object.keys(o)) {
    arr.push([k, o[k]]);
  }
  return arr;
}

export const transferAttribute = (a: any, b: any, k: any, fn?: any) => {
  if (!a[k]) {
    if (fn) {
      b[k] = fn();
    }
    return;
  }
  b[k] = fn ? fn(a[k]) : a[k];
  delete a[k];
};

export function typedef(obj: any): object | string {
  if (isArray(obj)) {
    return obj.map(typedef).slice(0, 1);
  }
  if (isObject(obj)) {
    const types: any = {};
    for (const k of Object.keys(obj)) {
      types[k] = typedef(obj[k]);
    }
    return types;
  }
  return typeof obj;
}

export function cases<T>(val: any, arr: any[]): T {
  for (let i = 0; i < arr.length; i++) {
    const [conds, match] = splitTail(arr[i]);
    for (const cond of conds) {
      if (val === cond) {
        return match;
      }
      if (isNumber(cond) && val < cond) {
        return match;
      }
      if (isFunction(cond) && (cond as Filter<T>)(val, i)) {
        return match;
      }
      if (isRegExp(cond) && cond.test(val)) {
        return match;
      }
      if (cond === true) {
        return match;
      }
    }
  }
  return undefined;
}

export function between(lowerBound: any, val: any, upperBound: any) {
  if (val < lowerBound) { return lowerBound; }
  if (val > upperBound) { return upperBound; }
  return val;
}
