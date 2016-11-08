import fetch from '../fetch';

import createParams from '../create/createParams';

export default ({
  url,
  token,
  log
}) => {

  return id => {

    if (!id) throw new Error(`please provide an id`);

    const pUrl = `${url}/${id}`;

    const params = createParams({
      method: `DELETE`,
      token
    });

    return fetch(pUrl, params, log);

  };

};
