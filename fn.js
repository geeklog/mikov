// empty function

export function compose(...fns) {
  return arg => {
    fns.forEach(fn => { arg = fn(arg); });
    return arg;
  };
} 