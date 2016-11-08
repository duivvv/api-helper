import createHeaders from './createHeaders';

export default ({
  method = `GET`,
  token = ``,
  payload = {}
} = {}) => {

  const headers = createHeaders(token);

  const params = {method, headers};
  if (payload) params.body = JSON.stringify(payload);

  return params;

};
