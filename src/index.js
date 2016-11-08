import fetch from 'isomorphic-fetch';
import createQueryString from './lib/createQueryString';
import cleanQueryObject from './lib/cleanQueryObject';
import logRequest from './lib/logRequest';
import validateSort from './lib/validation/validateSort';

export default (route, token, {
  base,
  log = true,
  fields
} = {}) => {

  if (!base) throw new Error(`please set a base path (absolute URL)`);
  if (!route) throw new Error(`please provide a route (cfr. users, feedback,...)`);

  const bFields = {
    select: [`sort`, `per_page`, `page`, `_id`, `id`]
  };

  const url = `${base}/${route}`;

  const helper = {

    get(query) {

      query = cleanQueryObject(query, [...fields.select, ...bFields.select]);
      if (query.sort) validateSort(query.sort);

      let pUrl;

      if (query.id || query._id) {
        const {id, _id} = query;
        pUrl = `${url}/${id || _id}`;
      } else {
        pUrl = createQueryString(query);
      }

      if (log) logRequest(`GET`, pUrl);

      return fetch(pUrl)
        .then(r => r.json());

    }

  };

  return helper;

};
