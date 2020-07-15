import { Factory } from 'miragejs';
import faker from 'faker';

export default Factory.extend({
	searchingView: (i) => i + 1,
	displayQuery: "TW \"test\"",
	from: 1,
	to: 10,
	numFound: 9,
	docs:[ {
		leader:"00000nam a22000007i 4500",
		fields:[
			{
					"001":"000000000035"
			},
			{
					"005":"20180116203446.0"
			},
			{
					"008":"180116s2017    it a          000 0 ita d"
			},
			{
					"013":{
						"subfields":[
								{
									"a":"it 50978793"
								}
						],
						"ind1":" ",
						"ind2":" "
					}
			},
			{
					"020":{
						"subfields":[
								{
									"a":"9788862761611"
								},
								{
									"c":"16.00 EUR"
								}
						],
						"ind1":" ",
						"ind2":" "
					}
			},
			{
					"040":{
						"subfields":[
								{
									"a":"ItFiC"
								},
								{
									"b":"eng"
								},
								{
									"c":"ItFiC"
								}
						],
						"ind1":" ",
						"ind2":" "
					}
			},
			{
					"082":{
						"subfields":[
								{
									"a":"790"
								},
								{
									"2":"14"
								}
						],
						"ind1":"1",
						"ind2":"4"
					}
			},
			{
					"100":{
						"subfields":[
								{
									"a":"Mongini, Giovanni."
								}
						],
						"ind1":"1",
						"ind2":" "
					}
			},
			{
					"245":{
						"subfields":[
								{
									"a":"La fantascienza su Internet. Vol. 1: A-K."
								}
						],
						"ind1":"1",
						"ind2":"3"
					}
			},
			{
					"260":{
						"subfields":[
								{
									"a":"[S.l.] :"
								},
								{
									"b":"Edizioni della Vigna,"
								},
								{
									"c":"2017."
								}
						],
						"ind1":" ",
						"ind2":" "
					}
			},
			{
					"300":{
						"subfields":[
								{
									"a":"350 p. :"
								},
								{
									"b":"ill., br."
								}
						],
						"ind1":" ",
						"ind2":" "
					}
			},
			{
					"490":{
						"subfields":[
								{
									"a":"Assaggi"
								}
						],
						"ind1":"0",
						"ind2":" "
					}
			},
			{
					"520":{
						"subfields":[
								{
									"a":"Da alcuni anni la possibilità "
								}
						],
						"ind1":" ",
						"ind2":" "
					}
			},
			{
					"520":{
						"subfields":[
								{
									"a":"1."
								}
						],
						"ind1":" ",
						"ind2":" "
					}
			},
			{
					"520":{
						"subfields":[
								{
									"a":"A-K."
								}
						],
						"ind1":" ",
						"ind2":" "
					}
			},
			{
					"700":{
						"subfields":[
								{
									"a":"Mongini, C."
								}
						],
						"ind1":"1",
						"ind2":" "
					}
			},
			{
					"700":{
						"subfields":[
								{
									"a":"Menci, Manuela."
								}
						],
						"ind1":"1",
						"ind2":" "
					}
			}
		]
	}]
});
