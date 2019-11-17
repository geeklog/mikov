import { AnyFunc } from "./types";
import { isFunction } from 'util';

export function clone(a: any[]) {
  const b: any[] = [];
  for (const i of a) {
    b.push(i);
  }
  return b;
}

export function groupBy(objs: any[], k: AnyFunc | string): any[][] {
  const groupsDict: any = {};
  for (const o of objs) {
    let key: string | number;
    if (isFunction(k)) {
      key = (k as AnyFunc)(o);
    } else {
      key = o[k as string];
    }
    groupsDict[key] = groupsDict[key] || [];
    groupsDict[key].push(o);
  }
  return Object.values(groupsDict);
}

/**
 * segmentBy(['h1', 'p', 'p', 'h1', 'p', 'p'], a => a==='h1')
 *   => [['h1', 'p', 'p'], ['h1', 'p', 'p']]
 */
export function segmentBy(array: any[], fn: AnyFunc) {
  const segments = [];
  let currSegment;
  for (const a of array) {
    if (fn(a)) {
      if (currSegment) {
        segments.push(currSegment);
      }
      currSegment = [];
      currSegment.push(a);
    } else {
      if (!currSegment) {
        continue;
      }
      currSegment.push(a);
    }
  }
  segments.push(currSegment);
  return segments;
}

export function iterate(arr: any[]) {
  return arr.map((a, i) => [a, {
    i,
    isStart: i === 0,
    isLast: i === arr.length - 1
  }]);
}

export function exist(arr: any[], fn: AnyFunc) {
  for (const a of arr) {
    if (fn(a)) {
      return true;
    }
  }
  return false;
}

export function uniq(arr: any[]) {
  return arr.filter((a, i) => arr.indexOf(a) === i);
}

export function first(arr: any[]) {
  if (!arr) {
    return undefined;
  }
  if (!arr.length) {
    return undefined;
  }
  if (arr.length <= 0) {
    return undefined;
  }
  return arr[0];
}

export function last(arr: any[]) {
  if (!arr) {
    return undefined;
  }
  if (!arr.length) {
    return undefined;
  }
  if (arr.length <= 0) {
    return undefined;
  }
  return arr[arr.length - 1];
}

export function replaceLast(arr: any, fn: AnyFunc) {
  if (!arr) {
    return undefined;
  }
  arr = clone(arr);
  if (!arr.length) {
    return arr;
  }
  if (arr.length <= 0) {
    return arr;
  }
  arr[arr.length - 1] = fn(arr[arr.length - 1]);
  return arr;
}

export function slicePercent(arr: any[], percent: number) {
  if (percent > 1.0) { throw percent; }
  return arr.splice(Math.floor(arr.length * percent));
}

export function split(arr: any[], fn: AnyFunc) {
  const a = [];
  const b = [];
  for (let i = 0; i < arr.length; i++) {
    fn(arr[i], i) ? a.push(arr[i]) : b.push(arr[i]);
  }
  return [a, b];
}

export function splitAt(arr: any[], ii: any) {
  const a: any[] = [];
  const b: any[] = [];
  for (let i = 0; i < arr.length; i++) {
    (i < ii ? a : b).push(arr[i]);
  }
  return [a, b];
}

/**
 * combination([1,2,3], 2) => [[1,2], [2,3], [1,3]]
 */
export function combination(array: any[], k: any): any[][] {
  if (k <= 1) {
    return array.map(a => [a]);
  }
  let combs: any[] = [];
  let subArray;
  let i = 0;
  while (i < array.length) {
    const t = array[i];
    subArray = array.slice(i + 1, array.length);
    if (subArray.length >= k - 1) {
      const rs = combination(subArray, k - 1);
      for (let ir = 0; ir < rs.length; ir++) {
        rs[ir] = [t].concat(rs[ir]);
      }
      combs = combs.concat(rs);
    }
    i++;
  }
  return combs;
}

/**
 * permutation([1,2], [3,4], [5,6]) => [[1,3,5],[2,3,5],...]
 */
export function permutation(...args: any[]) {
  args = args.filter(a => !!a);

  let pers = [];
  for (const ks of args) {
    pers = p(pers, ks);
  }

  return pers;

  function p(collects: any[], ks: any[]) {
    const results = [];
    for (const k of ks) {
      if (collects.length) {
        for (const collect of collects) {
          const resultOne = collect.concat(k);
          results.push(resultOne);
        }
      } else {
        results.push([k]);
      }
    }
    return results;
  }
}
