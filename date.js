export function format(timestamp) {
  function leftPad(str) {
    str = '' + str;
    if (str.length >= 3) return str;
    if (str.length == 1) return '00' + str;
    return '0' + str;
  }

  var formatStr = 'Y-m-d H:i:s.l'
  var d = new Date(timestamp);

  var year = d.getYear() + 1900;
  formatStr = formatStr.replace('Y', year);
  formatStr = formatStr.replace('y', (year + '').substr(-2));
  formatStr = formatStr.replace('m', ('0' + (d.getMonth() + 1)).substr(-2));
  formatStr = formatStr.replace('d', ('0' + d.getDate()).substr(-2));

  var hour = d.getHours();
  formatStr = formatStr.replace('H', ('0' + hour).substr(-2));
  formatStr = formatStr.replace('h', ('0' + ((hour | 0) % 12 || 12)).substr(-2));

  formatStr = formatStr.replace('a', hour < 12 ? 'am' : 'pm');

  formatStr = formatStr.replace('i', ('0' + d.getMinutes()).substr(-2));
  formatStr = formatStr.replace('s', ('0' + d.getSeconds()).substr(-2));
  formatStr = formatStr.replace('l', leftPad(d.getMilliseconds()));
  return formatStr;
}