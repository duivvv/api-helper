// @flow

import pick from '../util/pick';

import fetch from '../fetch';

import createParams from '../params/createParams';

import validatePayload from '../validation/validatePayload';
import ignoreOptionals from '../parse/ignoreOptionals';

import BodyConversion from '../const/BodyConversion';

type options = {
  url: string,
  fields: Array<string>,
  log: boolean,
  token: string | Function,
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
}: options): Function => {

  return (payload: Object = {}): Promise<Object> => {

    payload = pick(payload, ignoreOptionals(fields, {indicator}));

    if (!validatePayload(payload, fields, {indicator})) {
      throw new Error(`payload must contain ${JSON.stringify(fields)}`);
    }

    const params: Object = createParams({
      method: `POST`,
      token,
      payload,
      conversion
    });

    return fetch(url, params, log);

  };

};
