import {pick} from 'lodash';

import fetch from '../fetch';

import createParams from '../params/createParams';

import validatePayload from '../validation/validatePayload';
import ignoreOptionals from '../parse/ignoreOptionals';

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

    if (!validatePayload(payload, fields, {indicator})) {
      throw new Error(`payload must contain ${JSON.stringify(fields)}`);
    }

    const params = createParams({
      method: `POST`,
      token,
      payload,
      conversion
    });

    return fetch(url, params, log);

  };

};
