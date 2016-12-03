// @flow

import select from './lib/methods/select';
import insert from './lib/methods/insert';
import remove from './lib/methods/remove';
import update from './lib/methods/update';

import parseFields from './lib/parse/parseFields';

import BodyConversion from './lib/const/BodyConversion';

type options = {
  route: string,
  token: string | Function,
  base: string,
  fields: Array<string>,
  log: boolean,
  conversion: string
};

type result = {
  remove: Function,
  update: Function,
  insert: Function,
  select: Function
}

export default ({
  route,
  token,
  base,
  log = false,
  fields,
  conversion = BodyConversion.JSON
}: options = {}): result => {

  const indicator: string = `?`;

  if (!base) {
    throw new Error(`base is required (ex. http://localhost:3000)`);
  }

  if (!base.startsWith(`http://`) && !base.startsWith(`https://`)) {
    throw new Error(`base must be an absolute path (ex. http://localhost:3000)`);
  }

  if (!route) {
    throw new Error(`route is required (ex. 'users', 'feedback', 'images')`);
  }

  if (fields === undefined) {
    throw new Error(`fields is required (ex. ['username', 'email', '?isActive'])`);
  }

  const fieldsObj: {
    query: Array<string>,
    _page: Array<string>,
    _id: Array<string>,
    _sort: Array<string>,
    payload: Array<string>
  } = parseFields(fields);

  const url: string = `${base}/${route}`;

  return {

    select: select({
      url,
      fields: [
        ...fieldsObj.query,
        ...fieldsObj._page,
        ...fieldsObj._id,
        ...fieldsObj._sort
      ],
      token,
      log
    }),

    insert: insert({
      url,
      fields: fieldsObj.payload,
      token,
      log,
      conversion,
      indicator
    }),

    remove: remove({
      url,
      token,
      log
    }),

    update: update({
      url,
      fields: fieldsObj.payload,
      token,
      log,
      conversion,
      indicator
    })

  };

};
