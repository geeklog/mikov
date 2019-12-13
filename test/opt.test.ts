// import options from '../src/opt';
// import { assert } from 'chai';
// import { startsWith } from '../src/fn/op';
// import { format } from '../src/date';

// describe('opt', () => {

//   it('parse opt', async () => {

//     options({
//       req: {
//         url: {
//           format: String,
//           validate: (url) => url && !url.startsWith('/'),
//           onValidateFail: (url, options) => `URL malform: ${JSON.stringify(url)} ${JSON.stringify(options)}`
//         }
//       },
//       ctrls: {
//         cache: {
//           type: {
//             format: String,
//           },
//           path: {
//             format: String
//           }
//         },
//         retry: {
//           times: {
//             format: Number,
//             default: 1
//           },
//           interval: {
//             format: Number,
//             default: 0
//           }
//         }
//       }
//     }, {
//       alias: { 0 : 'url' }
//     })  .typeAlias('string', '.url')
//         .parse('https://www.google.com', cache: 'path');

//     assert.deepEqual(a as any, {k2: `v2`});
//     assert.deepEqual(b as any, {k1: '(v1)'});
//   });

// });
