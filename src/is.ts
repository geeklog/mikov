import * as util from 'util';

export function isArray(a: any): a is [] {
  return util.isArray(a);
}

// tslint:disable-next-line: ban-types
export function isFunction(a: any): a is Function {
  return util.isFunction(a);
}

export function isNumber(a: any): a is number {
  return util.isNumber(a);
}

export function isString(a: any): a is string {
  return util.isString(a);
}

export function isBoolean(a: any): a is boolean {
  return util.isBoolean(a);
}

export function isBuffer(a: any): a is Buffer {
  return util.isBuffer(a);
}

export function isObject(a: any): a is object {
  return util.isObject(a);
}

export function isDate(a: any): a is Date {
  return util.isDate(a);
}

export function isError(a: any): a is Error {
  return util.isError(a);
}

export function isNull(a: any): a is null {
  return util.isNull(a);
}

export function isRegExp(a: any): a is RegExp {
  return util.isRegExp(a);
}

export function isUndefined(a: any): a is undefined {
  return util.isUndefined(a);
}
