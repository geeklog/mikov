"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(handleFunction) {
    process.stdin.on('error', (err) => {
        if (err.code === "EPIPE") {
            console.log('error: stdin broken pipe');
            process.exit(0);
        }
    });
    process.stdout.on('error', err => {
        if (err.code === "EPIPE") {
            console.log('error: stdout broken pipe');
            process.exit(0);
        }
    });
    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => {
        data += chunk;
    });
    process.stdin.on('end', () => {
        data = handleFunction(data);
        process.stdout.write(data);
        data = '';
    });
    process.stdin.resume();
}
exports.default = default_1;
