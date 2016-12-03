// @flow

export default (obj: Object): boolean => (typeof obj === `object` && !Array.isArray(obj) && obj !== null);
