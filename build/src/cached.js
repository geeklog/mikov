"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * cached
 *
 * @param {*} key the key for store item
 * @param {*} rules rules that apply to cache
 *  {
 *    type: memory | file,
 *    path:
 *      'tmp/{t}' => os.tmp() + {t}
 *      './{t}' => process.cwd() + {t}
 *      {urlparts}: 'https://www.test.com/a/b/c' => 'https/www.test.com/a/b/c'
 *      {urlencode}: 'https://www.test.com/==' => 'https/www.test.com/%3D%3D'
 *  }
 * @param {*} content the content provider, can be the cotent itself or a getter function
 */
function cached(key, rules, content) {
    return __awaiter(this, void 0, void 0, function* () {
        const { join } = require('path');
        const { getter } = require('./fn');
        const { parseTimeDesc } = require('./date');
        const get = getter(content);
        if (!rules) {
            return yield get();
        }
        if (!rules.type) {
            throw new Error(`No type: ${JSON.stringify(rules)}`);
        }
        if (!rules.path) {
            throw new Error(`No path: ${JSON.stringify(rules)}`);
        }
        if (rules.type === 'file') {
            if (rules.path.indexOf('{') === -1 && rules.path.indexOf('}') === -1) {
                rules.path = join(rules.path, '{urlparts,urlencode}');
            }
        }
        rules.type = rules.type || 'file';
        if (rules.type === 'memory') {
            this.__memoryCache = this.__memoryCache || {};
            this.__memoryCacheExpirations = this.__memoryCacheExpirations || {};
            const notExpired = !(rules.expire &&
                this.__memoryCacheExpirations[key] &&
                Date.now() - this.__memoryCacheExpirations[key] >= parseTimeDesc(rules.expire));
            if (this.__memoryCache[key] && notExpired) {
                return this.__memoryCache[key];
            }
            else {
                const data = yield get();
                this.__memoryCache[key] = data;
                this.__memoryCacheExpirations[key] = Date.now();
                return data;
            }
        }
        if (rules.type === 'file') {
            const { applyFilePathPattern } = require('./dir');
            const fpath = applyFilePathPattern(key, rules.path);
            const fs = require('fs-extra');
            const p = require('path');
            let notExpired;
            const fileExisted = yield fs.exists(fpath);
            if (!rules.expire) {
                notExpired = true;
            }
            else if (!fileExisted) {
                notExpired = false;
            }
            else {
                const lastModifield = (yield fs.stat(fpath)).mtime.getTime();
                notExpired = Date.now() - lastModifield < parseTimeDesc(rules.expire);
            }
            if (fileExisted && notExpired) {
                return yield fs.readFile(fpath);
            }
            else {
                const data = yield get();
                yield fs.mkdirp(p.dirname(fpath));
                if (!data) {
                    throw new Error(`no data: ${content}`);
                }
                if (data.pipe) {
                    const fw = fs.createWriteStream(fpath);
                    data.pipe(fw);
                    yield new Promise((resolve, reject) => {
                        fw.on('finish', resolve);
                        fw.on('error', reject);
                    });
                    return yield fs.readFile(fpath);
                }
                else {
                    yield fs.writeFile(fpath, data);
                }
                return data;
            }
        }
    });
}
exports.default = cached;
