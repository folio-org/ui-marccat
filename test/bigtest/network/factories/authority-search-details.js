import { Factory } from 'miragejs';

const NUM_OF_RESULTS = 2;

export default Factory.extend({
  searchingView: i => i + 1,
  displayQuery: 'TW "Auth test"',
  from: 1,
  to: 5,
  numFound: NUM_OF_RESULTS,
  docs: [],
  afterCreate(authoritySearchDetails, server) {
    const docs = [];
    server.createList('docauth', NUM_OF_RESULTS);
    for (let i = 0; i < NUM_OF_RESULTS; i++) {
      docs.push(server.schema.docauths.all().models[i].attrs);
    }
    authoritySearchDetails.update({ docs });
  },
});
