import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({

  serialize(...args) {
    const json = ApplicationSerializer.prototype.serialize.apply(this, args);

    json.mergedSearches.unshift( {
      "searchingView":-1,
      "displayQuery":"TW \"test\"",
      "from":1,
      "to":1,
      "numFound":0,
      "docs":[
      ]
    });

    return json.mergedSearches;
  }
});
