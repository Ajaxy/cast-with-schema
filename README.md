# cast-with-schema
[![NPM version](https://img.shields.io/npm/v/cast-with-schema.svg)](https://npmjs.com/package/cast-with-schema)

The way to cast data to types specified with [JSON schema](http://json-schema.org/).

May be used for query params casting:

```js
const qs = require('qs');
const castWithSchema = require('cast-with-schema');

const schema = {
  type: "object",
  properties: {
    param1: {
      type: 'string',
    },
    param2: {
      type: 'integer',
    },
    param3: {
      type: 'number',
    },
    param4: {
      type: 'boolean',
    },
  }
};

const query = 'param1=value&param2=777&param3=7.77&param4=false';
const parsed = qs.parse(query);
const casted = castWithSchema(query, schema);

/*
  `casted` is now:
  {
    param1: 'value',
    param2: 777,
    param3: 7.77,
    param4: false,
  }
*/

```

Supports `null` if schema is either:
```
type: ['..', 'null']
```
or
```
anyOf: [
  { type: '..' },
  { type: 'null' }
]
```

### See also

Check out [tinsypec](https://github.com/Ajaxy/tinyspec) for more smart JSON schema use cases.

