import ScrapeRulesCompiler from './scrape-rule-compiler';

export const removeTag = (tag: string) =>
  (str: string) => str
    .replace(new RegExp(`<${tag}>`, 'g'), '')
    .replace(new RegExp(`<${tag} .+?>`, 'g'), '')
    .replace(new RegExp(`</${tag}>`, 'g'), '');

export const parseTag = (tagExp: string, parser: any) => (str: string) => str.replace(new RegExp(tagExp, 'g'), parser);

export function decodeEntities(encodedString: string): string {
  const translate: { [index: string]: string } = {
    nbsp: " ",
    amp : "&",
    quot: "\"",
    lt  : "<",
    gt  : ">"
  };
  return encodedString
    .replace(/&(nbsp|amp|quot|lt|gt);/g, (match, entity) => translate[entity])
    .replace(/&#(\d+);/gi, (match, numStr) => String.fromCharCode(parseInt(numStr, 10)))
    .replace(/&#x([\dABCDEFabcdef]+);/gi, (match, numStr) => String.fromCharCode(parseInt(numStr, 16)));
}

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
export const onRules = (text: string, rulesDescription: string) => {
  const compiler = new ScrapeRulesCompiler();
  compiler.compile(rulesDescription);
  return compiler.parse(text);
};
