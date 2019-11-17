import retry from '../retry';
const run = fn => fn();

run(async () => {
  let i=0;
  const a = await retry(() => {
    console.log('try:' + i);
    i+=2;
    if (i<6) {
      throw new Error(i);
    }
    return i;
  }, {
    times: 3,
    interval: 1000
  })();
  console.log(a);
});

run(async () => {
  let i=0;
  const fn = retry(() => {
    console.log('try:' + i);
    i+=2;
    if (i<6) {
      throw new Error(i);
    }
    return i;
  }, {
    times: 3,
    interval: () => 1000 + Math.random() * 2000
  });
  const a = await fn();
  console.log(a);
});
