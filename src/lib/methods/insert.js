import {pick} from 'lodash';

import fetch from '../fetch';

import createParams from '../params/createParams';
import validatePayload from '../validation/validatePayload';

import ignoreOptionals from '../validation/ignoreOptionals';

import BodyConversion from '../const/BodyConversion';

export default ({
  url,
  fields = [],
  token = ``,
  log = false,
  conversion = BodyConversion.JSON,
  indicator = `?`
}) => {

  return (payload = {}) => {

    payload = pick(payload, ignoreOptionals(fields, {indicator}));
    validatePayload(payload, fields, {indicator});

    const params = createParams({
      method: `POST`,
      token,
      payload,
      conversion
    });

    return fetch(url, params, log);

  };

};
