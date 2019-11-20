"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fn_1 = require("./fn");
const time_1 = require("./time");
const debug_1 = __importDefault(require("./debug"));
function retry(fn, ctrl) {
    return () => __awaiter(this, void 0, void 0, function* () {
        if (!ctrl) {
            return yield fn();
        }
        const errors = [];
        const { times, interval } = ctrl;
        const getInterval = fn_1.getter(interval);
        for (let i = 0; i < times + 1; i++) {
            debug_1.default(`[retry] try: ${i + 1}`);
            try {
                return yield fn();
            }
            catch (err) {
                debug_1.default.error('[retry] error:', err);
                errors.push(err);
                const ival = getInterval() || 0;
                if (ival > 0) {
                    yield time_1.sleep(ival);
                }
            }
        }
        throw errors[errors.length - 1];
    });
}
exports.default = retry;
