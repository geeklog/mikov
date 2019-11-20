"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const str_1 = require("../str");
const op_1 = require("./op");
const is_1 = require("../is");
function compose(...fns) {
    return (arg) => {
        fns.forEach(fn => { arg = fn(arg); });
        return arg;
    };
}
exports.compose = compose;
/**
 * 对函数进行解剖
 * 获取参数列表和函数体
 */
function dissectFunction(func) {
    const funcStr = func.toString();
    const body = str_1.extract(funcStr, '{}');
    const args = str_1.extract(funcStr, '()').split(',').map(op_1.trim);
    return {
        body,
        args,
    };
}
exports.dissectFunction = dissectFunction;
function getter(op) {
    return () => {
        if (is_1.isFunction(op)) {
            return op();
        }
        else {
            return op;
        }
    };
}
exports.getter = getter;
function shortcut(fns, ...args) {
    for (const fn of fns) {
        const r = fn(...args);
        if (!!r) {
            return r;
        }
    }
    return undefined;
}
exports.shortcut = shortcut;
