"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scrape_rule_compiler_1 = __importDefault(require("./scrape-rule-compiler"));
exports.removeTag = (tag) => (str) => str
    .replace(new RegExp(`<${tag}>`, 'g'), '')
    .replace(new RegExp(`<${tag} .+?>`, 'g'), '')
    .replace(new RegExp(`</${tag}>`, 'g'), '');
exports.parseTag = (tagExp, parser) => (str) => str.replace(new RegExp(tagExp, 'g'), parser);
function decodeEntities(encodedString) {
    const translate = {
        nbsp: " ",
        amp: "&",
        quot: "\"",
        lt: "<",
        gt: ">"
    };
    return encodedString
        .replace(/&(nbsp|amp|quot|lt|gt);/g, (match, entity) => translate[entity])
        .replace(/&#(\d+);/gi, (match, numStr) => String.fromCharCode(parseInt(numStr, 10)))
        .replace(/&#x([\dABCDEFabcdef]+);/gi, (match, numStr) => String.fromCharCode(parseInt(numStr, 16)));
}
exports.decodeEntities = decodeEntities;
/**
 *
 * rulesDescription:
 * `
 *   use cheerio // default
 *   removeComments // this is comment
 *   script, noscript, link[rel="stylesheet"], style => remove
 *   meta => remove
 *   .article-word__header__content__holder => select
 *   .article-word__widget => remove
 *   ul => remove
 *   p => select
 *   pretty
 *   removeEmptyLines
 *   text
 * `
 */
exports.onRules = (text, rulesDescription) => {
    const compiler = new scrape_rule_compiler_1.default();
    compiler.compile(rulesDescription);
    return compiler.parse(text);
};
