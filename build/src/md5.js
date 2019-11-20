"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
function default_1(s) {
    return crypto_1.createHash('md5').update(s).digest("hex");
}
exports.default = default_1;
