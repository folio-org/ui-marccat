import { Factory } from 'miragejs';

export default Factory.extend({
  "id":375,
  "canadianContentIndicator":"0",
  "verificationLevel":"2",
  "leader":{
    "code":"000",
    "value":"00000nam  2200000   4500"
  },
  "fields":[
    {
        "code":"001",
        "mandatory":true,
        "fieldStatus":"unchanged",
        "fixedField":{
          "keyNumber":0,
          "categoryCode":1,
          "headerTypeCode":39,
          "code":"001",
          "displayValue":"00000000375",
          "sequenceNumber":0,
          "attributes":{
          }
        },
        "added":false
    },
    {
        "code":"005",
        "mandatory":true,
        "fieldStatus":"unchanged",
        "fixedField":{
          "categoryCode":1,
          "description":"005 - Transaction Date/Time",
          "headerTypeCode":41,
          "code":"005",
          "displayValue":"20200708202030.",
          "sequenceNumber":0,
          "attributes":{
          }
        },
        "added":false
    },
    {
        "code":"008",
        "mandatory":true,
        "fieldStatus":"unchanged",
        "fixedField":{
          "keyNumber":285348,
          "categoryCode":1,
          "headerTypeCode":31,
          "code":"008",
          "displayValue":"200708s1971    it     e      000 0 ita c",
          "dateEnteredOnFile":"200708",
          "sequenceNumber":0,
          "attributes":{
              "dateEnteredOnFile":"200708"
          }
        },
        "added":false
    },
    {
        "code":"040",
        "mandatory":true,
        "fieldStatus":"unchanged",
        "variableField":{
          "keyNumber":0,
          "categoryCode":1,
          "headingTypeCode":"1",
          "itemTypeCode":"-1",
          "functionCode":"-1",
          "ind1":" ",
          "ind2":" ",
          "code":"040",
          "displayValue":"\u001FaItFiC",
          "subfields":[],
          "sequenceNumber":0,
          "skipInFiling":0
        },
        "added":false
    }
  ],
  "recordView":0
});
