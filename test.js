const { removeEmptyLines } = require('./str/lines');

const a = `aaa
bbb

ccc`

console.log(removeEmptyLines(a));