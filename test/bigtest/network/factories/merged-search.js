import { Factory } from 'miragejs';

const NUM_OF_RESULTS = 10;

export default Factory.extend({
	searchingView: (i) => i + 1,
	displayQuery: "TW \"test\"",
	from: 1,
	to: 10,
	numFound: NUM_OF_RESULTS,
	docs:[],
	afterCreate(mergedSearch, server) {
		const docs = [];
		server.createList('doc', NUM_OF_RESULTS);
		for (let i = 0; i < NUM_OF_RESULTS; i++) {
			docs.push(server.schema.docs.all().models[i].attrs );
		}
		mergedSearch.update({ docs });
	}
});
