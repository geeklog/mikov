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
declare function cached<T>(this: any, key: string, rules: {
    expire?: number;
    type: 'memory' | 'file';
    path?: string;
}, content: T | (() => T)): Promise<any>;
export default cached;
