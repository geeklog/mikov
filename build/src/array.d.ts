import { AnyFunc } from "./types";
export declare function clone(a: any[]): any[];
export declare function groupBy(objs: any[], k: AnyFunc | string): any[][];
/**
 * segmentBy(['h1', 'p', 'p', 'h1', 'p', 'p'], a => a==='h1')
 *   => [['h1', 'p', 'p'], ['h1', 'p', 'p']]
 */
export declare function segmentBy(array: any[], fn: AnyFunc): (any[] | undefined)[];
export declare function iterate(arr: any[]): any[][];
export declare function exist(arr: any[], fn: AnyFunc): boolean;
export declare function uniq(arr: any[]): any[];
export declare function first(arr: any[]): any;
export declare function last(arr: any[]): any;
export declare function replaceLast(arr: any, fn: AnyFunc): any;
export declare function slicePercent(arr: any[], percent: number): any[];
export declare function split(arr: any[], fn: AnyFunc): any[][];
export declare function splitAt(arr: any[], ii: any): any[][];
/**
 * combination([1,2,3], 2) => [[1,2], [2,3], [1,3]]
 */
export declare function combination(array: any[], k: any): any[][];
/**
 * permutation([1,2], [3,4], [5,6]) => [[1,3,5],[2,3,5],...]
 */
export declare function permutation(...args: any[]): any[];
