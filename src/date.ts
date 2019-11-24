import { shortcut } from './fn';

export function midnight() {
  const now = new Date();
  return (Math.floor(now.getTime() / 1000)
    - (now.getHours() * 60 * 60 + now.getMinutes() * 60 + now.getSeconds())) * 1000;
}

export function midnightTomorrow() {
  return exports.midnight() + 24 * 3600 * 1000;
}

export function format(timestamp: number) {
  function leftPad(str: string) {
    if (str.length >= 3) { return str; }
    if (str.length === 1) { return '00' + str; }
    return '0' + str;
  }

  let formatStr = 'Y-m-d H:i:s.l';
  const d: Date = new Date(timestamp);

  formatStr = formatStr.replace('Y', '' + d.getFullYear());
  formatStr = formatStr.replace('y', ('' + d.getFullYear()).substr(-2));
  formatStr = formatStr.replace('m', ('0' + (d.getMonth() + 1)).substr(-2));
  formatStr = formatStr.replace('d', ('0' + d.getDate()).substr(-2));

  const hour = d.getHours();
  formatStr = formatStr.replace('H', ('0' + hour).substr(-2));
  formatStr = formatStr.replace('h', ('0' + ((hour | 0) % 12 || 12)).substr(-2));

  formatStr = formatStr.replace('a', hour < 12 ? 'am' : 'pm');

  formatStr = formatStr.replace('i', ('0' + d.getMinutes()).substr(-2));
  formatStr = formatStr.replace('s', ('0' + d.getSeconds()).substr(-2));
  formatStr = formatStr.replace('l', leftPad('' + d.getMilliseconds()));

  return formatStr;
}

/**
 * '1days' => 86400000
 * @param dateStr
 */
export function parseTimeDesc(dateStr: string) {
  const parse = (timeDescs: string[], timeSpan: number) => (str: string) => {
    if (!str.indexOf) {
      throw new Error(`error format: ${str}`);
    }
    for (const desc of timeDescs) {
      if (~str.indexOf(desc)) {
        str = str.replace(desc, '').trim();
        return Number(str) * timeSpan;
      }
    }
  };

  if (dateStr === undefined) {
    return undefined;
  }

  if (!isNaN(Number(dateStr))) {
    return Number(dateStr);
  }

  return shortcut([
    parse(['months', 'month', 'mon'], 30 * 24 * 3600 * 1000),
    parse(['days', 'day'], 24 * 3600 * 1000),
    parse(['hours', 'hour'], 3600 * 1000),
    parse(['minutes', 'minute', 'min'], 60 * 1000),
    parse(['seconds', 'second', 'sec', 's'], 1000)
  ], dateStr);

}
