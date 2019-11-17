import { spawn } from 'child_process';
import * as fs from 'fs';
import { homedir } from 'os';
import { join } from 'path';

export const exit = (message?: string, code?: number) => {
  console.log(message);
  process.exit(code || 0);
};

interface ExecOptions {
  pidConfigPath?: string;
  kill?: boolean;
  background?: boolean;
  replace?: boolean;
}

const defaultExecOptions: ExecOptions = {
  pidConfigPath : '.pids.json',
  replace: false,
  background: false,
  kill: false
};

export function exec(
  argv: string,
  execArgvs: string[],
  {
    pidConfigPath,
    background,
    replace,
    kill
  }: ExecOptions = defaultExecOptions
) {
  let cfg;
  let execPIDKey = '';
  let lastPid;

  pidConfigPath = join(homedir(), pidConfigPath || '.pids.json');

  if (kill || replace) {
    execPIDKey = [join(process.cwd(), argv), ...execArgvs].join(' ');
    cfg = fs.existsSync(pidConfigPath)
      ? JSON.parse(fs.readFileSync(pidConfigPath).toString())
      : {};
    lastPid = cfg[execPIDKey];
  }

  if (replace || kill) {
    if (lastPid) {
      try {
        process.kill(lastPid);
      } catch (err) {
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

  const child = spawn(argv, execArgvs, {
    ...background && {
      detached: true,
      stdio: 'ignore'
    }
  });

  if (background) {
    child.unref();
  }

  if (replace) {
    cfg[execPIDKey] = child.pid;
    fs.writeFileSync(pidConfigPath, JSON.stringify(cfg));
  }

}
