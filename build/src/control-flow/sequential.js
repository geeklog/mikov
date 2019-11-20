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
class Sequential {
    constructor() {
        this.exeQueue = [];
    }
    go(fn) {
        this.exeQueue.push(fn);
        this._next();
    }
    _next() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.fn) {
                return;
            }
            while (this.fn = this.exeQueue.shift()) {
                yield this.fn();
            }
            this.fn = undefined;
        });
    }
}
exports.default = Sequential;
