"use strict";
/**
 * A full-fledge http/https/p2p downloader and requester
 *
 * HTML:
 * - Encoding
 *
 * File download:
 * - Downloading status
 * - Download file with multiple connection to speed up.
 * - Download files via p2p networks.
 * - Log transmit speed
 * - Resume download
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const lodash_1 = require("lodash");
const html_1 = require("./html");
const url_1 = require("./url");
const fs_1 = require("./fs");
const p = __importStar(require("path"));
const dir_1 = require("./dir");
const cached_1 = __importDefault(require("./cached"));
const retry_1 = __importDefault(require("./retry"));
const op_1 = require("./fn/op");
const _1 = require(".");
const jq_helper_1 = __importDefault(require("./html/jq-helper"));
function parseSavePath(url, savePath, ext = '') {
    if (!savePath) {
        return '';
    }
    if (op_1.endsWith(/\.\w+$/)(savePath)) {
        return dir_1.cwd(savePath);
    }
    else {
        const pattern = p.join(savePath, `{nohttp,-${ext ? (',' + ext) : ext}}`);
        return dir_1.applyFilePathPattern(url, pattern);
    }
}
exports.parseSavePath = parseSavePath;
function parseOptions(url, options) {
    let a;
    a = util_1.isString(url) ? { url } : url;
    const b = options || {};
    const all = lodash_1.merge({}, a, b);
    url = all.url;
    if (!url || !url.startsWith || url.startsWith('/')) {
        throw new Error(`URL malform: ${JSON.stringify(url)} ${JSON.stringify(options)}`);
    }
    all.url = url.startsWith('http') ? url : `http://${url}`;
    all.method = all.method || 'get';
    const ctrls = {};
    _1.transferAttribute(all, ctrls, 'retry', (rty) => {
        if (util_1.isNumber(rty)) {
            return { times: rty, interval: 0 };
        }
        else if (!rty) {
            return { times: 0, interval: 0 };
        }
        return rty;
    });
    _1.transferAttribute(all, ctrls, 'savePath');
    _1.transferAttribute(all, ctrls, 'cache', (cache) => {
        if (util_1.isString(cache)) {
            return { type: 'file', path: cache };
        }
        else {
            return cache;
        }
    });
    _1.transferAttribute(all, ctrls, 'parse');
    _1.transferAttribute(all, ctrls, 'parseRule');
    _1.transferAttribute(all, ctrls, 'parseRules');
    return [all, ctrls];
}
exports.parseOptions = parseOptions;
function xhr(options, ctrls) {
    return __awaiter(this, void 0, void 0, function* () {
        if (ctrls.parseRule) {
            throw new Error('Do you mean: parseRules ?');
        }
        const resData = yield cached_1.default(options.url, ctrls.cache, retry_1.default(() => __awaiter(this, void 0, void 0, function* () {
            try {
                const reqOptions = lodash_1.clone(options);
                if (url_1.isRawType(reqOptions.url)) {
                    reqOptions.responseType = 'stream';
                }
                if (options.httpsProxy) {
                    const HttpsProxyAgent = require('https-proxy-agent');
                    reqOptions.httpsAgent = new HttpsProxyAgent(reqOptions.httpsProxy);
                    delete reqOptions.httpsProxy;
                }
                const res = yield require('axios')(reqOptions);
                if (res.status === 200) {
                    return res.data;
                }
                throw new Error(`Server response with code: ${res.status}`);
            }
            catch (err) {
                throw new Error(`fetch fail: ${err.message} ${JSON.stringify(options)}`);
            }
        }), {
            times: ctrls.retry.times,
            interval: ctrls.retry.interval
        }));
        if (options.isRawType || !(ctrls.parseRules || ctrls.parse)) {
            return resData;
        }
        const $ = html_1.onRules(resData, ctrls.parseRules || `use ${ctrls.parse}\n$`);
        if (util_1.isString($)) {
            return $;
        }
        jq_helper_1.default($);
        return $;
    });
}
function _saveRawFile(options, ctrls) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!ctrls.savePath) {
            throw new Error('No save path');
        }
        const res = yield xhr(options, ctrls);
        const fpath = parseSavePath(options.url, ctrls.savePath);
        yield fs_1.mkdirpSaveFile(fpath, res);
        return ctrls.savePath;
    });
}
/**
 * options, controls = {
 *   url: 'https://www.google.com',
 *   httpProxy: 'http://127.0.0.1:7890',
 *   httpsProxy: 'http://127.0.0.1:7890',
 *   retry: {
 *     times: 1,
 *     interval: 1000,
 *     interval: () => 1000 + Math.random() * 1000
 *   },
 *   cache: 'cache',
 *   cache: './cache/{urlparts,urlencode,random}',
 *   cache: {
 *     type: 'memory',
 *     type: 'file',
 *     path: 'tmp/{urlparts,urlencode}',
 *     path: './cache/{hash}
 *     expire: 6000
 *   }
 * }
 */
function fetch(url, optionsEx) {
    return __awaiter(this, void 0, void 0, function* () {
        const [options, ctrls] = parseOptions(url, optionsEx);
        return yield xhr(options, ctrls);
    });
}
exports.fetch = fetch;
function saveRawFile(url, optionsEx) {
    return __awaiter(this, void 0, void 0, function* () {
        const [options, ctrls] = parseOptions(url, optionsEx);
        yield _saveRawFile(options, ctrls);
    });
}
exports.saveRawFile = saveRawFile;
function saveMarkdown(url, optionsEx) {
    return __awaiter(this, void 0, void 0, function* () {
        const [options, ctrls] = parseOptions(url, optionsEx);
        if (url_1.isRawType(options.url)) {
            return yield _saveRawFile(options, ctrls);
        }
        const savePath = ctrls.savePath;
        ctrls.parse = 'cheerio';
        if (!savePath) {
            throw new Error('No save path');
        }
        const $ = yield xhr(options, ctrls);
        $.cleanup();
        const md = $.markdown();
        const fpath = parseSavePath(options.url, ctrls.savePath, '.md');
        yield fs_1.mkdirpSaveFile(fpath, md);
        return fpath;
    });
}
exports.saveMarkdown = saveMarkdown;
