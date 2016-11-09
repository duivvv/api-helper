import get from './lib/methods/get';
import insert from './lib/methods/insert';
import remove from './lib/methods/remove';
import update from './lib/methods/update';

import parseFields from './lib/parse/parseFields';

import BodyConversion from './lib/const/BodyConversion';

export default (route, {
  token,
  base,
  log = false,
  fields,
  conversion = BodyConversion.JSON,
  indicator = `?`
} = {}) => {

  if (!base) throw new Error(`please set a base path (absolute URL)`);
  if (!route) throw new Error(`please provide a route (cfr. users, feedback,...)`);

  fields = parseFields(fields);

  const url = `${base}/${route}`;

  return {

    get: get({
      url,
      fields: [
        ...fields.query,
        ...fields._page,
        ...fields._id,
        ...fields._sort
      ],
      token,
      log
    }),

    insert: insert({
      url,
      fields: fields.payload,
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
      fields: fields.payload,
      token,
      log,
      conversion,
      indicator
    })

  };

};
