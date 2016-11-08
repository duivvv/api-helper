import {pick} from 'lodash';

import fetch from '../fetch';

import validateSort from '../validation/validateSort';
import createQueryString from '../create/createQueryString';
import createParams from '../create/createParams';


export default ({
  url,
  fields,
  token,
  log
}) => {

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
