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
const debug_1 = __importDefault(require("../debug"));
const control_flow_1 = require("../control-flow");
function default_1($) {
    if ($.__DOM_PARSER__ === 'jquery') {
        debug_1.default(`jquery has $.html(): ${!!$.html}`);
    }
    $.html = $.html || (() => $("html").html());
    $.text = $.text || (() => {
        return $("html").text();
    });
    $.op = {
        text: (i, el) => $(el).text(),
        anchor: (i, el) => ({ text: $(el).text(), href: $(el).attr('href') }),
    };
    // prefix links with domain
    $.fixLinks = (domain) => {
        $('a').each(function () {
            if (this.href.startsWith('/')) {
                this.href = domain + this.href;
            }
        });
    };
    // get all links of current page from a.href
    $.links = (start = '') => {
        const anchors = [...$('a').toArray()];
        return anchors
            .map(a => $(a).attr('href'))
            .filter(href => href.startsWith(start));
    };
    $.anchors = (selector) => {
        const anchors = [];
        $(selector).each(function () {
            const a = $(this);
            anchors.push({
                text: a.text(),
                href: a.attr('href')
            });
        });
        control_flow_1.applyControlFlows(anchors);
        return anchors;
    };
    $.pretty = $.pretty || (() => {
        return require('pretty')($.html());
    });
    $.cleanup = () => {
        $('header').remove();
        $('meta').remove();
        $('script').remove();
        $('noscript').remove();
        $('iframe').remove();
        $('style').remove();
        $('*').removeAttr('style');
        $.pretty();
    };
    // Download and embed images into current page using data-uri
    $.embedImages = (cache) => __awaiter(this, void 0, void 0, function* () {
        yield Promise.all([...$('img')]
            .filter(img => img.src.startsWith('http'))
            .map((img) => __awaiter(this, void 0, void 0, function* () {
            try {
                const imgdata = yield exports.fetch(img.src, { cache });
                img.alt = img.src;
                img.src = `data:image/png;base64,${imgdata.toString('base64')}`;
            }
            catch (err) {
                console.error(err);
            }
        })));
    });
    // Downlad images of current page into dir and link img.src accordingly
    $.saveImages = (dir, cache) => __awaiter(this, void 0, void 0, function* () {
        const fs = require('fs-extra');
        const { dirname } = require('path');
        const { applyFilePathPattern } = require('./dir');
        let dirExist;
        yield Promise.all([...$('img')]
            .filter(img => img.src.startsWith('http'))
            .map((img) => __awaiter(this, void 0, void 0, function* () {
            try {
                const imgdata = yield exports.fetch(img.src, { cache });
                const fpath = applyFilePathPattern(img.src, dir);
                const fdir = dirname(fpath);
                if (dirExist === undefined) {
                    dirExist = fs.existsSync(fdir);
                }
                if (!dirExist) {
                    fs.mkdirpSync(fdir);
                }
                img.src = fpath;
                yield fs.writeFile(fpath, imgdata);
            }
            catch (err) {
                console.error(err);
            }
        })));
    });
    $.markdown = () => {
        const { trimLines, removeEmptyLines } = require('../str/lines');
        let md = require('to-markdown')($.html());
        md = $.load(md).text();
        md = trimLines(md);
        md = removeEmptyLines(md, 2);
        return md;
    };
}
exports.default = default_1;
;
