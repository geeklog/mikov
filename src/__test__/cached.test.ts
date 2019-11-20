import cached from '../cached';
import {sleep} from '../time';
import { expect } from 'chai';

describe('cached', () => {
  it('memory cache', async () => {
    const key = 'a_random_number';
    const a = await cached( key, {type: 'memory'}, () => ('www.google.com' + Math.random()));
    const b = await cached( key, {type: 'memory'}, () => ('www.google.com' + Math.random()));
    expect(a).equal(b);
  });

  it('memory cache: should use cache', async () => {
    const url = 'https://www.test.com';
    const a = await cached(url, {type: 'memory', expire: 2000}, () => ('www.test.com' + Math.random()));
    await sleep(1000);
    const b = await cached(url, {type: 'memory', expire: 2000}, () => ('www.test.com' + Math.random()));
    expect(a).equal(b);
  });

  it('memory cache: should expired', async () => {
    const url = 'https://www.test.com';
    const a = await cached(url, {type: 'memory', expire: 2000}, () => ('www.test.com' + Math.random()));
    await sleep(2000);
    const b = await cached(url, {type: 'memory', expire: 2000}, () => ('www.test.com' + Math.random()));
    expect(a).not.equal(b);
  });

  it('file cache', async () => {
    const a = await cached(
      'https://www.test.com',
      { type: 'file', path: 'tmp/cache/{urlparts,urlencode}' },
      () => ('www.test.com' + Math.random())
    );
    const b = await cached(
      'https://www.test.com',
      { type: 'file', path: 'tmp/cache/{urlparts,urlencode}' },
      () => ('www.test.com' + Math.random())
    );
    expect(a).equal(b);
  });

  it('file cache: should use cache', async () => {
    const url = 'https://www.test.com';
    const a = await cached(url, {type: 'file', expire: 2000, path: './.cache/{hash}'},
      () => ('www.test.com' + Math.random()));
    await sleep(1000);
    const b = await cached(url, {type: 'file', expire: 2000, path: './.cache/{hash}'},
      () => ('www.test.com' + Math.random()));
    expect(a).equal(b);
  });

  it('file cache: should expired', async () => {
    const url = 'https://www.test.com';
    const a = await cached(url, {type: 'file', expire: 2000, path: './.cache/{hash}'},
      () => ('www.test.com' + Math.random()));
    await sleep(2000);
    const b = await cached(url, {type: 'file', expire: 2000, path: './.cache/{hash}'},
      () => ('www.test.com' + Math.random()));
    expect(a).equal(b);
  });

});
