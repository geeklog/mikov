"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Concurrent {
    constructor(limit, options) {
        this.success = 0;
        this.fail = 0;
        this.total = 0;
        this.exeQueue = [];
        this.runningCount = 0;
        this.limit = 0;
        this.halt = false;
        this.supressError = false;
        this.onErrorOccur = options && options.onErrorOccur || 'skip';
        this.limit = limit;
    }
    go(fn) {
        this.total++;
        this.exeQueue.push(fn);
        this.next();
    }
    one(callback) {
        this.onOneDone = callback;
    }
    done(callback) {
        this.onAllDone = callback;
    }
    error(callback) {
        this.onError = callback;
    }
    next() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.halt) {
                return;
            }
            if (this.runningCount > this.limit) {
                return;
            }
            while (this.runningCount < this.limit) {
                const fn = this.exeQueue.shift();
                if (!fn) {
                    break;
                }
                this.call(fn);
            }
        });
    }
    call(fn) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.halt) {
                return;
            }
            this.runningCount++;
            try {
                const r = yield fn();
                this.success++;
                this.onOneDone && this.onOneDone(r, this.success, this.fail, this.total);
            }
            catch (error) {
                this.fail++;
                if (this.onError) {
                    this.onError(error, this.success, this.fail, this.total);
                }
                else if (!this.supressError) {
                    console.error(`Unhandle Error:`, error);
                }
                if (this.onErrorOccur === 'break') {
                    this.halt = true;
                    return;
                }
            }
            this.runningCount--;
            if (this.halt) {
                return;
            }
            if (this.exeQueue.length === 0) {
                this.onAllDone && this.onAllDone(this.success, this.fail, this.total);
            }
            else {
                this.next();
            }
        });
    }
}
exports.Concurrent = Concurrent;
function concurrent(limit, options) {
    return new Concurrent(limit, options);
}
exports.concurrent = concurrent;
