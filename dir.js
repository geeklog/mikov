/**
 * 所有关于目录的函数
 */

/**
 * flattern dir
 * 把dir目录下的所有文件都移动到上一层
 * ls .
 *   dir/
 * ls ./dir
 *   a.txt b.txt c.txt
 *
 * flattern ./dir
 *
 * ls .
 *   a.txt b.txt c.txt
 * ls ./dir
 *   nothing is in here
 */
export function flatten() {
  const fs = require('fs-extra');
  const ret = (code) => { console.log(code); process.exit(code); }

  var dir = './'+process.argv[2];

  if (!dir) {
    ret('required');
  }

  for (var file of fs.readdirSync(dir)) {
    var filePath = dir+'/'+file;
    var upperFilePath = '../'+dir+'/'+file;
    console.log('move', filePath, '->', upperFilePath);
    fs.moveSync(filePath, upperFilePath);
  }

}


