// @flow

import fetch from '../fetch';

import createParams from '../params/createParams';

type options = {
  url: string,
  token: string | () => string,
  log: boolean
};

export default ({
  url,
  token,
  log = false
}: options = {}): Function => {

  return (id: number, {hard = false}: {hard: boolean} = {}): Promise<Object> => {

    if (!id) throw new Error(`please provide an id`);

    const pUrl: string = `${url}/${id}`;

    const payload: Object = hard ? {hard: true} : {};

    const params: Object = createParams({
      method: `DELETE`,
      token,
      payload
    });

    return fetch(pUrl, params, log);

  };

};
