'use strict';

export default query => {

  let qs = '';

  let keys = Object.keys(query);
  keys = keys.filter(key => key !== 'id');

  keys.forEach((key, i) => {
    if(i === 0) qs += '?';
    qs += `${key}=${query[key]}`;
    if(i !== (keys.length-1)) qs += '&';
  });

  return qs;

};
