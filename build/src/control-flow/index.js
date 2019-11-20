"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./concurrent"));
function setLimitedInterval(fn, timeout, limit, ...params) {
    let i = 0;
    const handler = setInterval((...args) => {
        i++;
        if (i > limit) {
            return clearInterval(handler);
        }
        fn(...args);
    }, timeout, ...params);
    return handler;
}
exports.setLimitedInterval = setLimitedInterval;
function trycatch(fn) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fn();
        }
        catch (err) {
            console.error(err);
        }
    });
}
exports.trycatch = trycatch;
function filterSeq(fn) {
    return __awaiter(this, void 0, void 0, function* () {
        const arr = [];
        for (let i = 0; i < this.length; i++) {
            const r = yield fn(this[i], i, this);
            if (r) {
                arr.push(this[i]);
            }
        }
        return arr;
    });
}
exports.filterSeq = filterSeq;
function mapSeq(fn) {
    return __awaiter(this, void 0, void 0, function* () {
        const arr = [];
        for (let i = 0; i < this.length; i++) {
            arr.push(yield fn(this[i], i, this));
        }
        return arr;
    });
}
exports.mapSeq = mapSeq;
function forEachSeq(fn) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < this.length; i++) {
            yield fn(this[i], i, this);
        }
    });
}
exports.forEachSeq = forEachSeq;
function applyControlFlows(obj) {
    obj.filterSeq = exports.filterSeq.bind(obj);
    obj.mapSeq = exports.mapSeq.bind(obj);
    obj.forEachSeq = exports.forEachSeq.bind(obj);
}
exports.applyControlFlows = applyControlFlows;
