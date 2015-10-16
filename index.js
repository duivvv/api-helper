'use strict';

import 'whatwg-fetch';
import {polyfill} from 'es6-promise';
polyfill();

import buildFormData from './lib/buildFormData';
import createQueryString from './lib/createQueryString';
import getFunctionsByFlag from './lib/getFunctionsByFlag';

export default (options) => {

  options = options || {};

  if(!options.collection) throw new Error('collection parameter required');

  let collection = options.collection;

  let root = options.root || '/api';
  let exclude = options.exclude || '';

  let base = `${root}/${collection}`;

  const insert = data => {

    let settings = {
      method: 'POST',
      body: buildFormData(data)
    };

    return fetch(`${base}`, settings)
      .then(r => r.json());

  };

  const update = (id, data) => {

    let settings = {
      method: 'PATCH',
      body: buildFormData(data)
    };

    return fetch(`${base}/${id}`, settings)
      .then(r => r.json());

  };

  const select = (query={}) => {

    let url;

    if(query.id){
      url = `${base}/${query.id}`;
    }else{
      url = `${base}/${createQueryString(query)}`;
    }

    return fetch(url)
      .then(r => r.json())
      .then(data => {
        if(data[collection]) return data[collection];
        else return data;
      });

  };

  const remove = id => {

    return fetch(`${base}/${id}`, {method: 'DELETE'})
      .then(r => r.json())
      .then(data => data.id);

  };

  let obj = {
    select,
    insert,
    update,
    remove
  };

  if(Array.isArray(exclude)){
    for(let i = 0; i < exclude.length; i++){
      let functions = getFunctionsByFlag(exclude[i]);
      for(let j = 0; j < functions.length; j++){
        delete obj[functions[j]];
      }
    }
  }else if(exclude.length > 0){
    let functions = getFunctionsByFlag(exclude);
    for(let i = 0; i < functions.length; i++){
      delete obj[functions[i]];
    }
  }

  return obj;

};
