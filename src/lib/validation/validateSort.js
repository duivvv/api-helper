export default query => {

  const sort = query.sort.toLowerCase();

  if (sort !== `asc` && sort !== `desc`) {
    throw new Error(`sort should be asc or desc`);
  }

};
