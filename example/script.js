const apiHelper = require(`../dist/`);

const token = () => {
  return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJzY29wZSI6InVzZXIiLCJpYXQiOjE0Nzg1Mjc1NDcsImV4cCI6MTQ3OTEzMjM0NywiYXVkIjoibW9uZ28xMDEtd2ViIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdCIsInN1YiI6IjU4MTM0OWUxMmMwNDc3NDQ2OTY5NGVmMyJ9.XmnpTbnlLs0PhNYTPrt4HxVqG8sMcPpD5y1SWGt9j94`;
};

const users = apiHelper(`users`, {
  token,
  base: `http://localhost:3000/api`,
  fields: {
    select: [`email`, `username`, `scope`]
  }
});

//users.get({id: `581349e12c04774469694ef3`})
//users.get()
users.get({scope: `user`})
  .then(d => console.log(d))
  .catch(e => console.log(e));
