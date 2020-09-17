import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({

  serialize(...args) {
    const json = ApplicationSerializer.prototype.serialize.apply(this, args);

    /*json.bibSearches.unshift({
      'searchingView': -1,
      'displayQuery': 'NW "giannini"',
      'from': 1,
      'to': 2,
      'numFound': 1,
      'docs': [],
    });*/

    return json.bibSearches[0];
  }
});
