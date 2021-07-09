const castWithSchema = require('../lib/index');

describe('All', () => {
  const schema = {
    anyOf: [
      { type: 'object' },
      { type: 'null' },
    ],
  };
  it('Null native', () => {
    const result = castWithSchema(null, schema);
    expect(result).toEqual(null);
  });

  it('Null string', () => {
    const result = castWithSchema('null', schema);
    expect(result).toEqual(null);
  });
});
