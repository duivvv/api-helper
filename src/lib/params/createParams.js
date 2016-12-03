// @flow

import BodyConversion from '../const/BodyConversion';

import createHeaders from './createHeaders';
import createBody from './createBody';

type options = {
  method?: string,
  token?: string | Function,
  payload?: Object,
  conversion?: string
};

export default ({
  method = `GET`,
  token,
  payload = {},
  conversion = BodyConversion.JSON
}: options = {}): Object => {

  const headers: Headers = createHeaders(token);

  const params: Object = {method, headers};
  if (payload) params.body = createBody(payload, {conversion});

  return params;

};
