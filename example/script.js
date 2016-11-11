require(`isomorphic-fetch`);
const apiHelper = require(`../cjs/`);

const token = () => `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJzY29wZSI6ImFkbWluIiwiaWF0IjoxNDc4NjI0NDM2LCJleHAiOjE0NzkyMjkyMzYsImF1ZCI6Im1vbmdvMTAxLXdlYiIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3QiLCJzdWIiOiI1ODEzNDllMTJjMDQ3NzQ0Njk2OTRlZjMifQ.8G1fd2KbyG_zOicPuvKbi5NeDWkT0R5cIacLpkJ2NBM`;

const users = apiHelper(`users`, {

  token,
  base: `http://localhost:3000/api`,
  log: true,

  fields: [`email`, `username`, `password`, `?isActive`, `?scope`]

});

//users.get({email: `test@test.com`})
users.get()
//users.insert({username: `test5`, email: `test5@test.be`, password: `okkkk`, isActive: false, scope: `ADMIN`})
//users.get({sort: `desc`})
//users.remove(22, {hard: true})
//users.update({id: `581349e12c04774469694ef3`, username: `testen`, email: `test@test.com`, password: `ok`, scope: `ADMIN`, isActive: true})
  .then(d => console.log(d))
  .catch(e => console.log(`error`, e));
