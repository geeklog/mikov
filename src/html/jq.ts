import * as cheerio from 'cheerio';
import * as jquery from 'jquery';
import { JSDOM } from 'jsdom';

interface JQHolder extends CheerioStatic {
  __DOM_PARSER__?: string;
}

class JQ {
  type: string;
  cheerio: any;
  $: JQHolder;

  constructor(type = 'cheerio', html: string) {
    this.type = type;
    this.load(html);
    this.$ = cheerio.load(html);
  }

  load(html: string) {
    if (this.type === 'cheerio') {
      this.$ = (cheerio.load(html) as any) as JQHolder;
    } else {
      const dom = new JSDOM(html);
      this.$ = (jquery(dom.window) as any) as JQHolder;
    }
    this.$.__DOM_PARSER__ = this.type;
    return this.$;
  }

  remove(pattern: string) {
    this.$(pattern).remove();
  }

  select(pattern: string) {
    const html: string = this.$.html(pattern);
    this.load(html);
    return html;
  }

  removeComments() {
    const self = this;
    if (self.type === 'cheerio') {
      (self.$ as CheerioAPI)
        .root()
        .find('*')
        .contents()
        .filter(function(this: {type: string}) {
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

export default JQ;
