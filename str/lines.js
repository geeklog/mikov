

exports.trimLines = function trimLines(str) {
  return str.split('\n').map(s => s.trim()).join('\n');
}

exports.removeEmptyLines = function removeEmptyLines(str) {
  return str.split('\n').filter(line => !!line).join('\n');
}
