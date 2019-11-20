"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
function clone(a) {
    const b = [];
    for (const i of a) {
        b.push(i);
    }
    return b;
}
exports.clone = clone;
function groupBy(objs, k) {
    const groupsDict = {};
    for (const o of objs) {
        let key;
        if (util_1.isFunction(k)) {
            key = k(o);
        }
        else {
            key = o[k];
        }
        groupsDict[key] = groupsDict[key] || [];
        groupsDict[key].push(o);
    }
    return Object.values(groupsDict);
}
exports.groupBy = groupBy;
/**
 * segmentBy(['h1', 'p', 'p', 'h1', 'p', 'p'], a => a==='h1')
 *   => [['h1', 'p', 'p'], ['h1', 'p', 'p']]
 */
function segmentBy(array, fn) {
    const segments = [];
    let currSegment;
    for (const a of array) {
        if (fn(a)) {
            if (currSegment) {
                segments.push(currSegment);
            }
            currSegment = [];
            currSegment.push(a);
        }
        else {
            if (!currSegment) {
                continue;
            }
            currSegment.push(a);
        }
    }
    segments.push(currSegment);
    return segments;
}
exports.segmentBy = segmentBy;
function iterate(arr) {
    return arr.map((a, i) => [a, {
            i,
            isStart: i === 0,
            isLast: i === arr.length - 1
        }]);
}
exports.iterate = iterate;
function exist(arr, fn) {
    for (const a of arr) {
        if (fn(a)) {
            return true;
        }
    }
    return false;
}
exports.exist = exist;
function uniq(arr) {
    return arr.filter((a, i) => arr.indexOf(a) === i);
}
exports.uniq = uniq;
function first(arr) {
    if (!arr) {
        return undefined;
    }
    if (!arr.length) {
        return undefined;
    }
    if (arr.length <= 0) {
        return undefined;
    }
    return arr[0];
}
exports.first = first;
function last(arr) {
    if (!arr) {
        return undefined;
    }
    if (!arr.length) {
        return undefined;
    }
    if (arr.length <= 0) {
        return undefined;
    }
    return arr[arr.length - 1];
}
exports.last = last;
function replaceLast(arr, fn) {
    if (!arr) {
        return undefined;
    }
    arr = clone(arr);
    if (!arr.length) {
        return arr;
    }
    if (arr.length <= 0) {
        return arr;
    }
    arr[arr.length - 1] = fn(arr[arr.length - 1]);
    return arr;
}
exports.replaceLast = replaceLast;
function slicePercent(arr, percent) {
    if (percent > 1.0) {
        throw percent;
    }
    return arr.splice(Math.floor(arr.length * percent));
}
exports.slicePercent = slicePercent;
function split(arr, fn) {
    const a = [];
    const b = [];
    for (let i = 0; i < arr.length; i++) {
        fn(arr[i], i) ? a.push(arr[i]) : b.push(arr[i]);
    }
    return [a, b];
}
exports.split = split;
function splitAt(arr, ii) {
    const a = [];
    const b = [];
    for (let i = 0; i < arr.length; i++) {
        (i < ii ? a : b).push(arr[i]);
    }
    return [a, b];
}
exports.splitAt = splitAt;
/**
 * combination([1,2,3], 2) => [[1,2], [2,3], [1,3]]
 */
function combination(array, k) {
    if (k <= 1) {
        return array.map(a => [a]);
    }
    let combs = [];
    let subArray;
    let i = 0;
    while (i < array.length) {
        const t = array[i];
        subArray = array.slice(i + 1, array.length);
        if (subArray.length >= k - 1) {
            const rs = combination(subArray, k - 1);
            for (let ir = 0; ir < rs.length; ir++) {
                rs[ir] = [t].concat(rs[ir]);
            }
            combs = combs.concat(rs);
        }
        i++;
    }
    return combs;
}
exports.combination = combination;
/**
 * permutation([1,2], [3,4], [5,6]) => [[1,3,5],[2,3,5],...]
 */
function permutation(...args) {
    args = args.filter(a => !!a);
    let pers = [];
    for (const ks of args) {
        pers = p(pers, ks);
    }
    return pers;
    function p(collects, ks) {
        const results = [];
        for (const k of ks) {
            if (collects.length) {
                for (const collect of collects) {
                    const resultOne = collect.concat(k);
                    results.push(resultOne);
                }
            }
            else {
                results.push([k]);
            }
        }
        return results;
    }
}
exports.permutation = permutation;
