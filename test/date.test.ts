import {parseTimeDesc} from '../src/date';
import { expect } from 'chai';

describe('date', () => {

  it('parseTimeDesc', async () => {
    expect(86400000).equal(parseTimeDesc('1days'));
    expect(86400000).equal(parseTimeDesc('1day'));
    expect(86400000).equal(parseTimeDesc('1 days'));
    expect(86400000).equal(parseTimeDesc('1 day'));
    expect(3600000).equal(parseTimeDesc('1hours'));
    expect(3600000).equal(parseTimeDesc('1hour'));
    expect(3600000).equal(parseTimeDesc('1 hours'));
    expect(3600000).equal(parseTimeDesc('1 hour'));
    expect(60000).equal(parseTimeDesc('1minutes'));
    expect(60000).equal(parseTimeDesc('1minute'));
    expect(60000).equal(parseTimeDesc('1min'));
    expect(60000).equal(parseTimeDesc('1 minutes'));
    expect(60000).equal(parseTimeDesc('1 minute'));
    expect(60000).equal(parseTimeDesc('1 min'));
    expect(1000).equal(parseTimeDesc('1seconds'));
    expect(1000).equal(parseTimeDesc('1second'));
    expect(1000).equal(parseTimeDesc('1sec'));
    expect(1000).equal(parseTimeDesc('1 seconds'));
    expect(1000).equal(parseTimeDesc('1 second'));
    expect(1000).equal(parseTimeDesc('1 sec'));
  });

});
