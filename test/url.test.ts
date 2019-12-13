import { assert } from "chai";
import { urlJoin } from '../src/url';

assert.equal(urlJoin('http://www.xyz.com/a/', '/b/'), 'http://www.xyz.com/a/b');
