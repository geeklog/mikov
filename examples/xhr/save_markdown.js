const {saveMarkdown} = require('../mikov/xhr');
const forever = { type: 'file', path: '../.cache' };
const httpsProxy = 'http://127.0.0.1:7890';

(async () => {
  await saveMarkdown({
    url: 'https://www.redhat.com/en/blog/red-hat-introduces-open-source-project-quay-container-registry?sc_cid=701f2000000tyBjAAI',
    httpsProxy,
    savePath: './articles',
    cache: forever
  })
});

(async () => {
  await saveMarkdown({
    url: 'https://www.bbc.com/news/technology-50390589',
    httpsProxy,
    savePath: './articles',
    cache: forever
  })
})();
