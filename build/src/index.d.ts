import { Filter } from './types';
export * from './control-flow';
export declare function int(a: any): number;
/**
 * shalow comparation
 */
export declare function equals(a: any, b: any): boolean;
export declare function entries(o: any): any[][];
export declare const transferAttribute: (a: any, b: any, k: any, fn?: any) => void;
export declare function typedef(obj: any): object | string;
export declare function cases<T>(val: any, arr: Array<[Filter<T> | number | boolean, T]>): T;
