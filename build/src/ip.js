"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isLocalIP(ip) {
    if (ip === '127.0.0.1' || ip === '0.0.0.0' || ip.toLowerCase() === 'localhost') {
        return true;
    }
    const classA = [[10, 0, 0, 0], [10, 255, 255, 255]]; // 10.0.0.0 - 10.255.255.255: (class A)
    const classB = [[172, 16, 0, 0], [172, 31, 255, 255]]; // 172.16.0.0 - 172.31.255.255: (class B)
    const classC = [[192, 168, 0, 0], [192, 168, 255, 255]]; // 192.168.0.0 - 192.168.255.255: (class C)
    const [p0, p1, p2, p3] = ip.split('.').map(Number);
    if (classA[0][0] <= p0 && p0 <= classA[1][0]
        && classA[0][1] <= p1 && p1 <= classA[1][1]
        && classA[0][2] <= p2 && p2 <= classA[1][2]
        && classA[0][3] <= p3 && p3 <= classA[1][3]) {
        return true;
    }
    if (classB[0][0] <= p0 && p0 <= classB[1][0]
        && classB[0][1] <= p1 && p1 <= classB[1][1]
        && classB[0][2] <= p2 && p2 <= classB[1][2]
        && classB[0][3] <= p3 && p3 <= classB[1][3]) {
        return true;
    }
    if (classC[0][0] <= p0 && p0 <= classC[1][0]
        && classC[0][1] <= p1 && p1 <= classC[1][1]
        && classC[0][2] <= p2 && p2 <= classC[1][2]
        && classC[0][3] <= p3 && p3 <= classC[1][3]) {
        return true;
    }
    return false;
}
exports.isLocalIP = isLocalIP;
