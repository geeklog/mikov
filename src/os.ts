export function tmpdir() {
  const os = require('os');
  if (os.platform === 'darwin') {
    if (process.env.TMPDIR) {
      return process.env.TMPDIR;
    }
  }
  return os.tmpdir();
}
