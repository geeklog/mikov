const {saveRawFile} = require('../mikov/xhr');
const {trycatch} = require('../mikov');

trycatch(async () =>
  await saveRawFile({
    url: 'https://jhalderm.com/pub/papers/letsencrypt-ccs19.pdf',
    savePath: 'pdfs/',
    httpsProxy: 'http://127.0.0.1:7890',
    cache: { type: 'file', path: '../.cache' }
  })
);
