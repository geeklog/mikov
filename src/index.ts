import { isArray, isObject, isNumber, isFunction } from 'util';
import { Filter } from './types';

export * from './control-flow';

export function int(a: any) {
  return Math.floor(Number(a) || 0);
}

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

export function cases<T>(val: any, arr: Array<[Filter<T> | number | boolean, T]>): T {
  for (let i = 0; i < arr.length; i++) {
    const [cond, label] = arr[i];
    if (isNumber(cond)) {
      if (val < cond) {
        return label;
      }
    } else if (isFunction(cond)) {
      if ((cond as Filter<T>)(val, i)) {
        return label;
      }
    } else if (cond === true) {
      return label;
    }
  }
  return arr[arr.length - 1][1];
}
