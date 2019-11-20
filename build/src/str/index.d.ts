import { Mapper } from '../types';
interface Str2str {
    [index: string]: string;
}
/**
 * replaceAll('ayz', 'a', 'x') => 'xyz'
 * replaceAll('abc', {a: 'x', b: 'y', c: 'z'}) => 'xyz'
 * replaceAll('abc', ['a', 'b', 'c'], 'x') => 'xxx'
 */
export declare function replaceAll(str: string, pattern: string | RegExp | string[] | Str2str, replacement: string): string;
export declare function wcharLen(str: string): number;
export declare function repeat(ch: string, n: number): string;
export declare function pad(str: string, n: number): string;
export declare function explode(str: string, spliter: string, replaceFn: (a: any, i: number) => any): any[];
export declare function replaceColumn(str: string, spliter: string, replaceFn: any): any[];
/**
 * Examples:
 *   extract("abc(xy)efg", "()") => "xy"
 *   extract("abc((xy)ef)g", "()", true) => "(xy)ef"
 */
export declare function extract(str: string, brackets: string, greedy?: boolean): string;
export declare function quote(val: string, t: string): string;
export declare function removeLastChar(str: string, c: string): string;
export declare function splitMapJoin(str: string, delimiter: string, mapper: Mapper<string>): string;
export declare function isWhitespace(str: string): boolean;
export {};
