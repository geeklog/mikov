import walk from './dir/walk';
import fs from 'fs-extra';
import { oneOf } from './fn/op';

/**
 * const { x } = require('./abc');
 * ~~>
 * import { x } from './abc'
 */
function convertRequireToES6Import(s: string) {
  if (!s.match(/^const.+=.+require.+$/)) {
    return s;
  }
  let [left, right] = s.split('=');

  left = left.replace('const ', 'import ');
  left = left.trimRight();
  right = right.replace('require(', 'from ');
  right = right.replace(');', ';');

  return [left, right].join('');
}

/**
 * module.exports = m;
 * ~~>
 * export default m;
 */
function convertES5ModuleExportsToES6ExportDefault(s: string) {
  if (s.indexOf('module.exports') >= 0) {
    return s.replace('module.exports =', 'export default');
  }
  return s;
}

/**
 * exports.a = function () {...
 * ~~>
 * export function a() {...
 *
 * exports.a = function a(...) {
 * ~~>
 * export function a(...) {
 */
function convertES5ExportsFunctionToES6ExportFunction(s: string) {
  if (s.indexOf('exports.') === -1 || s.indexOf('function') === -1) {
    return s;
  }
  let [left, right] = s.split('=');

  left = left.replace('exports.', 'export function ');
  left = left.trimRight();
  const [r1, r2] = right.split('(');
  right = [r2].join(',');
  return [left, r2].join('(');
}

/**
 * exports.foo = (a, b) => -exports.bar(a, b);
 * ~~>
 * export const foo = (a, b) => -bar(a, b);
 */
function convertExportArrowFunction(s: string) {
  if (s.indexOf('exports.') === -1 || s.indexOf('=>') === -1) {
    return s;
  }
  // tslint:disable-next-line: prefer-const
  let [left, ...rights] = s.split('=');
  let right = rights.join('=');
  left = left.replace('exports.', 'export const ');
  left = left.trimRight();
  right = right.replace(/exports\./g, '');
  right = right.trimLeft();
  return [left, right].join(' = ');
}

function convertES5ToEs6(src: string) {
  return src.split('\n')
    .map(
      oneOf([
        convertRequireToES6Import,
        convertES5ModuleExportsToES6ExportDefault,
        convertES5ExportsFunctionToES6ExportFunction,
        convertExportArrowFunction
      ])
    )
    .join('\n');
}

walk('.', {endsWith: '.js'}, async fpath => {
  console.log(fpath);
  convertES5ToEs6(fpath);
});

// convertES5ToEs6('/Users/livestar/GTD/Packages/mikov/src/xhr.js');
