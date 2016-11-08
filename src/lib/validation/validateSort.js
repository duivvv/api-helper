export default sort => {

  sort = sort.toLowerCase();

  if (sort !== `asc` && sort !== `desc`) {
    throw new Error(`sort should be 'asc' or 'desc'`);
  }

};
