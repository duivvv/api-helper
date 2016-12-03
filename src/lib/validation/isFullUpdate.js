// @flow

import ignoreOptionals from '../parse/ignoreOptionals';

export default (payload: Object, fields: Array<string>, {indicator}: {indicator: string}): boolean => {

  fields = ignoreOptionals(fields, {indicator});

  if (Object.keys(payload).length !== fields.length) return false;

  fields.forEach((field: string): boolean => {
    if (!payload[field]) return false;
    return true;
  });

  return true;

};
