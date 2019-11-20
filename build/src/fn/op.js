"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
exports.trim = (s) => s.trim();
exports.exists = (a) => !!a;
function collect(val, memo) {
    memo.push(val);
    return memo;
}
exports.collect = collect;
function tap(fn) {
    return (a) => {
        fn(a);
        return a;
    };
}
exports.tap = tap;
function oneOf(fns) {
    return (a) => {
        for (const fn of fns) {
            const r = fn(a);
            if (r !== a) {
                return r;
            }
        }
        return a;
    };
}
exports.oneOf = oneOf;
function compare(arr, brr) {
    if (util_1.isArray(arr) && util_1.isArray(brr)) {
        for (let i = 0; i < arr.length; i++) {
            if (!arr[i] && !brr[i]) {
                continue;
            }
            if (arr[i] && !brr[i]) {
                return 1;
            }
            if (!arr[i] && brr[i]) {
                return -1;
            }
            if (arr[i] < brr[i]) {
                return -1;
            }
            if (arr[i] > brr[i]) {
                return 1;
            }
            continue;
        }
    }
    else {
        if (arr < brr) {
            return -1;
        }
        if (arr > brr) {
            return 1;
        }
    }
    return 0;
}
exports.compare = compare;
exports.asc = compare;
function desc(a, b) {
    return -exports.asc(a, b);
}
exports.desc = desc;
exports.replace = (pattern, replacement) => (str) => str.replace(pattern, replacement);
exports.random = (a, b) => () => {
    if (a === undefined && b === undefined) {
        return Math.random();
    }
    if (b === undefined) {
        return Math.random() * a;
    }
    return a + Math.random() * b;
};
exports.startsWith = (prefix) => (str) => {
    if (util_1.isString(prefix)) {
        return str.startsWith(prefix);
    }
    if (util_1.isArray(prefix)) {
        for (const p of prefix) {
            if (str.startsWith(p)) {
                return true;
            }
        }
        return false;
    }
    return str.startsWith(prefix);
};
exports.endsWith = (postfix) => (str) => {
    if (util_1.isString(postfix)) {
        return str.endsWith(postfix);
    }
    if (util_1.isRegExp(postfix)) {
        return !!str.match(postfix);
    }
    if (util_1.isArray(postfix)) {
        for (const p of postfix) {
            if (str.endsWith(p)) {
                return true;
            }
        }
        return false;
    }
    return str.endsWith(postfix);
};
