/// <reference types="cheerio" />
interface JQHolder extends CheerioStatic {
    __DOM_PARSER__?: string;
}
declare class JQ {
    type: string;
    cheerio: any;
    $: JQHolder;
    constructor(type: string | undefined, html: string);
    load(html: string): JQHolder;
    remove(pattern: string): void;
    select(pattern: string): string;
    removeComments(): void;
    pretty(): any;
    html(): string;
    text(): string;
}
export default JQ;
