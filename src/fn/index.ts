import { AnyFunc } from "../types";
import { extract } from '../str';
import { trim } from './op';
import { isFunction } from "../is";

export function compose(...fns: AnyFunc[]) {
  return (arg: any) => {
    fns.forEach(fn => { arg = fn(arg); });
    return arg;
  };
}

/**
 * 对函数进行解剖
 * 获取参数列表和函数体
 */
export function dissectFunction(func: AnyFunc) {
  const funcStr = func.toString();
  const body = extract(funcStr, '{}');
  const args = extract(funcStr, '()').split(',').map(trim);
  return {
    body,
    args,
  };
}

export function getter<T>(op: (() => T) | T) {
  return () => {
    if (isFunction(op)) {
      return op();
    } else {
      return op;
    }
  };
}

export function shortcut(fns: AnyFunc[], ...args: any[]) {
  for (const fn of fns) {
    const r = fn(...args);
    if (!!r) {
      return r;
    }
  }
  return undefined;
}
