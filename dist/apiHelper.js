(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.apiHelper = factory());
}(this, (function () { 'use strict';

var pick = (function (obj, fields) {
  var nObj = {};
  fields.forEach(function (key) {
    if (obj[key]) nObj[key] = obj[key];
  });
  return nObj;
});

var checkStatus = (function (response) {

  var json = response.json();

  if (response.ok) return json;else return json.then(Promise.reject.bind(Promise));
});

var logRequest = (function () {
  var _console;

  return (_console = console).log.apply(_console, arguments);
});

var isEmpty = (function (obj) {
  return Object.keys(obj) === 0;
});

//import fetch from 'isomorphic-fetch';

var fetch$1 = (function (url, params, log) {

  if (log) {
    logRequest(params.method, url, isEmpty(params.body) ? JSON.parse(params.body) : '');
  }

  return fetch(url, params).then(checkStatus);
});

var validateSort = (function (sort) {

  sort = sort.toLowerCase();

  if (sort !== "asc" && sort !== "desc") {
    return false;
  }

  return true;
});

var createQueryString = (function () {
  var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


  var nProps = Object.keys(query).length;
  if (nProps === 0) return "";

  var url = "?";
  var i = 1;

  for (var prop in query) {
    var val = query[prop];
    url += prop + "=" + val;
    if (i < nProps) url += "&";
    i++;
  }

  return url;
});

var BodyConversion = {
  JSON: "json",
  FORMDATA: "formdata"
};

var createHeaders = (function (token) {

  var headers = new Headers();
  headers.append("Content-Type", "application/json");

  if (token) {
    if (typeof token === "function") token = token();
    headers.append("Authorization", "Bearer " + token);
  }

  return headers;
});

var createBody = (function (payload) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$conversion = _ref.conversion,
      conversion = _ref$conversion === undefined ? BodyConversion.JSON : _ref$conversion;

  if (conversion === BodyConversion.JSON) {
    return JSON.stringify(payload);
  } else if (conversion === BodyConversion.FORMDATA) {
    var fd = new FormData();
    for (var prop in payload) {
      fd.append(prop, payload[prop]);
    }return fd;
  }
});

var createParams = (function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$method = _ref.method,
      method = _ref$method === undefined ? 'GET' : _ref$method,
      _ref$token = _ref.token,
      token = _ref$token === undefined ? '' : _ref$token,
      _ref$payload = _ref.payload,
      payload = _ref$payload === undefined ? {} : _ref$payload,
      _ref$conversion = _ref.conversion,
      conversion = _ref$conversion === undefined ? BodyConversion.JSON : _ref$conversion;

  var headers = createHeaders(token);

  var params = { method: method, headers: headers };
  if (payload) params.body = createBody(payload, { conversion: conversion });

  return params;
});

var get = (function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      url = _ref.url,
      _ref$fields = _ref.fields,
      fields = _ref$fields === undefined ? [] : _ref$fields,
      _ref$token = _ref.token,
      token = _ref$token === undefined ? '' : _ref$token,
      _ref$log = _ref.log,
      log = _ref$log === undefined ? false : _ref$log;

  return function () {
    var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


    query = pick(query, fields);

    if (query.sort) {
      if (!validateSort(query.sort)) {
        throw new Error('sort should be \'asc\' or \'desc\'');
      }
    }

    var pUrl = void 0;

    if (query.id || query._id) {
      var _query = query,
          id = _query.id,
          _id = _query._id;

      pUrl = url + '/' + (id || _id);
    } else {
      pUrl = '' + url + createQueryString(query);
    }

    var params = createParams({ token: token });

    return fetch$1(pUrl, params, log);
  };
});

var excludeOptionals = (function (fields) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$indicator = _ref.indicator,
      indicator = _ref$indicator === undefined ? "?" : _ref$indicator;

  return fields.filter(function (f) {
    return !f.startsWith(indicator);
  });
});

var validatePayload = (function (payload, fields) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$indicator = _ref.indicator,
      indicator = _ref$indicator === undefined ? '?' : _ref$indicator;

  fields = excludeOptionals(fields, { indicator: indicator });

  fields.forEach(function (field) {
    if (!payload[field]) {
      throw new Error('payload must contain ' + JSON.stringify(fields));
    }
  });

  return true;
});

var ignoreOptionals = (function (fields) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$indicator = _ref.indicator,
      indicator = _ref$indicator === undefined ? "?" : _ref$indicator;

  return fields.map(function (f) {
    if (f.startsWith(indicator)) return f.substring(1, f.length);
    return f;
  });
});

