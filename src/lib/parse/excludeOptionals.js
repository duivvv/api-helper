// @flow

export default (fields: Array<string>, {indicator = `?`}: {indicator: string} = {}): Array<string> => (
  fields.filter((f: string): boolean => !f.startsWith(indicator))
);
