export declare const removeTag: (tag: string) => (str: string) => string;
export declare const parseTag: (tagExp: string, parser: any) => (str: string) => string;
export declare function decodeEntities(encodedString: string): string;
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
export declare const onRules: (text: string, rulesDescription: string) => any;
