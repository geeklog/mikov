import { createHash } from 'crypto';

export default function(s: string) {
  return createHash('md5').update(s).digest("hex");
}
