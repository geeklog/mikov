"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug = (...args) => {
    process.env.DEBUG && console.log(...args);
};
debug.info = (...args) => {
    process.env.DEBUG && console.log(...args);
};
debug.error = (...args) => {
    process.env.DEBUG && console.error(...args);
};
exports.default = debug;
