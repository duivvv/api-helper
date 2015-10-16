'use strict';

export default data => {

  if(data.constructor.name.toLowerCase() !== 'formdata'){
    let fd = new FormData();
    for(let key in data){
      fd.append(key, data[key]);
    }
    return fd;
  }

  return data;

};
