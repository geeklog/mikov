
export type SimpleFunc = () => Promise<void> | void;
export type AnyFunc = (...args: any[]) => any;
export type Filter<T> = (item: T, index?: number) => boolean;
export type Mapper<T> = (a: T) => T;
