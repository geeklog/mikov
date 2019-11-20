"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
__export(require("./control-flow"));
function int(a) {
    return Math.floor(Number(a) || 0);
}
exports.int = int;
/**
 * shalow comparation
 */
function equals(a, b) {
    if ((util_1.isArray(a) && util_1.isArray(b)) || (util_1.isObject(a) && util_1.isObject(b))) {
        for (const k in a) {
            if (a[k] !== b[k]) {
                return false;
            }
        }
        return true;
    }
    if (a.equals && b.equals) {
        return a.equals(b);
    }
    return a === b;
}
exports.equals = equals;
function entries(o) {
    const arr = [];
    for (const k of Object.keys(o)) {
        arr.push([k, o[k]]);
    }
    return arr;
}
exports.entries = entries;
exports.transferAttribute = (a, b, k, fn) => {
    if (!a[k]) {
        if (fn) {
            b[k] = fn();
        }
        return;
    }
    b[k] = fn ? fn(a[k]) : a[k];
    delete a[k];
};
function typedef(obj) {
    if (util_1.isArray(obj)) {
        return obj.map(typedef).slice(0, 1);
    }
    if (util_1.isObject(obj)) {
        const types = {};
        for (const k of Object.keys(obj)) {
            types[k] = typedef(obj[k]);
        }
        return types;
    }
    return typeof obj;
}
exports.typedef = typedef;
function cases(val, arr) {
    for (let i = 0; i < arr.length; i++) {
        const [cond, label] = arr[i];
        if (util_1.isNumber(cond)) {
            if (val < cond) {
                return label;
            }
        }
        else if (util_1.isFunction(cond)) {
            if (cond(val, i)) {
                return label;
            }
        }
        else if (cond === true) {
            return label;
        }
    }
    return arr[arr.length - 1][1];
}
exports.cases = cases;
