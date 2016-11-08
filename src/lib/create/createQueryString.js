export default (query = {}) => {

  const nProps = Object.keys(query).length;
  if (nProps === 0) return ``;

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
