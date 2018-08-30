function castWithSchema(query, schema) {
  const casted = {};

  Object.keys(query).forEach((field) => {
    const value = query[field];
    const propertyDef = schema.properties && schema.properties[field];

    casted[field] = castProp(value, propertyDef);
  });

  return casted;
}

function castProp(value, propertyDef) {
  if (!propertyDef || value === undefined) {
    return value;
  }

  if (value === 'null' && isNullAllowed(propertyDef)) {
    return null;
  }

  switch (resolveType(propertyDef)) {
    case 'integer':
      return parseInt(value, 10);
    case 'number':
      return Number(value);
    case 'boolean':
      return value !== 'false';
    case 'array':
      return Array.isArray(value) ? value.map(member => castProp(member, propertyDef.items)) : undefined;
    case 'object':
      return typeof value === 'object' ? castWithSchema(value, propertyDef) : undefined;
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
  const { type, anyOf } = propertyDef;

  if (typeof type === 'string') {
    return type;
  }

  if (Array.isArray(type)) {
    return type.find(t => t !== 'null');
  }

  if (anyOf) {
    return anyOf.find(({ type: t }) => t !== 'null').type;
  }

  return null;
}

module.exports = castWithSchema;
