export default async function(str: string, to = 'zh-cn', cache: any) {
  const translate = require('translate-google');
  const res = await require('./cached')(str, cache,
    async () => await translate(str, { to })
  );
  return res.toString();
}
