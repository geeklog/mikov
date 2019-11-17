import cached from '../cached';
import {sleep} from '../time';

const run = fn => fn();

(async () => {
  const key = 'a_random_number';
  let a;
  a = await cached( key, {type: 'memory'}, () => ('www.google.com' + Math.random()));
  console.log(a);

  a = await cached( key, {type: 'memory'}, () => ('www.google.com' + Math.random()));
  console.log(a);
});

(async () => {
  for (let i = 0; i < 2; i++) {
    const url = 'https://www.test.com';
    const a = await cached(
      url,
      {type: 'file', path: 'tmp/cache/{urlparts,urlencode}'},
      () => ('www.test.com' + Math.random())
    );
    console.log(a);
  }
});

(async () => {
  const url = 'https://www.test.com';
  let a;

  a = await cached(url, {type: 'memory', expire: 2000}, () => ('www.test.com' + Math.random()));
  console.log(a);

  await sleep(1000);

  // this should within cached
  a = await cached(url, {type: 'memory', expire: 2000}, () => ('www.test.com' + Math.random()));
  console.log(a);

  await sleep(2000);

  // this should expired
  a = await cached(url, {type: 'memory', expire: 2000}, () => ('www.test.com' + Math.random()));
  console.log(a);
});

run(async () => {
  const url = 'https://www.test.com';
  let a;

  a = await cached(url, {type: 'file', expire: 2000, path: './cache/{hash}'}, () => ('www.test.com' + Math.random()));
  console.log(a);

  await sleep(1000);

  // this should within cached
  a = await cached(url, {type: 'file', expire: 2000, path: './cache/{hash}'}, () => ('www.test.com' + Math.random()));
  console.log(a);

  await sleep(2000);

  // this should expired
  a = await cached(url, {type: 'file', expire: 2000, path: './cache/{hash}'}, () => ('www.test.com' + Math.random()));
  console.log(a);
});
