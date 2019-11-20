declare type Func = () => any;
export default class Sequential {
    private exeQueue;
    private fn?;
    go(fn: Func): void;
    _next(): Promise<void>;
}
export {};
