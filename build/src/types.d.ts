export declare type SimpleFunc = () => Promise<void> | void;
export declare type AnyFunc = (...args: any[]) => any;
export declare type Filter<T> = (item: T, index?: number) => boolean;
export declare type Mapper<T> = (a: T) => T;