var insert = (function (_ref) {
  var url = _ref.url,
      _ref$fields = _ref.fields,
      fields = _ref$fields === undefined ? [] : _ref$fields,
      _ref$token = _ref.token,
      token = _ref$token === undefined ? '' : _ref$token,
      _ref$log = _ref.log,
      log = _ref$log === undefined ? false : _ref$log,
      _ref$conversion = _ref.conversion,
      conversion = _ref$conversion === undefined ? BodyConversion.JSON : _ref$conversion,
      _ref$indicator = _ref.indicator,
      indicator = _ref$indicator === undefined ? '?' : _ref$indicator;


  return function () {
    var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


    payload = pick(payload, ignoreOptionals(fields, { indicator: indicator }));

    if (!validatePayload(payload, fields, { indicator: indicator })) {
      throw new Error('payload must contain ' + JSON.stringify(fields));
    }

    var params = createParams({
      method: 'POST',
      token: token,
      payload: payload,
      conversion: conversion
    });

    return fetch$1(url, params, log);
  };
});

var remove = (function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      url = _ref.url,
      _ref$token = _ref.token,
      token = _ref$token === undefined ? '' : _ref$token,
      _ref$log = _ref.log,
      log = _ref$log === undefined ? false : _ref$log;

  return function (id) {
    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref2$hard = _ref2.hard,
        hard = _ref2$hard === undefined ? false : _ref2$hard;

    if (!id) throw new Error('please provide an id');

    var pUrl = url + '/' + id;

    var payload = hard ? { hard: true } : {};

    var params = createParams({
      method: 'DELETE',
      token: token,
      payload: payload
    });

    return fetch$1(pUrl, params, log);
  };
});

var isFullUpdate = (function (payload, fields, _ref) {
  var indicator = _ref.indicator;


  fields = ignoreOptionals(fields, { indicator: indicator });

  if (Object.keys(payload).length !== Object.keys(fields).length) return false;

  fields.forEach(function (field) {
    if (!payload[field]) return false;
  });

  return true;
});

var update = (function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      url = _ref.url,
      _ref$fields = _ref.fields,
      fields = _ref$fields === undefined ? [] : _ref$fields,
      _ref$token = _ref.token,
      token = _ref$token === undefined ? '' : _ref$token,
      _ref$log = _ref.log,
      log = _ref$log === undefined ? false : _ref$log,
      _ref$conversion = _ref.conversion,
      conversion = _ref$conversion === undefined ? BodyConversion.JSON : _ref$conversion,
      _ref$indicator = _ref.indicator,
      indicator = _ref$indicator === undefined ? '?' : _ref$indicator;

  return function () {
    var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _payload = payload,
        id = _payload.id,
        _id = _payload._id;


    if (!id && !_id) throw new Error('please provide an id or _id field');

    payload = pick(payload, ignoreOptionals(fields, { indicator: indicator }));

    var method = isFullUpdate(payload, fields, { indicator: indicator }) ? 'PUT' : 'PATCH';

    var params = createParams({
      method: method,
      token: token,
      payload: payload,
      conversion: conversion
    });

    return fetch$1(url, params, log);
  };
});

var isPlainObject = (function (obj) {
  return typeof obj === "object" && !Array.isArray(obj) && obj !== null;
});

var parseFields = (function (fields) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$indicator = _ref.indicator,
      indicator = _ref$indicator === undefined ? '?' : _ref$indicator;

  var query = [];
  var payload = [];

  var _page = ['per_page', 'page'];
  var _id = ['id', '_id'];
  var _sort = ['sort', 'sort_by'];

  if (Array.isArray(fields)) {
    query = fields;
    payload = fields;
  } else if (isPlainObject(fields)) {
    query = fields.query || [], payload = fields.payload || [];
  } else {
    throw new Error('fields must be an Object or an array');
  }

  return {
    query: ignoreOptionals(query, { indicator: indicator }),
    payload: payload,
    _page: _page,
    _id: _id,
    _sort: _sort
  };
});

var index = (function (route) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      token = _ref.token,
      base = _ref.base,
      _ref$log = _ref.log,
      log = _ref$log === undefined ? false : _ref$log,
      fields = _ref.fields,
      _ref$conversion = _ref.conversion,
      conversion = _ref$conversion === undefined ? BodyConversion.JSON : _ref$conversion,
      _ref$indicator = _ref.indicator,
      indicator = _ref$indicator === undefined ? '?' : _ref$indicator;

  if (!base) throw new Error('please set a base path (absolute URL)');
  if (!route) throw new Error('please provide a route (cfr. users, feedback,...)');

  fields = parseFields(fields);

  var url = base + '/' + route;

  return {

    get: get({
      url: url,
      fields: [].concat(fields.query, fields._page, fields._id, fields._sort),
      token: token,
      log: log
    }),

    insert: insert({
      url: url,
      fields: fields.payload,
      token: token,
      log: log,
      conversion: conversion,
      indicator: indicator
    }),

    remove: remove({
      url: url,
      token: token,
      log: log
    }),

    update: update({
      url: url,
      fields: fields.payload,
      token: token,
      log: log,
      conversion: conversion,
      indicator: indicator
    })

  };
});

return index;

})));
