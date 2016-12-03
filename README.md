# api-helper

🛠 Opinionated universal json api helper

[![NPM](https://img.shields.io/npm/v/api-helper.svg?style=flat-square)](https://www.npmjs.com/package/api-helper)
[![David](https://img.shields.io/david/duivvv/api-helper.svg?style=flat-square)](https://david-dm.org/duivvv/api-helper)
[![Travis](https://img.shields.io/travis/duivvv/api-helper/master.svg?style=flat-square)](https://travis-ci.org/duivvv/api-helper)
[![Gitmoji](https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square)](https://gitmoji.carloscuesta.me/)

### Installation

Install via yarn 

	yarn add api-helper -D

or npm

	npm i api-helper -D


If you don't use a package manager, you can [access `api-helper` via unpkg (CDN)](https://unpkg.com/api-helper/), download the source, or point your package manager to the url.

`api-helper` is compiled as a collection of [CommonJS](http://webpack.github.io/docs/commonjs.html) modules & [ES2015 modules](http://www.2ality.com/2014/09/es6-modules-final.html) for bundlers that support the `jsnext:main` or `module` field in package.json (Rollup, Webpack 2)

The `api-helper` package includes precompiled production and development [UMD](https://github.com/umdjs/umd) builds in the [`dist` folder](https://unpkg.com/api-helper/dist/). They can be used directly without a bundler and are thus compatible with many popular JavaScript module loaders and environments. You can drop a UMD build as a [`<script>` tag](https://unpkg.com/api-helper) on your page. The UMD builds make `api-helper` available as a `window.apiHelper` global variable.

This module was created using [generator-module-boilerplate](https://github.com/duivvv/generator-module-boilerplate).

### Usage

### setup

```js

import 'isomorphic-fetch'; // optional

import apiHelper from 'api-helper';

const users = apiHelper({
  route: `users`,
  base: `http://localhost:3000/api`,
  fields: ['username', 'email', 'password', '?isActive', '?scope']
});

// users.select(...)
// users.insert(...)
// users.remove(...)
// users.update(...)


```

### configuration

You can pass in extra options (➕ required, ➖ optional, ✏️ default)

➕ **base** ( String )
<br/> 📝 base path of API 
<br/> ❗️ needs to be an absolute path
<br/> 💡 `'http://localhost:3000/api'`

➕ **route** ( String )
<br/> 📝 name of the route (plural)
<br/> 💡 `'users' / 'feedback' / 'images'`

➕ **fields** ( Array )
<br/> 📝 required and optional fields 
<br/> ❗️ don't add generated fields (id, _id, created, updated,...)
<br/> ℹ️ prefixing with `?` indicates the field is an optional `insert` field
<br/> 💡 `['username', 'email', 'password', '?isActive', '?scope']`

➖ **log** ( boolean ) ` ✏️ false `
<br/> 📝 logs the requests via console.log

➖ **conversion** ( 'json' | 'formData' ) ` ✏️ 'json' `
<br/> 📝 body conversion method (insert, update)

➖ **token** ( String | function )
<br/> 📝 a function or a String that contains / returns a [JWT](https://jwt.io/) token 


### methods

All responses are parsed as json, all errors are catched and parsed as json


#### #select


```js

users.get()
  .then(d => console.log(d))
  
// GET > http://localhost:3000/api/users


```
you can pass an object (parsed as querystring)

**GET => http://localhost:3000/api/users?username=duivvv&isActive=true**

```js

users.get({username: 'duivvv', isActive: true})
  .then(d => console.log(d))

```

it ignores fields not present in `fields`

exceptions: 

- id or _id
- page
- per_page
- sort ( 'asc' | 'desc' )
- sort_by ( present in `fields` )

**GET =>  http://localhost:3000/api/users?username=duivvv**

```js

users.get({username: 'duivvv', 'random': 'blabla'})
  .then(d => console.log(d))
  
```

**GET =>  http://localhost:3000/api/users?scope=admin&sort=desc**


```js

users.get({scope: 'admin', sort: 'desc'})
  .then(d => console.log(d))

```

if you pass an `_id` or `id`, it will change the request url

**GET => http://localhost:3000/api/users/507f1f77bcf86cd799439011**


```js

users.get({_id: '507f1f77bcf86cd799439011'})
  .then(d => console.log(d))
  
```


#### #insert

throws an error if one of the required fields (not prefixed with `?`) is missing

**POST => http://localhost:3000/api/users/**

```js

users.insert({username: 'duivvv', email: 'test@test.com', password: 'secret'})
  .then(d => console.log(d)) 

```

#### #remove

pass the `id` or `_id` of the entity you want to remove

**DELETE => http://localhost:3000/api/users/507f1f77bcf86cd799439011**

```js

users.remove(507f1f77bcf86cd799439011)
  .then(d => console.log(d))

```

posibility to add an optional `{hard: true}` and catch it in your request body
<br/>(hard/soft deletion)

**DELETE => http://localhost:3000/api/users/507f1f77bcf86cd799439011**

```js

users.remove(507f1f77bcf86cd799439011, {hard: true})
  .then(d => console.log(d))

```


#### #update

**PATCH => http://localhost:3000/api/users**

```js

users.update({isActive: false, username: 'Geoffrey'})
  .then(d => console.log(d))
  
```

`api-helper` uses `fields` to determine if it's a PUT (full update) or a PATCH.

**PUT => http://localhost:3000/api/users**

```js

const new_user = {
  username: 'Geoffrey',
  scope: 'admin',
  isActive: false,
  email: 'test2@test.com',
  password: 'verysecret'
};

users.update(new_user)
  .then(d => console.log(d))
  
```


### Examples

see [`example`](example/script.js) folder or the [runkit](https://runkit.com/duivvv/api-helper) example

### License

MIT
