"use strict";
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
const cheerio = __importStar(require("cheerio"));
const jquery_1 = __importDefault(require("jquery"));
const jsdom_1 = require("jsdom");
class JQ {
    constructor(type = 'cheerio', html) {
        this.type = type;
        this.load(html);
        this.$ = cheerio.load(html);
    }
    load(html) {
        if (this.type === 'cheerio') {
            this.$ = cheerio.load(html);
        }
        else {
            const dom = new jsdom_1.JSDOM(html);
            this.$ = jquery_1.default(dom.window);
        }
        this.$.__DOM_PARSER__ = this.type;
        return this.$;
    }
    remove(pattern) {
        this.$(pattern).remove();
    }
    select(pattern) {
        const html = this.$.html(pattern);
        this.load(html);
        return html;
    }
    removeComments() {
        const self = this;
        if (self.type === 'cheerio') {
            self.$
                .root()
                .find('*')
                .contents()
                .filter(function () {
                return this.type === 'comment';
            })
                .remove();
        }
    }
    pretty() {
        return require('pretty')(this.html());
    }
    html() {
        return this.$.html();
    }
    text() {
        return this.$.root().text();
    }
}
exports.default = JQ;
