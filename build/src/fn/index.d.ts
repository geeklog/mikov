import { AnyFunc } from "../types";
export declare function compose(...fns: AnyFunc[]): (arg: any) => any;
/**
 * 对函数进行解剖
 * 获取参数列表和函数体
 */
export declare function dissectFunction(func: AnyFunc): {
    body: string;
    args: string[];
};
export declare function getter<T>(op: (() => T) | T): () => T;
export declare function shortcut(fns: AnyFunc[], ...args: any[]): any;
