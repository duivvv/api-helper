import fetch from 'isomorphic-fetch';
import createQueryString from './lib/createQueryString';
import logRequest from './lib/logRequest';

export default (route, token, {
  base,
  log = true
} = {}) => {

  const url = `${base}/${route}`;

  const helper = {

    select(query) {

      const qs = createQueryString(query);
      const qsUrl = `${url}${qs}`;

      if (log) logRequest(`GET`, qsUrl);

      return fetch(qsUrl)
        .then(r => r.json());

    }

  };

  return helper;

};
