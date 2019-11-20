"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function complete(url) {
    if (!url.startsWith('http')) {
        return `http://${url}`;
    }
    return url;
}
exports.complete = complete;
function prefix(domain, url) {
    if (url.startsWith('http')) {
        return url;
    }
    if (domain.endsWith('/')) {
        domain = domain.substring(0, domain.length - 1);
    }
    return [domain, url].join('/');
}
exports.prefix = prefix;
function isRawType(url) {
    const { endsWith } = require('./fn/op');
    url = url.split('?')[0];
    const rawTypes = ['.png', '.gif', '.jpg', '.jpeg', '.pdf', '.bin'];
    return endsWith(rawTypes)(url);
}
exports.isRawType = isRawType;
