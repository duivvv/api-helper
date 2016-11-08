export default (payload, fields) => {

  fields.forEach(field => {
    if (!payload[field]) {
      throw new Error(`payload must contain ${JSON.stringify(fields)}`);
    }
  });

};
