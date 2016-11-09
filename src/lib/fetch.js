import fetch from 'isomorphic-fetch';

import checkStatus from './validation/checkStatus';
import logRequest from './logRequest';

import {isEmpty} from 'lodash';

export default (url, params, log) => {

  if (log) {
    logRequest(params.method, url, isEmpty(params.body) ? JSON.parse(params.body) : ``);
  }

  return fetch(url, params)
    .then(checkStatus);

};
