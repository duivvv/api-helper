// @flow

import BodyConversion from '../const/BodyConversion';

type result = FormData | string;

export default (payload: Object, {
  conversion = BodyConversion.JSON
}: {conversion?: string} = {}): result => {

  if (conversion === BodyConversion.JSON) {
    return JSON.stringify(payload);
  } else if (conversion === BodyConversion.FORMDATA) {
    const fd = new FormData();
    for (const prop in payload) fd.append(prop, payload[prop]);
    return fd;
  }

  return ``;

};
