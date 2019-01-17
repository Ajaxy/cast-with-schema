const castWithSchema = require('../lib/index');

describe('All', () => {
  it('Works', () => {
    expect(castWithSchema({
      b: '777',
      c: '7.77',
      d1: '777d',
      d2: '777d',
      e: '777',
      q: 'invalid-number',
      s: ['777', '7.77', 'invalid-number'],
      s2: ['777', '7.77', 'invalid-number'], // array when `null` allowed
      x: '',
      y: '',
    }, {
      type: 'object',
      properties: {
        b: {
          type: 'integer',
        },
        c: {
          type: 'number',
        },
        d1: {
          type: 'integer',
        },
        d2: {
          type: 'number',
        },
        e: {
          type: 'string',
        },
        q: {
          type: 'number',
        },
        s: {
          type: 'array',
          items: {
            type: 'number',
          },
        },
        s2: {
          anyOf: [
            {
              type: 'array',
              items: {
                type: 'number',
              },
            },
            {
              type: 'null',
            },
          ],
        },
        x: {
          type: 'integer',
        },
        y: {
          type: 'number',
        },
      },
    }, {
      allowNaN: true,
    })).toEqual({
      b: 777,
      c: 7.77,
      d1: 777,
      d2: 777,
      e: '777',
      q: NaN,
      s: [777, 7.77, NaN],
      s2: [777, 7.77, NaN],
      x: NaN,
      y: NaN,
    });
  });
});
