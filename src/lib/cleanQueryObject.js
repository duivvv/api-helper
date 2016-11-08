import {pick} from 'lodash';
export default (query, fields = []) => pick(query, fields);
