import debug from '../debug';
import { applyControlFlows } from '../control-flow';

interface JQHolder extends CheerioStatic {
  __DOM_PARSER__?: string;
}

export default function ($: any) {

  if ($.__DOM_PARSER__ === 'jquery') {
    debug(`jquery has $.html(): ${!!$.html}`);
  }

  $.html = $.html || (() => $("html").html());
  $.text = $.text || (() => {
    return $("html").text();
  });

  $.op = {
    text: (i: number, el: any) => $(el).text(),
    anchor: (i: number, el: any) => ({text: $(el).text(), href: $(el).attr('href')}),
  };

  // prefix links with domain
  $.fixLinks = (domain: string) => {
    $('a').each(function(this: any) {
      if (this.href.startsWith('/')) {
        this.href = domain + this.href;
      }
    });
  };

  // get all links of current page from a.href
  $.links = (start: string = '') => {
    const anchors = [...$('a').toArray()];
    return anchors
      .map(a => $(a).attr('href'))
      .filter(href => href.startsWith(start));
  };

  $.anchors = (selector: string) => {
    const anchors: Array<{text: string, href: string}> = [];
    $(selector).each(function(this: any) {
      const a = $(this);
      anchors.push({
        text: a.text(),
        href: a.attr('href')
      });
    });
    applyControlFlows(anchors);
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
  $.embedImages = async (cache: any) => {
    await Promise.all(
      [...$('img')]
        .filter(img => img.src.startsWith('http'))
        .map(async img => {
          try {
            const imgdata = await exports.fetch(img.src, { cache });
            img.alt = img.src;
            img.src = `data:image/png;base64,${imgdata.toString('base64')}`;
          } catch (err) {
            console.error(err);
          }
        })
    );
  };

  // Downlad images of current page into dir and link img.src accordingly
  $.saveImages = async (dir: string, cache: any) => {
    const fs = require('fs-extra');
    const {dirname} = require('path');
    const { applyFilePathPattern } = require('./dir');

    let dirExist: boolean;

    await Promise.all(
      [...$('img')]
        .filter(img => img.src.startsWith('http'))
        .map(async img => {
          try {
            const imgdata = await exports.fetch(img.src, { cache });
            const fpath = applyFilePathPattern(img.src, dir);
            const fdir = dirname(fpath);
            if (dirExist === undefined) {
              dirExist = fs.existsSync(fdir);
            }
            if (!dirExist) {
              fs.mkdirpSync(fdir);
            }
            img.src = fpath;
            await fs.writeFile(fpath, imgdata);
          } catch (err) {
            console.error(err);
          }
        })
    );
  };

  $.markdown = () => {
    const {trimLines, removeEmptyLines} = require('../str/lines');
    let md = require('to-markdown')($.html());
    md = $.load(md).text();
    md = trimLines(md);
    md = removeEmptyLines(md, 2);
    return md;
  };

};
