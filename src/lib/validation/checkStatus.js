// @flow

export default (response: {json: () => Object}): Promise<string> => {

  const json: Object = response.json();

  if (response.ok) return json;
  else return json.then(Promise.reject.bind(Promise));

};
