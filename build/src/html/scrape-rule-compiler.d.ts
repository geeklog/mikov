declare class ScrapeRulesCompiler {
    domPaser: string;
    shouldPrettify: boolean;
    shouldRemoveEmptyLines: boolean;
    shouldParseToText: boolean;
    instructions: any[];
    currentInstruction: any;
    shouldReturnJQ: boolean;
    shouldUnescape: boolean;
    jq: any;
    constructor();
    startNextInstruction(src: string): void;
    updateInstruction(src: string): void;
    endPrevInstruction(): void;
    compile(src: string): void;
    parse(html: string): any;
}
export default ScrapeRulesCompiler;
