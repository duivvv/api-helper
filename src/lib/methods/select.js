// @flow

import pick from '../util/pick';

import fetch from '../fetch';

import validateSort from '../validation/validateSort';
import createQueryString from '../url/createQueryString';
import createParams from '../params/createParams';

type options = {
  url: string,
  fields: Array<string>,
  token: string | Function,
  log: boolean
};

export default ({
  url,
  fields = [],
  token,
  log = false
}: options = {}): Function => {

  return (query: Object = {}): Promise<Object> => {

    query = pick(query, fields);

    if (query.sort) {
      if (!validateSort(query.sort)) {
        throw new Error(`sort should be 'asc' or 'desc'`);
      }
    }

    // todo: check if sort_by field exists

    let pUrl: string;

    if (query.id || query._id) {
      const {id, _id} = query;
      pUrl = `${url}/${id || _id}`;
    } else {
      pUrl = `${url}${createQueryString(query)}`;
    }

    const params: Object = createParams({token, method: `GET`});

    return fetch(pUrl, params, log);

  };

};
