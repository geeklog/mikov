import { replaceLast } from "./str";
import { replaceFirst } from './str/index';

export function complete(url: string) {
  if (!url.startsWith('http')) {
    return `http://${url}`;
  }
  return url;
}

export function prefix(domain: string, url: string) {
  if (url.startsWith('http')) {
    return url;
  }
  if (domain.endsWith('/')) {
    domain = domain.substring(0, domain.length - 1);
  }
  return [domain, url].join('/');
}

export function isRawType(url: string) {
  const { endsWith } = require('./fn/op');
  url = url.split('?')[0];
  const rawTypes = ['.png', '.gif', '.jpg', '.jpeg', '.pdf', '.bin'];
  return endsWith(rawTypes)(url);
}

export const urlJoin = (...args) => args.map(p => replaceLast(replaceFirst(p, '/', ''), '/', '')).join('/');
