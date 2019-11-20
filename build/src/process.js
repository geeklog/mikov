"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fs = __importStar(require("fs"));
const os_1 = require("os");
const path_1 = require("path");
exports.exit = (message, code) => {
    console.log(message);
    process.exit(code || 0);
};
const defaultExecOptions = {
    pidConfigPath: '.pids.json',
    replace: false,
    background: false,
    kill: false
};
function exec(argv, execArgvs, { pidConfigPath, background, replace, kill } = defaultExecOptions) {
    let cfg;
    let execPIDKey = '';
    let lastPid;
    pidConfigPath = path_1.join(os_1.homedir(), pidConfigPath || '.pids.json');
    if (kill || replace) {
        execPIDKey = [path_1.join(process.cwd(), argv), ...execArgvs].join(' ');
        cfg = fs.existsSync(pidConfigPath)
            ? JSON.parse(fs.readFileSync(pidConfigPath).toString())
            : {};
        lastPid = cfg[execPIDKey];
    }
    if (replace || kill) {
        if (lastPid) {
            try {
                process.kill(lastPid);
            }
            catch (err) {
                if (err.code === 'ESRCH') {
                    delete cfg[execPIDKey];
                }
            }
        }
        if (kill) {
            fs.writeFileSync(pidConfigPath, JSON.stringify(cfg));
            return;
        }
    }
    const child = child_process_1.spawn(argv, execArgvs, Object.assign({}, background && {
        detached: true,
        stdio: 'ignore'
    }));
    if (background) {
        child.unref();
    }
    if (replace) {
        cfg[execPIDKey] = child.pid;
        fs.writeFileSync(pidConfigPath, JSON.stringify(cfg));
    }
}
exports.exec = exec;
