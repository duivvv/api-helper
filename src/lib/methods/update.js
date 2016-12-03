// @flow

import pick from '../util/pick';

import fetch from '../fetch';

import createParams from '../params/createParams';

import isFullUpdate from '../validation/isFullUpdate';

import ignoreOptionals from '../parse/ignoreOptionals';

import BodyConversion from '../const/BodyConversion';

type options = {
  url: string,
  fields: Array<string>,
  token: string | Function,
  log: boolean,
  conversion: string,
  indicator: string
};

export default ({
  url,
  fields = [],
  token,
  log = false,
  conversion = BodyConversion.JSON,
  indicator = `?`
}: options = {}): Function => {

  return (payload: {id?: ?string, _id?: ?string} = {}): Promise<Object> => {

    const {id, _id} = payload;

    if (!id && !_id) throw new Error(`please provide an id or _id field`);

    payload = pick(payload, ignoreOptionals(fields, {indicator}));

    const method: string = isFullUpdate(payload, fields, {indicator}) ? `PUT` : `PATCH`;

    if (id) url = `${url}/${id}`;
    else if (_id) url = `${url}/${_id}`;

    const params: Object = createParams({
      method,
      token,
      payload,
      conversion,
    });

    return fetch(url, params, log);

  };

};
