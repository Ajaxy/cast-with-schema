function castObjectType(source, schema, options = {}) {
  const casted = {};

  Object.keys(source).forEach((field) => {
    const value = source[field];
    const propertyDef = schema.properties && schema.properties[field];

    casted[field] = castWithSchema(value, propertyDef, options);
  });

  return casted;
}

function castWithSchema(value, propertyDef, options = {}) {
  if (!propertyDef || value === undefined) {
    return value;
  }

  if ((value === 'null' || value === null) && isNullAllowed(propertyDef)) {
    return null;
  }

  const realDef = findNotNullDef(propertyDef);

  switch (resolveType(realDef)) {
    case 'string':
      return String(value);
    case 'integer':
      const int = parseInt(value, 10);
      return options.allowNaN ? int : (int || 0);
    case 'number':
      const float = parseFloat(value);
      return options.allowNaN ? float : (float || 0);
    case 'boolean':
      return value === 'false' ? false : Boolean(value);
    case 'array':
      return Array.isArray(value) ? value.map(member => castWithSchema(member, realDef.items, options)) : undefined;
    case 'object':
      return typeof value === 'object' ? castObjectType(value, realDef, options) : undefined;
    default:
      return value;
  }
}

function isNullAllowed(propertyDef) {
  const { type, anyOf } = propertyDef;

  if (Array.isArray(type)) {
    return type.includes('null');
  }

  if (anyOf) {
    return anyOf.some(({ type: t }) => t === 'null');
  }

  return false;
}

function resolveType(propertyDef) {
  const { type } = propertyDef;

  if (typeof type === 'string') {
    return type;
  }

  if (Array.isArray(type)) {
    return type.find(t => t !== 'null');
  }

  return null;
}

function findNotNullDef(propertyDef) {
  return propertyDef.anyOf
    ? propertyDef.anyOf.find(({ type: t }) => t !== 'null')
    : propertyDef;
}

module.exports = castWithSchema;
