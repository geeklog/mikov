import { sequential } from '..';
import { sleep } from '../time';

const q = sequential();

q.go(async () => {
  await sleep(1000);
  console.log('1');
});

q.go(async () => {
  await sleep(1000);
  console.log('2');
});

q.go(async () => {
  await sleep(1000);
  console.log('3');
});
