import ignoreOptionals from './ignoreOptionals';
import {isPlainObject} from 'lodash';

export default (fields, {indicator = `?`} = {}) => {

  let query = [];
  let payload = [];

  if (Array.isArray(fields)) {
    query = fields;
    payload = fields;
  } else if (isPlainObject(fields)) {
    query = fields.query || [],
    payload = fields.payload || [];
  } else {
    throw new Error(`fields must be an Object or an array`);
  }

  return {
    query: ignoreOptionals(query, {indicator}),
    payload
  };

};
