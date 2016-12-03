// @flow

import excludeOptionals from '../parse/excludeOptionals';

export default (payload: Object, fields: Array<string>, {indicator = `?`}: {indicator: string} = {}): boolean => {

  fields = excludeOptionals(fields, {indicator});

  fields.forEach((field: string): void => {
    if (!payload[field]) {
      throw new Error(`payload must contain ${JSON.stringify(fields)}`);
    }
  });

  return true;

};
