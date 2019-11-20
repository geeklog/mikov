export declare const exit: (message?: string | undefined, code?: number | undefined) => void;
interface ExecOptions {
    pidConfigPath?: string;
    kill?: boolean;
    background?: boolean;
    replace?: boolean;
}
export declare function exec(argv: string, execArgvs: string[], { pidConfigPath, background, replace, kill }?: ExecOptions): void;
export {};
