import fetch from '../fetch';

import createParams from '../create/createParams';

export default ({
  url,
  token = ``,
  log = false
} = {}) => {

  return (id, {hard = false} = {}) => {

    if (!id) throw new Error(`please provide an id`);

    const pUrl = `${url}/${id}`;

    const payload = hard ? {hard: true} : {};

    const params = createParams({
      method: `DELETE`,
      token,
      payload
    });

    return fetch(pUrl, params, log);

  };

};
