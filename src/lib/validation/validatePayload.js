import excludeOptionals from './excludeOptionals';

export default (payload, fields, {indicator = `?`} = {}) => {

  fields = excludeOptionals(fields, {indicator});

  fields.forEach(field => {
    if (!payload[field]) {
      throw new Error(`payload must contain ${JSON.stringify(fields)}`);
    }
  });

};
