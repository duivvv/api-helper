const apiHelper = require(`../`);

describe(`throws appropriate errors`, () => {

  it(`missing base`, () => {

    expect(() => {

      apiHelper({
        route: `users`,
        fields: [`username`, `email`]
      });

    }).toThrowError(`base is required (ex. http://localhost:3000)`);

  });

  it(`base is not an absolute path`, () => {

    expect(() => {

      apiHelper({
        route: `users`,
        base: `//localhost:3000/api`,
        fields: [`username`, `email`]
      });

    }).toThrowError(`base must be an absolute path (ex. http://localhost:3000)`);

  });

  it(`missing route`, () => {

    expect(() => {

      apiHelper({
        base: `http://localhost:3000`,
        fields: [`username`, `email`]
      });

    }).toThrowError(`route is required (ex. 'users', 'feedback', 'images')`);

  });

  it(`missing fields`, () => {

    expect(() => {

      apiHelper({
        base: `http://localhost:3000`,
        route: `users`
      });

    }).toThrowError(`fields is required (ex. ['username', 'email', '?isActive'])`);

  });

  it(`wrong fields`, () => {

    expect(() => {

      apiHelper({
        base: `http://localhost:3000`,
        route: `users`,
        fields: true
      });

    }).toThrowError(`fields must be a String or an Array`);

  });

});
