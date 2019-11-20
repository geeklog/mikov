"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs-extra"));
const p = __importStar(require("path"));
exports.writeFile = (fpath) => (fn) => __awaiter(this, void 0, void 0, function* () {
    let str = '';
    yield fn({
        write: (s) => str += (s || ''),
        writeln: (s) => str += (s || '') + '\n'
    });
    fs.writeFileSync(fpath, str);
});
exports.mkdirpSaveFile = (fpath, content) => __awaiter(this, void 0, void 0, function* () {
    const error = new Error();
    try {
        yield fs.mkdirp(p.dirname(fpath));
        if (content.pipe) {
            const fw = require('fs').createWriteStream(fpath);
            content.pipe(fw);
            yield new Promise((resolve, reject) => {
                fw.on('finish', resolve);
                fw.on('error', reject);
            });
        }
        else {
            yield fs.writeFile(fpath, content);
        }
    }
    catch (err) {
        error.message = `mkdirpSaveFile ${fpath} - ${err.message}`;
        throw error;
    }
});
