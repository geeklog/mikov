import {cwd, applyFilePathPattern} from '../dir';
const run = fn => fn();

(async () => {
  console.log(cwd('abc'));
});

(async () => {
  console.log(applyFilePathPattern(
    'https://www.xxx.com/a/b/c/d.png',
    'tmp/{urlparts,urlencode}'
  ));
  console.log(applyFilePathPattern(
    'https://www.xxx.com/a/b/c/d.png',
    './cache/{urlparts,urlencode}'
  ));
  console.log(applyFilePathPattern(
    'https://www.xxx.com/a/b/c/d.png',
    './cache/foo/bar/{urlparts,urlencode}'
  ));
});

(async () => {
  console.log(applyFilePathPattern(
    'https://www.xxx.com/a/b/c/d.png',
    'assets/{random}.png'
  ));
});

(async () => {
  console.log(applyFilePathPattern(
    'https://www.xxx.com/a/b/c/d',
    'assets/{nohttp,-,.md}'
  ));
  console.log(applyFilePathPattern(
    'https://www.xxx.com/a/b/c/d.png',
    'assets/{nohttp,-,.md}'
  ));
  console.log(applyFilePathPattern(
    'https://www.xxx.com/a/b/c/d.html',
    'assets/{nohttp,-,.md}'
  ));
  console.log(applyFilePathPattern(
    'https://www.xxx.com/a/b/c/d.md',
    'assets/{nohttp,-,.md}'
  ));
});

run(async () => {
  console.log(applyFilePathPattern(
    'https://www.bbc.com/news/technology-50390589',
    'articles/{nohttp,-,.md}'
  ));
});