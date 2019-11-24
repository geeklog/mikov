import { join } from 'path';
import { getter } from './fn';
import { parseTimeDesc } from './date';

/**
 * cached
 *
 * @param {*} key the key for store item
 * @param {*} rules rules that apply to cache
 *  {
 *    type: memory | file,
 *    path:
 *      'tmp/{t}' => os.tmp() + {t}
 *      './{t}' => process.cwd() + {t}
 *      {urlparts}: 'https://www.test.com/a/b/c' => 'https/www.test.com/a/b/c'
 *      {urlencode}: 'https://www.test.com/==' => 'https/www.test.com/%3D%3D'
 *  }
 * @param {*} content the content provider, can be the cotent itself or a getter function
 */
async function cached<T>(
  this: any,
  key: string,
  rules: {
    expire?: number | string,
    type: 'memory' | 'file',
    path?: string
  },
  content: T | (() => T)
) {

  const get = getter(content);

  if (!rules) {
    return await get();
  }

  if (!rules.type) {
    throw new Error(`No type: ${JSON.stringify(rules)}`);
  }

  if (rules.type === 'file' && !rules.path) {
    throw new Error(`No path: ${JSON.stringify(rules)}`);
  }

  if (rules.type === 'file') {
    if (rules.path.indexOf('{') === -1 && rules.path.indexOf('}') === -1) {
      rules.path = join(rules.path, '{urlparts,urlencode}');
    }
  }

  rules.type = rules.type || 'file';

  if (rules.type === 'memory') {
    this.__memoryCache = this.__memoryCache || {};
    this.__memoryCacheExpirations = this.__memoryCacheExpirations || {};
    const notExpired = !(
      rules.expire &&
      this.__memoryCacheExpirations[key] &&
      Date.now() - this.__memoryCacheExpirations[key] >= parseTimeDesc('' + rules.expire)
    );
    if (this.__memoryCache[key] && notExpired) {
      return this.__memoryCache[key];
    } else {
      const data = await get();
      this.__memoryCache[key] = data;
      this.__memoryCacheExpirations[key] = Date.now();
      return data;
    }
  }

  if (rules.type === 'file') {
    const { applyFilePathPattern } = require('./dir');
    const fpath = applyFilePathPattern(key, rules.path);
    const fs = require('fs-extra');
    const p = require('path');

    let notExpired;
    const fileExisted = await fs.exists(fpath);

    if (!rules.expire) {
      notExpired = true;
    } else if (!fileExisted) {
      notExpired = false;
    } else {
      const lastModifield = (await fs.stat(fpath)).mtime.getTime();
      notExpired = Date.now() - lastModifield < parseTimeDesc('' + rules.expire);
    }

    if (fileExisted && notExpired) {
      return await fs.readFile(fpath);

    } else {
      const data: any = await get();
      await fs.mkdirp(p.dirname(fpath));
      if (!data) {
        throw new Error(`no data: ${content}`);
      }

      if (data.pipe) {
        const fw = fs.createWriteStream(fpath);
        data.pipe(fw);
        await new Promise((resolve, reject) => {
          fw.on('finish', resolve);
          fw.on('error', reject);
        });
        return await fs.readFile(fpath);

      } else {
        await fs.writeFile(fpath, data);
      }
      return data;
    }
  }

}

export default cached;
