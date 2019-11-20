"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
function default_1(strategy = 'fifo') {
    const works = [];
    const idles = [];
    if (strategy !== 'fifo' && strategy !== 'filo') {
        throw new Error(strategy);
    }
    const workers = {
        birth(o) {
            const idleIndex = idles.indexOf(o);
            if (idleIndex >= 0) {
                throw new Error('Already in idle queue');
            }
            const workingIndex = works.indexOf(o);
            if (workingIndex >= 0) {
                throw new Error('Already in working queue');
            }
            idles.push(o);
        },
        work(o) {
            const idleIndex = idles.indexOf(o);
            if (idleIndex >= 0) {
                idles.splice(idleIndex, 1);
            }
            const workingIndex = works.indexOf(o);
            if (workingIndex < 0) {
                works.push(o);
            }
        },
        retire(o) {
            const workingIndex = works.indexOf(o);
            if (workingIndex >= 0) {
                works.splice(workingIndex, 1);
            }
            const idleIndex = idles.indexOf(o);
            if (idleIndex < 0) {
                if (strategy === 'fifo') {
                    idles.push(o);
                }
                else if (strategy === 'filo') {
                    idles.unshift(o);
                }
            }
        },
        get workers() {
            return lodash_1.clone(works);
        },
        get idlers() {
            return lodash_1.clone(idles);
        },
        get: () => {
            const o = idles.pop();
            if (!o) {
                return null;
            }
            workers.work(o);
            return o;
        },
        get nWorkers() {
            return works.length;
        },
        get nIdles() {
            return idles.length;
        },
    };
    return workers;
}
exports.default = default_1;
