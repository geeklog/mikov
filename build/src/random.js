"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const is_1 = require("./is");
const _1 = require(".");
function randInt(min, max) {
    return lodash_1.random(min, max, false);
}
exports.randInt = randInt;
/**
 * 根据概率随机选中一个
 *
 * distribution 格式:
 *        [[概率, 值], [概率, 值], [概率, 值], [概率, 值]]
 *       | [概率, 值], [概率, 值], [概率, 值], [概率, 值]
 *       | { 概率: 值, 概率: 值, 概率: 值 }
 *
 * 概率之和应为100
 *
 * Examples:
 *
 * _.roll([[10, 'A'], [10, 'B'], [20, 'C']]) // 10/40: A, 10/40: B, 20/40: C
 * _.roll([[0.1, 'A'], [0.2, 'B'], ['...', 'C']]) // 0.1: A, 0.2: B, others(0.7): C
 * _.roll([10, 'A'], [10, 'B'], [20, 'C']) // 10/40: A, 10/40: B, 20/40: C
 * _.roll({50: 'A', 24: 'B', 26: 'C'})   // 50% A, 24% B, 26% C
 *
 * [[0.7,2],[0.20434,3],[0.06,5],[0.03,10],[0.005,20],[0.0005,50],[0.0001,100],[0.00005,1000],[0.00001,5000]]
 */
function roll(...distribution) {
    const { toPairs } = require('lodash');
    if (distribution.length === 1) {
        distribution = distribution[0];
    }
    if (!is_1.isArray(distribution)) {
        distribution = toPairs(distribution).map(([k, v]) => [Number(k), v]);
    }
    let undeterIndex = -1;
    let oddsSum = 0;
    for (const i in distribution) {
        const [odds] = distribution[i];
        if (odds === '...') {
            if (undeterIndex >= 0) {
                throw new Error("More than 2 undetermined probabilities");
            }
            undeterIndex = _1.int(i);
        }
        else {
            oddsSum += odds;
        }
    }
    if (oddsSum >= 1.0 && undeterIndex >= 0) {
        throw new Error("Can't use undetermined probabilities while oddsSum >= 1.0");
    }
    if (undeterIndex >= 0) {
        distribution[undeterIndex][0] = 1.0 - oddsSum;
        oddsSum = 1.0;
    }
    const pick = Math.random() * oddsSum;
    let c = 0;
    for (const i in distribution) {
        const [odds, label] = distribution[i];
        c += odds;
        if (pick <= c) {
            return label;
        }
    }
    return distribution[distribution.length - 1][1];
}
exports.roll = roll;
