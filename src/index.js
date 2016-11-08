import get from './lib/methods/get';
import insert from './lib/methods/insert';
import remove from './lib/methods/remove';
import update from './lib/methods/update';

export default (route, {
  token,
  base,
  log = false,
  fields
} = {}) => {

  if (!base) throw new Error(`please set a base path (absolute URL)`);
  if (!route) throw new Error(`please provide a route (cfr. users, feedback,...)`);

  const url = `${base}/${route}`;

  return {

    get: get({
      url,
      fields: [
        ...fields.get,
        `sort`, `per_page`, `page`,
        `_id`, `id`, `sort_by`
      ],
      token,
      log
    }),

    insert: insert({
      url,
      fields: fields.insert,
      token,
      log
    }),

    remove: remove({
      url,
      token,
      log
    }),

    update: update({
      url,
      fields: fields.update,
      token,
      log
    })

  };

};
