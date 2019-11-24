import { getter } from './fn';
import { sleep } from './time';
import debug from './debug';
import { AnyFunc } from './types';

function retry(fn: AnyFunc, options: {times: number, interval: number|(() => number)}) {
  return async () => {
    if (!options) {
      return await fn();
    }

    const errors = [];
    const { times, interval } = options;
    const getInterval = getter(interval);

    for (let i = 0; i < times + 1; i++) {
      debug(`[retry] try: ${i + 1}`);
      try {
        return await fn();
      } catch (err) {
        debug.error('[retry] error:', err);
        errors.push(err);
        const ival = getInterval() || 0;
        if (ival > 0) {
          await sleep(ival);
        }
      }
    }
    throw errors[errors.length - 1];
  };
}

export default retry;
