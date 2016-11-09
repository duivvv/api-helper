export default sort => {

  sort = sort.toLowerCase();

  if (sort !== `asc` && sort !== `desc`) {
    return false;
  }

  return true;

};
