import {omit} from 'lodash';

export default (query = {}, {exclude = []} = {}) => {

  query = omit(query, exclude);

  const nProps = Object.keys(query).length;
  if (nProps === 0) return ``;

  if (query.id || query._id) {
    const {id, _id} = query;
    return `/${id || _id}`;
  }

  let url = `?`;
  let i = 1;

  for (const prop in query) {
    const val = query[prop];
    url += `${prop}=${val}`;
    if (i < nProps) url += `&`;
    i ++;
  }

  return url;

};
