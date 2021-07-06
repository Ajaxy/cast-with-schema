const castWithSchema = require('../lib/index');

describe('All', () => {
  it('Works', () => {
    const schema = {
      anyOf:
        [
          {
            type: 'object',
            properties: {
              dateFrom: { type: ['string', 'null'] },
              dateTo: { type: ['string', 'null'] },
              accountId: { type: ['integer', 'null'] },
            },
          },
          {
            type: 'null',
          },
        ],
    };

    const data = {
      dateFrom: '2020-07-01T12:00:00.000Z',
      dateTo: '2020-07-03T12:00:00.000Z',
      accountId: '1',
    };

    const casted = castWithSchema(data, schema);

    expect(casted).toEqual({
      dateFrom: '2020-07-01T12:00:00.000Z',
      dateTo: '2020-07-03T12:00:00.000Z',
      accountId: 1,
    });
  });
});
