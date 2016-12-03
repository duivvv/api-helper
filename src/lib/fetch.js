//import fetch from 'isomorphic-fetch';

import checkStatus from './validation/checkStatus';
import logRequest from './logRequest';

import isEmpty from './util/isEmpty';

export default (url: string, params: Object, log: true): Promise => {

  if (log) {
    logRequest(params.method, url, isEmpty(params.body) ? JSON.parse(params.body) : ``);
  }

  return fetch(url, params)
    .then(checkStatus);

};
