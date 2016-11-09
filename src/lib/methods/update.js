import {pick} from 'lodash';

import fetch from '../fetch';

import createParams from '../params/createParams';

import isFullUpdate from '../validation/isFullUpdate';

import ignoreOptionals from '../parse/ignoreOptionals';

import BodyConversion from '../const/BodyConversion';

export default ({
  url,
  fields = [],
  token = ``,
  log = false,
  conversion = BodyConversion.JSON,
  indicator = `?`
} = {}) => {

  return (payload = {}) => {

    const {id, _id} = payload;

    if (!id && !_id) throw new Error(`please provide an id or _id field`);

    payload = pick(payload, ignoreOptionals(fields, {indicator}));

    const method = isFullUpdate(payload, fields, {indicator}) ? `PUT` : `PATCH`;

    const params = createParams({
      method,
      token,
      payload,
      conversion,
    });

    return fetch(url, params, log);

  };

};
