export { mkdirp } from 'fs-extra';
export declare const dir: (path: string) => string;
export declare const dirname: (path: string) => string;
export declare const cwd: (fpath: string) => string;
export declare function absolute(path: string): string;
/**
 * Escape使得路径可以被bash正确识别
 */
export declare function escapeForBash(str: string): string;
/**
 * {nohttp}
 * {urlparts}
 * {id}
 * {-}
 * {hash}
 * {urlencode}
 */
export declare function applyFilePathPattern(key: string, pathPattern: string): string;
/**
 * flattern dir
 * 把dir目录下的所有文件都移动到上一层
 * ls .
 *   dir/
 * ls ./dir
 *   a.txt b.txt c.txt
 *
 * flattern ./dir
 *
 * ls .
 *   a.txt b.txt c.txt
 * ls ./dir
 *   nothing is in here
 */
export declare function flatten(path: string): void;
