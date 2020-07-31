import { Factory } from 'miragejs';
import faker from 'faker';

faker.seed(1);

export default Factory.extend({
	"recordView":1,
	"countDoc":0,
	"queryForAssociatedDoc":null,
	"tagHighlighted":"005, 008, 013, 020, 040, 082, 100, 245, 260, 300, 490, 700",
	"recordId":(i) => i + 22,
	"data":{
			"leader":"00000nam a22000007i 4500",
			"fields":[
				{
						"001":(i) => "0000000000" + (i + 22)
				},
				{
						"005":"20191120075604.0"
				},
				{
						"008":"191115s2001    it a          000 0 ita d"
				},
				{
						"013":{
							"subfields":[
									{
										"a":"it 51135400 "
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
										"a":"9788889084151"
									},
									{
										"c":"21.00 EUR"
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
										"a":faker.fake("{{name.lastName}}, {{name.firstName}}.")
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
										"a":faker.lorem.sentence()
									}
							],
							"ind1":"1",
							"ind2":"0"
						}
				},
				{
						"260":{
							"subfields":[
									{
										"a":"[S.l.] :"
									},
									{
										"b":faker.fake(" {{name.firstName}} {{name.lastName}},")
									},
									{
										"c":"2001."
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
										"a":"236 p. :"
									},
									{
										"b":"ill."
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
										"a":faker.lorem.sentence()
									}
							],
							"ind1":"0",
							"ind2":" "
						}
				},
				{
						"700":{
							"subfields":[
									{
										"a":faker.fake("{{name.lastName}}, {{name.firstName}}.")
									}
							],
							"ind1":"1",
							"ind2":" "
						}
				}
			]
	}
});