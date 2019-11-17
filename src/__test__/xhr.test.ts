import { parseOptions, parseSavePath } from '../xhr';


// console.log(parseOptions({
//   url:
//     'https://shagunjhaver.com/files/research/jhaver-2019-transparency.pdf',
//   httpsProxy: 'http://127.0.0.1:7890',
//   savePath: './articles',
//   cache: { type: 'file', path: '../.cache' }
// }));

// console.log(parseOptions({
//   url:
//     'https://github.com/apple/swift/blob/master/docs/DifferentiableProgramming.md',
//   httpsProxy: 'http://127.0.0.1:7890',
//   savePath: './articles',
//   cache: { type: 'file', path: '../.cache' }
// }));

console.log(parseSavePath(
  'https://shagunjhaver.com/files/research/jhaver-2019-transparency.pdf',
  './articles'
))

console.log(parseSavePath(
  'https://github.com/apple/swift/blob/master/docs/DifferentiableProgramming.md',
  './articles',
  '.md'
))