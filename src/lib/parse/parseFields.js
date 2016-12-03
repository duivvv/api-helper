// @flow

import ignoreOptionals from './ignoreOptionals';

import isPlainObject from '../util/isPlainObject';

export default (fields: Array<string> | Object, {indicator = `?`}: {indicator: string} = {}): Object => {

  let query: Array<string> = [];
  let payload: Array<string> = [];

  const _page: Array<string> = [`per_page`, `page`];
  const _id: Array<string> = [`id`, `_id`];
  const _sort: Array<string> = [`sort`, `sort_by`];

  if (Array.isArray(fields)) {
    query = fields;
    payload = fields;
  } else if (isPlainObject(fields)) {
    query = fields.query || [],
    payload = fields.payload || [];
  } else {
    throw new Error(`fields must be a String or an Array`);
  }

  return {
    query: ignoreOptionals(query, {indicator}),
    payload,
    _page,
    _id,
    _sort
  };

};
