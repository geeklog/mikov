const debug = (...args: any[]) => {
  process.env.DEBUG && console.log(...args);
};

debug.info = (...args: any[]) => {
  process.env.DEBUG && console.log(...args);
};

debug.error = (...args: any) => {
  process.env.DEBUG && console.error(...args);
};

export default debug;
