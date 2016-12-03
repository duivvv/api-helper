// @flow

export default (obj: Object, fields: Array<string>): Object => {

  const nObj: Object = {};

  fields.forEach((key: string): void => {
    if (obj[key]) nObj[key] = obj[key];
  });

  return nObj;

};
