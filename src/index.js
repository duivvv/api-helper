import {pick} from 'lodash';

import fetch from 'isomorphic-fetch';
import createQueryString from './lib/createQueryString';
import logRequest from './lib/logRequest';

import validateSort from './lib/validation/validateSort';
import validatePayload from './lib/validation/validatePayload';
import checkStatus from './lib/validation/checkStatus';

import createHeaders from './lib/createHeaders';

export default (route, {
  token,
  base,
  log = true,
  fields
} = {}) => {

  if (!base) throw new Error(`please set a base path (absolute URL)`);
  if (!route) throw new Error(`please provide a route (cfr. users, feedback,...)`);

  const bFields = {
    get: [`sort`, `per_page`, `page`, `_id`, `id`]
  };

  const url = `${base}/${route}`;

  const helper = {

    get(query = {}) {

      query = pick(query, [...fields.get, ...bFields.get]);
      if (query.sort) validateSort(query.sort);

      let pUrl = url;

      if (query.id || query._id) {
        const {id, _id} = query;
        pUrl = `${url}/${id || _id}`;
      } else {
        pUrl = `${url}${createQueryString(query)}`;
      }

      const headers = createHeaders(token);

      if (log) logRequest(`GET`, pUrl);

      return fetch(pUrl, {headers})
        .then(checkStatus);

    },

    insert(payload = {}) {

      payload = pick(payload, fields.insert);

      validatePayload(payload, fields.insert);

      const headers = createHeaders(token);
      const method = `POST`;
      const body = JSON.stringify(payload);

      if (log) logRequest(`POST`, url, body);

      return fetch(url, {headers, method, body})
        .then(checkStatus);

    },

    remove(id) {

      if (!id) throw new Error(`please provide an id`);

      const headers = createHeaders(token);
      const method = `DELETE`;

      const pUrl = `${url}/${id}`;

      if (log) logRequest(`DELETE`, pUrl);

      return fetch(pUrl, {headers, method})
        .then(checkStatus);

    }

  };

  return helper;

};
