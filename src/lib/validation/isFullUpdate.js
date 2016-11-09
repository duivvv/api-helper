import ignoreOptionals from '../parse/ignoreOptionals';

export default (payload, fields, {indicator}) => {

  fields = ignoreOptionals(fields, {indicator});

  if (Object.keys(payload).length !== Object.keys(fields).length) return false;

  fields.forEach(field => {
    if (!payload[field]) return false;
  });

  return true;

};
