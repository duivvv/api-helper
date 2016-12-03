// @flow

export default (query: Object = {}): string => {

  const nProps: number = Object.keys(query).length;
  if (nProps === 0) return ``;

  let url: string = `?`;
  let i: number = 1;

  for (const prop: string in query) {
    const val: string = query[prop];
    url += `${prop}=${val}`;
    if (i < nProps) url += `&`;
    i ++;
  }

  return url;

};
