import ignoreOptionals from './ignoreOptionals';

import isPlainObject from '../util/isPlainObject';

export default (fields, {indicator = `?`} = {}) => {

  let query = [];
  let payload = [];

  const _page = [`per_page`, `page`];
  const _id = [`id`, `_id`];
  const _sort = [`sort`, `sort_by`];

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
    payload,
    _page,
    _id,
    _sort
  };

};
