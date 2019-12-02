import {cwd, applyFilePathPattern} from '../src/dir';
import { expect } from 'chai';
import * as path from 'path';

describe('applyFilePathPattern', () => {
  it('cwd', async () => {
    expect(cwd('abc'), 'cwd');
  });

  it('start with tmp', () => {
    expect(applyFilePathPattern('https://www.xxx.com/a/b/c/d.png', 'tmp/{urlparts,urlencode}'), 'tmp');
  });

  it('start with ./cache', () => {
    expect(applyFilePathPattern('https://www.xxx.com/a/b/c/d.png', './cache/{urlparts,urlencode}'))
      .equal(path.resolve(process.cwd(), 'cache/https/www.xxx.com/a/b/c/d.png'));

    expect(applyFilePathPattern('https://www.xxx.com/a/b/c/d.png', './cache/foo/bar/{urlparts,urlencode}'))
      .equal(path.resolve(process.cwd(), 'cache/foo/bar/https/www.xxx.com/a/b/c/d.png'));

    expect(applyFilePathPattern('https://www.xxx.com/a/b/c/d', 'assets/{nohttp,-,.md}'))
      .equal('assets/www.xxx.com-a-b-c-d.md');
  });
});
