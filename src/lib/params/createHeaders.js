export default token => {

  const headers = new Headers();
  headers.append(`Content-Type`, `application/json`);

  if (token && token()) {
    headers.append(`Authorization`, `Bearer ${token()}`);
  }

  return headers;

};