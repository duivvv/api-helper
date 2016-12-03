// @flow

export default (fields: Array<string>, {indicator = `?`}: {indicator: string} = {}): Array<string> => {
  return fields.map((f: string): string => {
    if (f.startsWith(indicator)) return f.substring(1, f.length);
    return f;
  });
};
