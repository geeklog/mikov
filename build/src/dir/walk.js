"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const walk_sync_1 = __importDefault(require("walk-sync"));
const path_1 = require("path");
/**
 * rule = {
 *   startsWith: '',
 *   endsWith: '.js',
 *   fileOrDir: 'file',
 *   excludes: ['node_modules', 'astcache']
 * };
 */
function walk(dir, rule, fnHandler) {
    if (!dir.startsWith('/')) {
        dir = path_1.join(process.cwd(), dir);
    }
    rule = rule || {};
    rule.excludes = rule.excludes || ['node_modules', '.git'];
    const paths = walk_sync_1.default(dir);
    for (const p of paths) {
        const path = path_1.join(dir, p);
        if (matchRule(path, rule)) {
            try {
                fnHandler ? fnHandler(path) : null;
            }
            catch (err) {
                console.error('trying:' + path, err);
            }
        }
    }
}
exports.default = walk;
function matchRule(path, rule) {
    if (util_1.isArray(rule.startsWith)) {
        for (const s of rule.startsWith) {
            if (!path.startsWith(s)) {
                return false;
            }
        }
    }
    if (util_1.isString(rule.startsWith)) {
        if (!path.startsWith(rule.startsWith)) {
            return false;
        }
    }
    if (util_1.isArray(rule.endsWith)) {
        for (const s of rule.endsWith) {
            if (!path.endsWith(s)) {
                return false;
            }
        }
    }
    if (util_1.isString(rule.endsWith)) {
        if (!path.endsWith(rule.endsWith)) {
            return false;
        }
    }
    if (util_1.isArray(rule.excludes)) {
        for (const s of rule.excludes) {
            if (path.indexOf(s) >= 0) {
                return false;
            }
        }
    }
    if (rule.fileOrDir) {
        try {
            const stat = require('fs').lstatSync(path);
            if (rule.fileOrDir === 'file' && stat.isDirectory()) {
                return false;
            }
            if (rule.fileOrDir === 'dir' && !stat.isDirectory()) {
                return false;
            }
        }
        catch (e) {
            if (!rule.supressError) {
                console.error(e);
            }
            return false;
        }
    }
    return true;
}
