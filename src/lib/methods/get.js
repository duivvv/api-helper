import {pick} from 'lodash';

import fetch from '../fetch';

import validateSort from '../validation/validateSort';
import createQueryString from '../url/createQueryString';
import createParams from '../params/createParams';

export default ({
  url,
  fields = [],
  token = ``,
  log = false
} = {}) => {

  return (query = {}) => {

    query = pick(query, fields);
    if (query.sort) validateSort(query.sort);

    let pUrl;

    if (query.id || query._id) {
      const {id, _id} = query;
      pUrl = `${url}/${id || _id}`;
    } else {
      pUrl = `${url}${createQueryString(query)}`;
    }

    const params = createParams({token});

    return fetch(pUrl, params, log);

  };

};
