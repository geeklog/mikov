import { SimpleFunc, AnyFunc } from '../types';

export * from './concurrent';
export * from './sequential';
export * from './sleep';

export function run(fn: any, ...args: any[]) {
  fn(...args);
}

export function setLimitedInterval(
  fn: (...args: any[]) => any,
  timeout: number,
  limit: number,
  ...params: any[]
) {
  let i = 0;
  const handler: NodeJS.Timeout = setInterval((...args) => {
    i++;
    if (i > limit) {
      return clearInterval(handler);
    }
    fn(...args);
  }, timeout, ...params);
  return handler;
}

export async function trycatch(fn: SimpleFunc) {
  try {
    await fn();
  } catch (err) {
    console.error(err);
  }
}

export async function filterSeq(this: any[], fn: AnyFunc) {
  const arr = [];
  for (let i = 0; i < this.length; i++) {
    const r = await fn(this[i], i, this);
    if (r) {
      arr.push(this[i]);
    }
  }
  return arr;
}

export async function mapSeq(this: any[], fn: AnyFunc) {
  const arr = [];
  for (let i = 0; i < this.length; i++) {
    arr.push(await fn(this[i], i, this));
  }
  return arr;
}

export async function forEachSeq(this: any[], fn: AnyFunc) {
  for (let i = 0; i < this.length; i++) {
    await fn(this[i], i, this);
  }
}

export function applyControlFlows(obj: any) {
  obj.filterSeq = exports.filterSeq.bind(obj);
  obj.mapSeq = exports.mapSeq.bind(obj);
  obj.forEachSeq = exports.forEachSeq.bind(obj);
}
