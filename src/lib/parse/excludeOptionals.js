export default (fields, {indicator = `?`} = {}) => (
  fields.filter(f => !f.startsWith(indicator))
);
