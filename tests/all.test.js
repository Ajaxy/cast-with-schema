const castWithSchema = require('../lib/index');

describe('All', () => {
  it('Works', () => {
    expect(castWithSchema({
      a: 'value',
      b: '777',
      c: '7.77',
      d1: '777d',
      d2: '777d',
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
      l2: { // object when `null` allowed
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
      s2: ['777', '7.77', 'invalid-number'], // array when `null` allowed
      t: {}, // invalid array
      u: 'value', // missing schema type
      v: 'value', // missing type,
      w: '',
      x: '',
      y: '',
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
        l2: {
          anyOf: [
            {
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
            {
              type: 'null',
            },
          ],
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
      d2: 777,
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
      l2: {
        l1: 'value',
        l2: 777,
        l3: true,
        l4: false,
      },
      m: true,
      n: null,
      o: true,
      p: null,
      q: 0,
      r: undefined,
      s: [777, 7.77, 0],
      s2: [777, 7.77, 0],
      t: undefined,
      u: 'value',
      v: 'value',
      w: '',
      x: 0,
      y: 0,
      z: true,
    });
  });
});
