"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lines_1 = require("../str/lines");
const jq_1 = __importDefault(require("./jq"));
const op_1 = require("../fn/op");
const array_1 = require("../array");
const index_1 = require("./index");
const srccode_1 = require("../str/srccode");
class ScrapeRulesCompiler {
    constructor() {
        this.shouldReturnJQ = false;
        this.shouldUnescape = false;
        this.jq = null;
        this.domPaser = 'cheerio';
        this.shouldPrettify = false;
        this.shouldRemoveEmptyLines = false;
        this.shouldParseToText = false;
        this.instructions = [];
        this.currentInstruction;
    }
    startNextInstruction(src) {
        this.currentInstruction = { src };
    }
    updateInstruction(src) {
        if (!this.currentInstruction) {
            throw new Error(`Syntax error: ${src}`);
        }
        this.currentInstruction.src += src;
    }
    endPrevInstruction() {
        const instr = this.currentInstruction;
        if (!instr) {
            return;
        }
        const src = instr.src;
        const [leftStmt, rightStmt] = src.split('=>').map(op_1.trim);
        if (rightStmt === 'select') {
            instr.label = 'select';
            instr.selector = leftStmt;
        }
        else if (rightStmt === 'remove') {
            instr.label = 'remove';
            instr.selector = leftStmt;
        }
        this.instructions.push(this.currentInstruction);
        this.currentInstruction = null;
    }
    compile(src) {
        src = srccode_1.removeComments(src, '//');
        src = lines_1.removeEmptyLines(src);
        src = lines_1.trimLines(src);
        for (const [line, { i, isLast }] of array_1.iterate(src.split('\n'))) {
            if (line === 'use cheerio') {
                this.endPrevInstruction();
                this.domPaser = 'cheerio';
                continue;
            }
            if (line === 'use jquery') {
                this.endPrevInstruction();
                this.domPaser = 'jquery';
                continue;
            }
            if (line === 'removeComments') {
                this.endPrevInstruction();
                this.instructions.push({
                    label: 'removeComments'
                });
                continue;
            }
            if (line === '$') {
                this.shouldReturnJQ = true;
                continue;
            }
            if (line === 'removeEmptyLines') {
                this.endPrevInstruction();
                this.shouldRemoveEmptyLines = true;
                continue;
            }
            if (line === 'text') {
                this.endPrevInstruction();
                this.shouldParseToText = true;
                continue;
            }
            if (line === 'pretty') {
                this.shouldPrettify = true;
                this.endPrevInstruction();
                continue;
            }
            if (line === 'unescape') {
                this.shouldUnescape = true;
                this.endPrevInstruction();
                continue;
            }
            if (line === 'json {') {
                this;
            }
            if (line.indexOf('=>') >= 0) {
                this.endPrevInstruction();
                this.startNextInstruction(line);
                continue;
            }
            if (isLast) {
                this.endPrevInstruction();
                continue;
            }
            this.updateInstruction(line);
        }
    }
    parse(html) {
        this.jq = new jq_1.default(this.domPaser, html);
        for (const insc of this.instructions) {
            if (insc.label === 'removeComments') {
                this.jq.removeComments();
            }
            else if (insc.label === 'select') {
                this.jq.select(insc.selector);
            }
            else if (insc.label === 'remove') {
                this.jq.remove(insc.selector);
            }
        }
        if (this.shouldReturnJQ) {
            return this.jq.$;
        }
        let res;
        if (this.shouldPrettify) {
            res = this.jq.pretty();
        }
        else {
            res = this.jq.html();
        }
        if (this.shouldUnescape) {
            res = index_1.decodeEntities(res);
        }
        if (this.shouldParseToText) {
            res = this.jq.text();
        }
        if (this.shouldRemoveEmptyLines) {
            res = lines_1.removeEmptyLines(res);
        }
        return res;
    }
}
exports.default = ScrapeRulesCompiler;
