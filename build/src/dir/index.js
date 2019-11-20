"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 所有文件路径相关的函数
 */
const os_1 = require("os");
const url_1 = require("../url");
const array_1 = require("../array");
const op_1 = require("../fn/op");
const str_1 = require("../str");
const fs_extra_1 = require("fs-extra");
const md5_1 = __importDefault(require("../md5"));
const p = __importStar(require("path"));
var fs_extra_2 = require("fs-extra");
exports.mkdirp = fs_extra_2.mkdirp;
exports.dir = (path) => p.join(__dirname, path);
exports.dirname = (path) => p.dirname(path);
exports.cwd = (fpath) => p.join(process.cwd(), fpath);
function absolute(path) {
    if (path.startsWith('~/')) {
        return os_1.homedir() + path.slice(1, path.length);
    }
    if (path.startsWith('./')) {
        return p.resolve(p.join(process.cwd(), path));
    }
    return p.resolve(path);
}
exports.absolute = absolute;
/**
 * Escape使得路径可以被bash正确识别
 */
function escapeForBash(str) {
    if (str) {
        str = str.replace(/ /g, "\\ ");
        str = str.replace(/\[/g, "\\[");
        str = str.replace(/\]/g, "\\]");
    }
    return str;
}
exports.escapeForBash = escapeForBash;
/**
 * {nohttp}
 * {urlparts}
 * {id}
 * {-}
 * {hash}
 * {urlencode}
 */
function applyFilePathPattern(key, pathPattern) {
    if (pathPattern.startsWith('tmp/')) {
        pathPattern = pathPattern.replace('tmp', os_1.tmpdir());
    }
    else if (pathPattern.startsWith('./')) {
        pathPattern = pathPattern.replace('./', p.join(process.cwd(), '/'));
    }
    const rules = str_1.extract(pathPattern, '{}').split(',');
    const pathPatternPrefix = pathPattern.split('{')[0];
    const pathPatternPostfix = pathPattern.split('}')[1];
    let rule;
    let parts = [key];
    // tslint:disable-next-line: no-conditional-assignment
    while (rule = rules.shift()) {
        if (rule === 'urlparts') {
            parts = key.split('/').map(s => str_1.removeLastChar(s, ':'));
            continue;
        }
        if (rule === 'nohttp') {
            parts = parts.map(s => s.replace('http://', '').replace('https://', ''));
        }
        if (rule === 'urlencode') {
            parts = parts.map(s => encodeURIComponent(s));
            continue;
        }
        if (rule === 'id') {
            continue;
        }
        if (rule === 'hash') {
            parts = parts.map(s => md5_1.default(s));
            continue;
        }
        if (rule === '-') {
            parts = parts.map(s => s.replace(/:/g, '-').replace(/\//g, '-'));
            continue;
        }
        if (rule === 'random') {
            parts = parts.map(s => Math.random().toString(36).substring(2, 15));
            continue;
        }
        const rgx = /\.(\w+)$/;
        if (rule.match(rgx)) {
            const postfix = rule.match(rgx)[1];
            parts = array_1.replaceLast(parts, lastPart => {
                if (url_1.isRawType(lastPart)) {
                    return lastPart;
                }
                const isHtml = op_1.endsWith(['.html', '.htm', '.xhtml', '.md', '.asp', '.aspx', '.php']);
                if (isHtml(lastPart)) {
                    return array_1.replaceLast(lastPart.split('.'), _ => postfix).join('.');
                }
                return lastPart + '.' + postfix;
            });
            continue;
        }
    }
    let str = p.join(pathPatternPrefix, ...parts);
    if (pathPatternPostfix.startsWith('.')) {
        str += pathPatternPostfix;
    }
    else {
        str = p.join(str, pathPatternPostfix);
    }
    return str;
}
exports.applyFilePathPattern = applyFilePathPattern;
/**
 * flattern dir
 * 把dir目录下的所有文件都移动到上一层
 * ls .
 *   dir/
 * ls ./dir
 *   a.txt b.txt c.txt
 *
 * flattern ./dir
 *
 * ls .
 *   a.txt b.txt c.txt
 * ls ./dir
 *   nothing is in here
 */
function flatten(path) {
    for (const file of fs_extra_1.readdirSync(path)) {
        const filePath = path + '/' + file;
        const upperFilePath = '../' + path + '/' + file;
        fs_extra_1.moveSync(filePath, upperFilePath);
    }
}
exports.flatten = flatten;
