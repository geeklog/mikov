"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const walk_1 = __importDefault(require("./src/dir/walk"));
const op_1 = require("./src/fn/op");
/**
 * const { x } = require('./abc');
 * ~~>
 * import { x } from './abc'
 */
function convertRequireToES6Import(s) {
    if (!s.match(/^const.+=.+require.+$/)) {
        return s;
    }
    let [left, right] = s.split('=');
    left = left.replace('const ', 'import ');
    left = left.trimRight();
    right = right.replace('require(', 'from ');
    right = right.replace(');', ';');
    return [left, right].join('');
}
/**
 * module.exports = m;
 * ~~>
 * export default m;
 */
function convertES5ModuleExportsToES6ExportDefault(s) {
    if (s.indexOf('module.exports') >= 0) {
        return s.replace('module.exports =', 'export default');
    }
    return s;
}
/**
 * exports.a = function () {...
 * ~~>
 * export function a() {...
 *
 * exports.a = function a(...) {
 * ~~>
 * export function a(...) {
 */
function convertES5ExportsFunctionToES6ExportFunction(s) {
    if (s.indexOf('exports.') === -1 || s.indexOf('function') === -1) {
        return s;
    }
    let [left, right] = s.split('=');
    left = left.replace('exports.', 'export function ');
    left = left.trimRight();
    const [r1, r2] = right.split('(');
    right = [r2].join(',');
    return [left, r2].join('(');
}
/**
 * exports.foo = (a, b) => -exports.bar(a, b);
 * ~~>
 * export const foo = (a, b) => -bar(a, b);
 */
function convertExportArrowFunction(s) {
    if (s.indexOf('exports.') === -1 || s.indexOf('=>') === -1) {
        return s;
    }
    // tslint:disable-next-line: prefer-const
    let [left, ...rights] = s.split('=');
    let right = rights.join('=');
    left = left.replace('exports.', 'export const ');
    left = left.trimRight();
    right = right.replace(/exports\./g, '');
    right = right.trimLeft();
    return [left, right].join(' = ');
}
function convertES5ToEs6(src) {
    return src.split('\n')
        .map(op_1.oneOf([
        convertRequireToES6Import,
        convertES5ModuleExportsToES6ExportDefault,
        convertES5ExportsFunctionToES6ExportFunction,
        convertExportArrowFunction
    ]))
        .join('\n');
}
walk_1.default('.', { endsWith: '.js' }, (fpath) => __awaiter(this, void 0, void 0, function* () {
    console.log(fpath);
    convertES5ToEs6(fpath);
}));
// convertES5ToEs6('/Users/livestar/GTD/Packages/mikov/src/xhr.js');
