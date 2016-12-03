// @flow

export default (token?: string | () => string): Headers => {

  const headers: Headers = new Headers();
  headers.append(`Content-Type`, `application/json`);

  if (token) {
    if (typeof token === `function`) token = token();
    headers.append(`Authorization`, `Bearer ${token}`);
  }

  return headers;

};
