/// <reference types="node" />
import { SimpleFunc, AnyFunc } from '../types';
export * from './concurrent';
export declare function setLimitedInterval(fn: (...args: any[]) => any, timeout: number, limit: number, ...params: any[]): NodeJS.Timeout;
export declare function trycatch(fn: SimpleFunc): Promise<void>;
export declare function filterSeq(this: any[], fn: AnyFunc): Promise<any[]>;
export declare function mapSeq(this: any[], fn: AnyFunc): Promise<any[]>;
export declare function forEachSeq(this: any[], fn: AnyFunc): Promise<void>;
export declare function applyControlFlows(obj: any): void;
