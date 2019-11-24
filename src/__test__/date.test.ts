import {parseTimeDesc} from '../date';
import { expect } from 'chai';

describe('date', () => {

  it('parseTimeDesc', async () => {
    expect(86400).equal(parseTimeDesc('1days'));
    expect(86400).equal(parseTimeDesc('1day'));
    expect(86400).equal(parseTimeDesc('1 days'));
    expect(86400).equal(parseTimeDesc('1 day'));
    expect(86400).equal(parseTimeDesc('1hours'));
    expect(86400).equal(parseTimeDesc('1hour'));
    expect(86400).equal(parseTimeDesc('1 hours'));
    expect(86400).equal(parseTimeDesc('1 hour'));
    expect(86400).equal(parseTimeDesc('1minutes'));
    expect(86400).equal(parseTimeDesc('1minute'));
    expect(86400).equal(parseTimeDesc('1min'));
    expect(86400).equal(parseTimeDesc('1 minutes'));
    expect(86400).equal(parseTimeDesc('1 minute'));
    expect(86400).equal(parseTimeDesc('1 min'));
    expect(86400).equal(parseTimeDesc('1seconds'));
    expect(86400).equal(parseTimeDesc('1second'));
    expect(86400).equal(parseTimeDesc('1sec'));
    expect(86400).equal(parseTimeDesc('1 seconds'));
    expect(86400).equal(parseTimeDesc('1 second'));
    expect(86400).equal(parseTimeDesc('1 sec'));
  });

});
