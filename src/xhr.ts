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

import { isString, isNumber } from 'util';
import { clone, merge } from 'lodash';
import { onRules } from './html';
import { isRawType } from './url';
import { mkdirpSaveFile } from './fs';
import * as p from 'path';
import { cwd, applyFilePathPattern } from './dir';
import cached from './cached';
import retry from './retry';
import {endsWith} from './fn/op';
import {transferAttribute} from '.';
import jqHelper from './html/jq-helper';

export function parseSavePath(url: string, savePath: string, ext= ''): string {
  if (!savePath) {
    return '';
  }
  if (endsWith(/\.\w+$/)(savePath)) {
    return cwd(savePath);
  } else {
    const pattern = p.join(savePath, `{nohttp,-${ext ? (',' + ext) : ext}}`);
    return applyFilePathPattern(url, pattern);
  }
}

export function parseOptions(url: string, options: any) {
  let a;
  a = isString(url) ? {url} : url;
  const b = options || {};
  const all = merge({}, a, b);
  url = all.url;

  if (!url || !url.startsWith || url.startsWith('/')) {
    throw new Error(`URL malform: ${JSON.stringify(url)} ${JSON.stringify(options)}`);
  }

  all.url = url.startsWith('http') ? url : `http://${url}`;
  all.method = all.method || 'get';

  const ctrls = {};

  transferAttribute(all, ctrls, 'retry', (rty: any) => {
    if (isNumber(rty)) {
      return { times: rty, interval: 0 };
    } else if (!rty) {
      return { times: 0, interval: 0 };
    }
    return rty;
  });
  transferAttribute(all, ctrls, 'savePath');
  transferAttribute(all, ctrls, 'cache', (cache: any) => {
    if (isString(cache)) {
      return { type: 'file', path: cache };
    } else {
      return cache;
    }
  });
  transferAttribute(all, ctrls, 'parse');
  transferAttribute(all, ctrls, 'parseRule');
  transferAttribute(all, ctrls, 'parseRules');

  return [all, ctrls];
}

async function xhr(options: any, ctrls: any) {
  if (ctrls.parseRule) {
    throw new Error('Do you mean: parseRules ?');
  }

  const resData = await cached(options.url, ctrls.cache,
    retry(async () => {
      try {
        const reqOptions = clone(options);

        if (isRawType(reqOptions.url)) {
          reqOptions.responseType = 'stream';
        }

        if (options.httpsProxy) {
          const HttpsProxyAgent = require('https-proxy-agent');
          reqOptions.httpsAgent = new HttpsProxyAgent(reqOptions.httpsProxy);
          delete reqOptions.httpsProxy;
        }

        const res = await require('axios')(reqOptions);

        if (res.status === 200) {
          return res.data;
        }

        throw new Error(`Server response with code: ${res.status}`);

      } catch (err) {
        throw new Error(`fetch fail: ${err.message} ${JSON.stringify(options)}`);
      }

    }, {
      times: ctrls.retry.times,
      interval: ctrls.retry.interval
    })
  );

  if (options.isRawType || !(ctrls.parseRules || ctrls.parse)) {
    return resData;
  }

  const $ = onRules(resData, ctrls.parseRules || `use ${ctrls.parse}\n$`);
  if (isString($)) {
    return $;
  }

  jqHelper($);

  return $;
}

async function _saveRawFile(options: any, ctrls: any) {
  if (!ctrls.savePath) {
    throw new Error('No save path');
  }
  const res = await xhr(options, ctrls);
  const fpath = parseSavePath(options.url, ctrls.savePath);
  await mkdirpSaveFile(fpath, res);
  return ctrls.savePath;
}

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
export async function fetch(
  url: string,
  optionsEx: {
    retry?: {
      times: number,
    },
    cache?: string | {
      type?: 'memory' | 'file',
      path?: string,
      expire?: number
    },
    parse?: string,
    parseRules?: string
  }
) {
  const [options, ctrls] = parseOptions(url, optionsEx);
  return await xhr(options, ctrls);
}

export async function saveRawFile(url: string, optionsEx: any) {
  const [options, ctrls] = parseOptions(url, optionsEx);

  await _saveRawFile(options, ctrls);
}

export async function saveMarkdown(url: string, optionsEx: any) {
  const [options, ctrls] = parseOptions(url, optionsEx);

  if (isRawType(options.url)) {
    return await _saveRawFile(options, ctrls);
  }

  const savePath = ctrls.savePath;
  ctrls.parse = 'cheerio';

  if (!savePath) {
    throw new Error('No save path');
  }

  const $ = await xhr(options, ctrls);
  $.cleanup();
  const md = $.markdown();

  const fpath = parseSavePath(options.url, ctrls.savePath, '.md');
  await mkdirpSaveFile(fpath, md);

  return fpath;
}
