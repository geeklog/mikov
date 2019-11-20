declare type Func = () => any;
interface Options {
    onErrorOccur?: 'skip' | 'break';
    suppressError: boolean;
}
declare type OnOneDone = (r: any, success: number, fail: number, total: number) => void;
declare type OnError = (err: Error, success: number, fail: number, total: number) => void;
declare type OnAllDone = (success: number, fail: number, total: number) => void;
export declare class Concurrent {
    private success;
    private fail;
    private total;
    private exeQueue;
    private runningCount;
    private limit;
    private onErrorOccur?;
    private halt;
    private onOneDone?;
    private onError?;
    private onAllDone?;
    private supressError;
    constructor(limit: number, options?: Options);
    go(fn: Func): void;
    one(callback: OnOneDone): void;
    done(callback: OnAllDone): void;
    error(callback: OnError): void;
    private next;
    private call;
}
export declare function concurrent(limit: number, options?: Options): Concurrent;
export {};
