import { Factory } from 'miragejs';

export default Factory.extend({
  searchingView: i => i + 1,
  displayQuery: 'TW \"a\"',
  from: 1,
  to: 1,
  numFound: 0,
  docs: []
});