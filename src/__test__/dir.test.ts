import {cwd, applyFilePathPattern} from '../dir';
import { expect } from 'chai';

describe('applyFilePathPattern', () => {
  it('cwd', async () => {
    expect(cwd('abc'), 'cwd');
  });

  it('start with tmp', () => {
    expect(applyFilePathPattern('https://www.xxx.com/a/b/c/d.png', 'tmp/{urlparts,urlencode}'), 'tmp');
  });

  it('start with ./cache', () => {
    expect(applyFilePathPattern('https://www.xxx.com/a/b/c/d.png', './cache/{urlparts,urlencode}')).equal('b');
    expect(applyFilePathPattern('https://www.xxx.com/a/b/c/d.png', './cache/foo/bar/{urlparts,urlencode}')).equal('b');
    expect(applyFilePathPattern('https://www.xxx.com/a/b/c/d.png', 'assets/{random}.png')).equal('b');
    expect(applyFilePathPattern('https://www.xxx.com/a/b/c/d', 'assets/{nohttp,-,.md}')).equal('b');
    expect(applyFilePathPattern('https://www.xxx.com/a/b/c/d.png', 'assets/{nohttp,-,.md}')).equal('b');
    expect(applyFilePathPattern('https://www.xxx.com/a/b/c/d.html', 'assets/{nohttp,-,.md}')).equal('b');
    expect(applyFilePathPattern('https://www.xxx.com/a/b/c/d.md', 'assets/{nohttp,-,.md}')).equal('b');
    expect(applyFilePathPattern('https://www.bbc.com/news/technology-50390589', 'articles/{nohttp,-,.md}')).equal('b');
  });

});
