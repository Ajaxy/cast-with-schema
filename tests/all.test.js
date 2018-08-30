const castWithSchema = require('../lib/index');

describe('All', () => {
  it('Works', () => {
    expect(castWithSchema({
      a: 'value',
      b: '777',
      c: '7.77',
      d1: '777d', // `777` with integer
      d2: '777d', // `NaN` with number
      e: '777',
      f: 'true',
      g: 'false',
      h: 'invalid-boolean',
      i: 'true', // keep string
      j: 'false', // keep string
      k: 'null', // keep string
      l: {
        l1: 'value',
        l2: '777',
        l3: 'true',
        l4: 'false',
      },
      m: 'true', // schema with types array
      n: 'null', // `null` allowed using types array
      o: 'true', // schema with `anyOf`
      p: 'null', // null allowed with `anyOf`
      q: 'invalid-number',
      r: 'invalid-object',
      s: ['777', '7.77', 'invalid-number'],
      t: {}, // invalid array
      u: 'value', // missing schema type
      v: 'value', // missing type,
      w: '',
      x: '', // `NaN` with integer
      y: '', // `0` with number
      z: '', // `true` with boolean
    }, {
      type: 'object',
      properties: {
        a: {
          type: 'string',
        },
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
        f: {
          type: 'boolean',
        },
        g: {
          type: 'boolean',
        },
        h: {
          type: 'boolean',
        },
        i: {
          type: 'string',
        },
        j: {
          type: 'string',
        },
        k: {
          type: 'string',
        },
        l: {
          type: 'object',
          properties: {
            l1: {
              type: 'string',
            },
            l2: {
              type: 'number',
            },
            l3: {
              type: 'boolean',
            },
            l4: {
              type: 'boolean',
            },
          },
        },
        m: {
          type: ['boolean', 'null'],
        },
        n: {
          type: ['boolean', 'null'],
        },
        o: {
          anyOf: [
            { type: 'boolean' },
            { type: 'null' },
          ],
        },
        p: {
          anyOf: [
            { type: 'boolean' },
            { type: 'null' },
          ],
        },
        q: {
          type: 'number',
        },
        r: {
          type: 'object',
        },
        s: {
          type: 'array',
          items: {
            type: 'number',
          },
        },
        t: {
          type: 'array',
          items: {
            type: 'number',
          },
        },
        u: {},
        w: {
          type: 'string',
        },
        x: {
          type: 'integer',
        },
        y: {
          type: 'number',
        },
        z: {
          type: 'boolean',
        },

      },
    })).toEqual({
      a: 'value',
      b: 777,
      c: 7.77,
      d1: 777,
      d2: NaN,
      e: '777',
      f: true,
      g: false,
      h: true,
      i: 'true',
      j: 'false',
      k: 'null',
      l: {
        l1: 'value',
        l2: 777,
        l3: true,
        l4: false,
      },
      m: true,
      n: null,
      o: true,
      p: null,
      q: NaN,
      r: undefined,
      s: [777, 7.77, NaN],
      t: undefined,
      u: 'value',
      v: 'value',
      w: '',
      x: NaN,
      y: 0,
      z: true,
    });
  });
});
