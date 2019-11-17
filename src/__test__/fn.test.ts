import { dissectFunction } from '../fn';

function aFunction(param1: string, param2: number) {
  return param1 + param2;
}

const info = dissectFunction(aFunction);
console.log(info);
