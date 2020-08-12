import { Factory } from 'miragejs';

const NUM_OF_RESULTS = 10;

export default Factory.extend({
	headings:[],
	afterCreate(browseSearch, server) {
		const headings = [];
		server.createList('heading', NUM_OF_RESULTS);
		for (let i = 0; i < NUM_OF_RESULTS; i++) {
			headings.push(server.schema.headings.all().models[i].attrs );
		}
		browseSearch.update({ headings });
	}
});
