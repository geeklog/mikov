import { typedef } from '..';
import { assert } from 'chai';

describe('typedef', () => {
  it('return type def', () => {
    const type = typedef({
      type: 200,
      persons: [
        {
          name: "john",
          nick: "",
          joinmode: 1,
          mute: true,
          avoid: false,
          createtime: 1506652312445
        }
      ]
    });
    const typeExpect = {
      type: 'number',
      persons: [
        {
          name: 'string',
          nick: 'string',
          joinmode: 'number',
          mute: 'boolean',
          avoid: 'boolean',
          createtime: 'number'
        }
      ]
    };
    assert.deepEqual(type, typeExpect);
  });
});
