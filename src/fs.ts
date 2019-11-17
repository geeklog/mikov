import * as fs from 'fs-extra';
import * as p from 'path';

export const writeFile = (fpath: string) => async (fn: (fhandler: any) => Promise<any>) => {
  let str = '';
  await fn({
    write: (s: string) => str += (s || ''),
    writeln: (s: string) => str += (s || '') + '\n'
  });
  fs.writeFileSync(fpath, str);
};

export const mkdirpSaveFile = async (fpath: string, content: any) => {
  const error = new Error();
  try {
    await fs.mkdirp(p.dirname(fpath));
    if (content.pipe) {
      const fw = require('fs').createWriteStream(fpath);
      content.pipe(fw);
      await new Promise((resolve, reject) => {
        fw.on('finish', resolve);
        fw.on('error', reject);
      });
    } else {
      await fs.writeFile(fpath, content);
    }
  } catch (err) {
    error.message = `mkdirpSaveFile ${fpath} - ${err.message}`;
    throw error;
  }
};
