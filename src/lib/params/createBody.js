import BodyConversion from '../const/BodyConversion';

export default (payload, {
  conversion = BodyConversion.JSON
} = {}) => {

  if (conversion === BodyConversion.JSON) {
    return JSON.stringify(payload);
  } else if (conversion === BodyConversion.FORMDATA) {
    const fd = new FormData();
    for (const prop in payload) fd.append(prop, payload[prop]);
    return fd;
  }

};
