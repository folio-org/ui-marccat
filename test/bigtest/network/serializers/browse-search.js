import ApplicationSerializer from './application';
import { isArray, assign } from 'lodash';

export default ApplicationSerializer.extend({
  serialize(...args) {
    const json = ApplicationSerializer.prototype.serialize.apply(this, args);
    if (isArray(json.browseSearches)) {
      return assign({}, { headings: json.browseSearches });
    }
    return json.browseSearches;
  },
});
