export default (obj, fields) => {
  const nObj = {};
  fields.forEach(key => {
    if (obj[key]) nObj[key] = obj[key];
  });
  return nObj;
};
