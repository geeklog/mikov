"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const str_1 = require("../str");
const array_1 = require("../array");
const __1 = require("..");
exports.removeComments = (src, commentType) => {
    if (commentType === '//') {
        return src
            .split('\n')
            .map(s => s.trim())
            .map(s => s.replace(/\/\/.*$/g, ''))
            .join('\n');
    }
    throw new Error('Unsupported');
};
function insertEndingCommas(src, c, skipEndings) {
    return str_1.splitMapJoin(src, '\n', (line) => {
        if (line.endsWith(c)) {
            return line;
        }
        if (array_1.exist(skipEndings, s => line.endsWith(s))) {
            return line;
        }
        return `${line}${c}`;
    });
}
exports.insertEndingCommas = insertEndingCommas;
function countWords(str) {
    const tokenLines = str
        .split('\n')
        .map(line => line.split(/\W/).filter(t => t.replace(/\s+/g, '') != ''))
        .filter(line => line.length);
    const counts = {};
    for (const tokens of tokenLines) {
        for (const token of tokens) {
            if (counts[token]) {
                counts[token]++;
            }
            else {
                counts[token] = 1;
            }
        }
    }
    return __1.entries(counts).sort(([k1, v1], [k2, v2]) => v2 - v1);
}
exports.countWords = countWords;
