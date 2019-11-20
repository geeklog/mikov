"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const is_1 = require("../is");
/**
 * replaceAll('ayz', 'a', 'x') => 'xyz'
 * replaceAll('abc', {a: 'x', b: 'y', c: 'z'}) => 'xyz'
 * replaceAll('abc', ['a', 'b', 'c'], 'x') => 'xxx'
 */
function replaceAll(str, pattern, replacement) {
    if (is_1.isArray(pattern)) {
        for (const pat of pattern) {
            str = exports.replaceAll(str, pat, replacement);
        }
        return str;
    }
    if (is_1.isObject(pattern)) {
        for (const k of Object.keys(pattern)) {
            str = exports.replaceAll(str, k, pattern[k]);
        }
        return str;
    }
    if (typeof pattern === 'string') {
        return str.replace(new RegExp(pattern, 'g'), replacement);
    }
    return str.replace(pattern, replacement);
}
exports.replaceAll = replaceAll;
function wcharLen(str) {
    return [...Array.from(str)].length;
}
exports.wcharLen = wcharLen;
function repeat(ch, n) {
    let str = '';
    for (let i = 0; i < n; i++) {
        str += ch;
    }
    return str;
}
exports.repeat = repeat;
function pad(str, n) {
    str = str + '';
    const w = wcharLen(str);
    if (w >= n) {
        return str;
    }
    return str + repeat(' ', n - w);
}
exports.pad = pad;
function explode(str, spliter, replaceFn) {
    const parts = [];
    let r = str.match(spliter);
    let icol = 0;
    while (r) {
        if (r.index > 0) {
            let colVal = str.slice(0, r.index);
            if (replaceFn) {
                colVal = replaceFn(colVal, icol);
            }
            parts.push(colVal);
            icol++;
        }
        parts.push(r[0]);
        str = str.slice(r.index + r[0].length, str.length);
        r = str.match(spliter);
    }
    if (str !== '') {
        if (replaceFn) {
            str = replaceFn(str, icol);
        }
        parts.push(str);
    }
    return parts;
}
exports.explode = explode;
function replaceColumn(str, spliter, replaceFn) {
    const parts = [];
    let r = str.match(spliter);
    while (r) {
        let icol = 0;
        if (r.index > 0) {
            let colVal = str.slice(0, r.index);
            if (replaceFn) {
                colVal = replaceFn(colVal, icol);
            }
            parts.push(colVal);
            icol++;
        }
        parts.push(r[0]);
        str = str.slice(r.index + r[0].length, str.length);
        r = str.match(spliter);
    }
    if (str !== '') {
        parts.push(str);
    }
    return parts;
}
exports.replaceColumn = replaceColumn;
/**
 * Examples:
 *   extract("abc(xy)efg", "()") => "xy"
 *   extract("abc((xy)ef)g", "()", true) => "(xy)ef"
 */
function extract(str, brackets, greedy = false) {
    if (!str) {
        return '';
    }
    let s = -1;
    let e = -1;
    const len = str.length;
    for (let i = 0; i < len; i++) {
        if (str[i] === brackets[0]) {
            s = i;
            break;
        }
    }
    if (greedy) {
        for (let i = len - 1; i >= 0; i--) {
            if (str[i] === brackets[1]) {
                e = i;
                break;
            }
        }
    }
    else {
        for (let i = 0; i < len; i++) {
            if (str[i] === brackets[1]) {
                e = i;
                break;
            }
        }
    }
    if (s === -1 || e === -1) {
        return '';
    }
    if (s + 1 >= e) {
        return '';
    }
    return str.substring(s + 1, e);
}
exports.extract = extract;
function quote(val, t) {
    return t + val + t;
}
exports.quote = quote;
function removeLastChar(str, c) {
    if (c === undefined || str.endsWith(c)) {
        str = str.slice(0, str.length - 1);
    }
    return str;
}
exports.removeLastChar = removeLastChar;
function splitMapJoin(str, delimiter, mapper) {
    return str.split(delimiter).map(mapper).join(delimiter);
}
exports.splitMapJoin = splitMapJoin;
function isWhitespace(str) {
    return !!str.match(/^\s+$/);
}
exports.isWhitespace = isWhitespace;
