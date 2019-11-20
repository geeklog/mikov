"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const util = __importStar(require("util"));
function isArray(a) {
    return util.isArray(a);
}
exports.isArray = isArray;
// tslint:disable-next-line: ban-types
function isFunction(a) {
    return util.isFunction(a);
}
exports.isFunction = isFunction;
function isNumber(a) {
    return util.isNumber(a);
}
exports.isNumber = isNumber;
function isString(a) {
    return util.isString(a);
}
exports.isString = isString;
function isBoolean(a) {
    return util.isBoolean(a);
}
exports.isBoolean = isBoolean;
function isBuffer(a) {
    return util.isBuffer(a);
}
exports.isBuffer = isBuffer;
function isObject(a) {
    return util.isObject(a);
}
exports.isObject = isObject;
function isDate(a) {
    return util.isDate(a);
}
exports.isDate = isDate;
function isError(a) {
    return util.isError(a);
}
exports.isError = isError;
function isNull(a) {
    return util.isNull(a);
}
exports.isNull = isNull;
function isRegExp(a) {
    return util.isRegExp(a);
}
exports.isRegExp = isRegExp;
function isUndefined(a) {
    return util.isUndefined(a);
}
exports.isUndefined = isUndefined;
