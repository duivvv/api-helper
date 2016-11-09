export default (fields, {indicator = `?`} = {}) => (

  fields.map(f => {
    if (f.startsWith(indicator)) return f.substring(1, f.length);
    return f;
  })

);
