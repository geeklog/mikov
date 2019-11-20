import { AnyFunc } from './types';
declare function retry(fn: AnyFunc, ctrl: {
    times: number;
    interval: number;
}): () => Promise<any>;
export default retry;
