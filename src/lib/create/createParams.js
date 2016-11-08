import createHeaders from './createHeaders';
import createBody from './createBody';

export default ({
  method = `GET`,
  token = ``,
  payload
} = {}) => {

  const headers = createHeaders(token);

  const params = {method, headers};
  if (payload) params.body = createBody(payload);

  return params;

};
