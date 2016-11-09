import BodyConversion from '../const/BodyConversion';

import createHeaders from './createHeaders';
import createBody from './createBody';

export default ({
  method = `GET`,
  token = ``,
  payload = {},
  conversion = BodyConversion.JSON
} = {}) => {

  const headers = createHeaders(token);

  const params = {method, headers};
  if (payload) params.body = createBody(payload, {conversion});

  return params;

};
