/**
 * A full-fledge http/https/p2p downloader and requester
 *
 * HTML:
 * - Encoding
 *
 * File download:
 * - Downloading status
 * - Download file with multiple connection to speed up.
 * - Download files via p2p networks.
 * - Log transmit speed
 * - Resume download
 */
export declare function parseSavePath(url: string, savePath: string, ext?: string): string;
export declare function parseOptions(url: string, options: any): any[];
/**
 * options, controls = {
 *   url: 'https://www.google.com',
 *   httpProxy: 'http://127.0.0.1:7890',
 *   httpsProxy: 'http://127.0.0.1:7890',
 *   retry: {
 *     times: 1,
 *     interval: 1000,
 *     interval: () => 1000 + Math.random() * 1000
 *   },
 *   cache: 'cache',
 *   cache: './cache/{urlparts,urlencode,random}',
 *   cache: {
 *     type: 'memory',
 *     type: 'file',
 *     path: 'tmp/{urlparts,urlencode}',
 *     path: './cache/{hash}
 *     expire: 6000
 *   }
 * }
 */
export declare function fetch(url: string, optionsEx: {
    retry?: {
        times: number;
    };
    cache?: string | {
        type?: 'memory' | 'file';
        path?: string;
        expire?: number;
    };
    parse?: string;
    parseRules?: string;
}): Promise<any>;
export declare function saveRawFile(url: string, optionsEx: any): Promise<void>;
export declare function saveMarkdown(url: string, optionsEx: any): Promise<any>;
