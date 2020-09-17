import { Factory } from 'miragejs';

const NUM_OF_RESULTS = 4;

export default Factory.extend({
  searchingView: i => i + 1,
  displayQuery: 'TW "Bib test"',
  from: 1,
  to: 5,
  numFound: NUM_OF_RESULTS,
  docs: [],
  afterCreate(bibSearch, server) {
    const docs = [];
    server.createList('docbib', NUM_OF_RESULTS);
    for (let i = 0; i < NUM_OF_RESULTS; i++) {
      docs.push(server.schema.docbibs.all().models[i].attrs);
    }
    bibSearch.update({ docs });
  },
});
