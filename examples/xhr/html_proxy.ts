
trycatch(async () =>
  console.log(await fetch(
    'https://jhalderm.com/pub/papers/letsencrypt-ccs19.pdf',
    {
      httpsProxy: 'http://127.0.0.1:7890',
      cache: { type: 'file', path: '../.cache' },
    },
  )),
);
