import { removeEmptyLines, trimLines } from '../str/lines';
import JQ from './jq';
import { trim } from '../fn/op';
import { iterate } from '../array';
import { decodeEntities } from './index';
import { removeComments } from '../str/srccode';

class ScrapeRulesCompiler {

  domPaser: string;
  shouldPrettify: boolean;
  shouldRemoveEmptyLines: boolean;
  shouldParseToText: boolean;
  instructions: any[];
  currentInstruction: any;
  shouldReturnJQ: boolean = false;
  shouldUnescape: boolean = false;
  jq: any = null;

  constructor() {
    this.domPaser = 'cheerio';
    this.shouldPrettify = false;
    this.shouldRemoveEmptyLines = false;
    this.shouldParseToText = false;
    this.instructions = [];
    this.currentInstruction;
  }

  startNextInstruction(src: string) {
    this.currentInstruction = { src };
  }

  updateInstruction(src: string) {
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
    const [leftStmt, rightStmt] = src.split('=>').map(trim);

    if (rightStmt === 'select') {
      instr.label = 'select';
      instr.selector = leftStmt;
    } else if (rightStmt === 'remove') {
      instr.label = 'remove';
      instr.selector = leftStmt;
    }
    this.instructions.push(this.currentInstruction);
    this.currentInstruction = null;
  }

  compile(src: string) {
    src = removeComments(src, '//');
    src = removeEmptyLines(src);
    src = trimLines(src);
    for (const [line, {i, isLast}] of iterate(src.split('\n'))) {
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

  parse(html: string) {
    this.jq = new JQ(this.domPaser, html);
    for (const insc of this.instructions) {
      if (insc.label === 'removeComments') {
        this.jq.removeComments();
      } else if (insc.label === 'select') {
        this.jq.select(insc.selector);
      } else if (insc.label === 'remove') {
        this.jq.remove(insc.selector);
      }
    }

    if (this.shouldReturnJQ) {
      return this.jq.$;
    }

    let res;

    if (this.shouldPrettify) {
      res = this.jq.pretty();
    } else {
      res = this.jq.html();
    }

    if (this.shouldUnescape) {
      res = decodeEntities(res);
    }

    if (this.shouldParseToText) {
      res = this.jq.text();
    }

    if (this.shouldRemoveEmptyLines) {
      res = removeEmptyLines(res);
    }

    return res;
  }

}

export default ScrapeRulesCompiler;
