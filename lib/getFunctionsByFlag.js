'use strict';

export default flag => {

  flag = flag.toLowerCase();

  if(flag === 'post'){
    return ['insert'];
  }else if(flag === 'patch'){
    return ['update'];
  }else if(flag === 'get'){
    return ['select'];
  }else if(flag === 'delete'){
    return ['remove'];
  }

};
