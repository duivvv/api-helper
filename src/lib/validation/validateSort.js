export default (sort: string): boolean => {

  sort = sort.toLowerCase();

  if (sort !== `asc` && sort !== `desc`) {
    return false;
  }

  return true;

};
