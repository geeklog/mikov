"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function trimLines(str) {
    return str.split('\n').map(s => s.trim()).join('\n');
}
exports.trimLines = trimLines;
function removeEmptyLines(str, consecutive) {
    if (!consecutive) {
        return str.split('\n').filter(line => !!line.trim()).join('\n');
    }
    const res = [];
    const lines = str.split('\n');
    let whiteLineCount = 0;
    for (const line of lines) {
        if (!!line.trim()) {
            res.push(line);
            whiteLineCount = 0;
            continue;
        }
        whiteLineCount++;
        if (whiteLineCount < consecutive) {
            res.push(line);
        }
    }
    return res.join('\n');
}
exports.removeEmptyLines = removeEmptyLines;
