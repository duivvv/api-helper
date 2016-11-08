import {pick} from 'lodash';

import fetch from '../fetch';

import createParams from '../create/createParams';
import validatePayload from '../validation/validatePayload';

export default ({
  url,
  fields,
  token,
  log
}) => {

  return (payload = {}) => {

    payload = pick(payload, fields);

    validatePayload(payload, fields);

    const params = createParams({
      method: `POST`,
      token,
      payload
    });

    return fetch(url, params, log);

  };

};
