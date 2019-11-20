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
const cached_1 = __importDefault(require("../cached"));
const time_1 = require("../time");
const chai_1 = require("chai");
describe('cached', () => {
    it('memory cache', () => __awaiter(this, void 0, void 0, function* () {
        const key = 'a_random_number';
        const a = yield cached_1.default(key, { type: 'memory' }, () => ('www.google.com' + Math.random()));
        const b = yield cached_1.default(key, { type: 'memory' }, () => ('www.google.com' + Math.random()));
        chai_1.expect(a).equal(b);
    }));
    it('memory cache: should use cache', () => __awaiter(this, void 0, void 0, function* () {
        const url = 'https://www.test.com';
        const a = yield cached_1.default(url, { type: 'memory', expire: 2000 }, () => ('www.test.com' + Math.random()));
        yield time_1.sleep(1000);
        const b = yield cached_1.default(url, { type: 'memory', expire: 2000 }, () => ('www.test.com' + Math.random()));
        chai_1.expect(a).equal(b);
    }));
    it('memory cache: should expired', () => __awaiter(this, void 0, void 0, function* () {
        const url = 'https://www.test.com';
        const a = yield cached_1.default(url, { type: 'memory', expire: 2000 }, () => ('www.test.com' + Math.random()));
        yield time_1.sleep(2000);
        const b = yield cached_1.default(url, { type: 'memory', expire: 2000 }, () => ('www.test.com' + Math.random()));
        chai_1.expect(a).not.equal(b);
    }));
    it('file cache', () => __awaiter(this, void 0, void 0, function* () {
        const a = yield cached_1.default('https://www.test.com', { type: 'file', path: 'tmp/cache/{urlparts,urlencode}' }, () => ('www.test.com' + Math.random()));
        const b = yield cached_1.default('https://www.test.com', { type: 'file', path: 'tmp/cache/{urlparts,urlencode}' }, () => ('www.test.com' + Math.random()));
        chai_1.expect(a).equal(b);
    }));
    it('file cache: should use cache', () => __awaiter(this, void 0, void 0, function* () {
        const url = 'https://www.test.com';
        const a = yield cached_1.default(url, { type: 'file', expire: 2000, path: './.cache/{hash}' }, () => ('www.test.com' + Math.random()));
        yield time_1.sleep(1000);
        const b = yield cached_1.default(url, { type: 'file', expire: 2000, path: './.cache/{hash}' }, () => ('www.test.com' + Math.random()));
        chai_1.expect(a).equal(b);
    }));
    it('file cache: should expired', () => __awaiter(this, void 0, void 0, function* () {
        const url = 'https://www.test.com';
        const a = yield cached_1.default(url, { type: 'file', expire: 2000, path: './.cache/{hash}' }, () => ('www.test.com' + Math.random()));
        yield time_1.sleep(2000);
        const b = yield cached_1.default(url, { type: 'file', expire: 2000, path: './.cache/{hash}' }, () => ('www.test.com' + Math.random()));
        chai_1.expect(a).equal(b);
    }));
});
