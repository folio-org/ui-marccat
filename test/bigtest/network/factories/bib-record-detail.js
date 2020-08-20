import { Factory } from 'miragejs';

export default Factory.extend({
    "bibliographicRecord": {
        "id": 22,
        "canadianContentIndicator": "0",
        "verificationLevel": "2",
        "leader": {
            "code": "000",
            "value": "00000nam  2200000   4500"
        },
        "fields": [
            {
                "code": "001",
                "mandatory": true,
                "fieldStatus": "unchanged",
                "fixedField": {
                    "keyNumber": 0,
                    "categoryCode": 1,
                    "headerTypeCode": 39,
                    "code": "001",
                    "displayValue": "000000000022",
                    "sequenceNumber": 0,
                    "attributes": {}
                },
                "added": false
            },
            {
                "code": "005",
                "mandatory": false,
                "fieldStatus": "unchanged",
                "fixedField": {
                    "keyNumber": 0,
                    "categoryCode": 1,
                    "headerTypeCode": 41,
                    "code": "005",
                    "displayValue": "20200616161847.9",
                    "sequenceNumber": 0,
                    "attributes": {}
                },
                "added": false
            },
            {
                "code": "008",
                "mandatory": true,
                "fieldStatus": "unchanged",
                "fixedField": {
                    "keyNumber": 214,
                    "categoryCode": 1,
                    "headerTypeCode": 31,
                    "code": "008",
                    "displayValue": "200616s        enk           000 u eng r",
                    "sequenceNumber": 0,
                    "attributes": {}
                },
                "added": false
            },
            {
                "code": "040",
                "mandatory": true,
                "fieldStatus": "unchanged",
                "variableField": {
                    "keyNumber": 0,
                    "categoryCode": 1,
                    "headingTypeCode": "1",
                    "itemTypeCode": "-1",
                    "functionCode": "-1",
                    "ind1": " ",
                    "ind2": " ",
                    "code": "040",
                    "displayValue":"aItFiC",
                    "subfields": [],
                    "sequenceNumber": 0,
                    "skipInFiling": 0
                },
                "added": false
            },
            {
                "code": "100",
                "mandatory": false,
                "fieldStatus": "unchanged",
                "variableField": {
                    "keyNumber": 105,
                    "categoryCode": 2,
                    "headingTypeCode": "2",
                    "itemTypeCode": "3",
                    "functionCode": "2",
                    "ind1": "1",
                    "ind2": " ",
                    "code": "100",
                    "displayValue":"aDi Sabato",
                    "subfields": [],
                    "sequenceNumber": 0,
                    "skipInFiling": 0
                },
                "added": false
            },
            {
                "code": "245",
                "mandatory": false,
                "fieldStatus": "unchanged",
                "variableField": {
                    "keyNumber": 121,
                    "categoryCode": 3,
                    "headingTypeCode": "1",
                    "itemTypeCode": "3",
                    "functionCode": "-1",
                    "ind1": "1",
                    "ind2": "0",
                    "code": "245",
                    "displayValue":"aTest",
                    "subfields": [],
                    "sequenceNumber": 0,
                    "skipInFiling": 0
                },
                "added": false
            },
            {
                "code": "250",
                "mandatory": false,
                "fieldStatus": "unchanged",
                "variableField": {
                    "keyNumber": 555,
                    "categoryCode": 7,
                    "headingTypeCode": "19",
                    "itemTypeCode": "-1",
                    "functionCode": "-1",
                    "ind1": " ",
                    "ind2": " ",
                    "code": "250",
                    "displayValue":"aSeconda edizione",
                    "subfields": [],
                    "sequenceNumber": 0,
                    "skipInFiling": 0
                },
                "added": false
            },
            {
                "code": "264",
                "mandatory": false,
                "fieldStatus": "unchanged",
                "variableField": {
                    "keyNumber": 87,
                    "categoryCode": 7,
                    "headingTypeCode": "411",
                    "itemTypeCode": "-1",
                    "functionCode": "-1",
                    "ind1": " ",
                    "ind2": "1",
                    "code": "264",
                    "displayValue":"aGenova : ;aRoma :bDER,c2019.",
                    "subfields": [],
                    "sequenceNumber": 0,
                    "skipInFiling": 0
                },
                "added": false
            },
            {
                "code": "300",
                "mandatory": false,
                "fieldStatus": "unchanged",
                "variableField": {
                    "keyNumber": 556,
                    "categoryCode": 7,
                    "headingTypeCode": "35",
                    "itemTypeCode": "-1",
                    "functionCode": "-1",
                    "ind1": " ",
                    "ind2": " ",
                    "code": "300",
                    "displayValue":"a24 pagine",
                    "subfields": [],
                    "sequenceNumber": 0,
                    "skipInFiling": 0
                },
                "added": false
            },
            {
                "code": "500",
                "mandatory": false,
                "fieldStatus": "unchanged",
                "variableField": {
                    "keyNumber": 557,
                    "categoryCode": 7,
                    "headingTypeCode": "50",
                    "itemTypeCode": "-1",
                    "functionCode": "-1",
                    "ind1": " ",
                    "ind2": " ",
                    "code": "500",
                    "displayValue":"aTest tag nota",
                    "subfields": [],
                    "sequenceNumber": 0,
                    "skipInFiling": 0
                },
                "added": false
            }
        ],
        "recordView": 1
    },
    "recordTemplate": {
        "id": 1,
        "fields": [
            {
                "code": "001",
                "mandatory": true,
                "fieldStatus": "unchanged",
                "fixedField": {
                    "keyNumber": 0,
                    "categoryCode": 1,
                    "headerTypeCode": 39,
                    "code": "001",
                    "displayValue": "00000000256",
                    "sequenceNumber": 0,
                    "attributes": {}
                },
                "added": false
            },
            {
                "code": "005",
                "mandatory": true,
                "fieldStatus": "unchanged",
                "fixedField": {
                    "categoryCode": 1,
                    "description": "005 - Transaction Date/Time",
                    "headerTypeCode": 41,
                    "code": "005",
                    "displayValue": "20200616162107.",
                    "sequenceNumber": 0,
                    "attributes": {}
                },
                "added": false
            },
            {
                "code": "008",
                "mandatory": true,
                "fieldStatus": "changed",
                "fixedField": {
                    "keyNumber": 214,
                    "categoryCode": 1,
                    "headerTypeCode": 31,
                    "code": "008",
                    "displayValue": "200616s        enk           000 u eng r",
                    "dateEnteredOnFile": "200616",
                    "dateTypeCode": "s",
                    "dateFirstPublication": "    ",
                    "dateLastPublication": "    ",
                    "placeOfPublication": "enk",
                    "bookIllustrationCode1": " ",
                    "bookIllustrationCode2": " ",
                    "bookIllustrationCode3": " ",
                    "bookIllustrationCode4": " ",
                    "targetAudienceCode": " ",
                    "formOfItemCode": " ",
                    "natureOfContent1": " ",
                    "natureOfContent2": " ",
                    "natureOfContent3": " ",
                    "natureOfContent4": " ",
                    "governmentPublicationCode": " ",
                    "conferencePublicationCode": "0",
                    "bookFestschrift": "0",
                    "bookIndexAvailabilityCode": "0",
                    "bookLiteraryFormTypeCode": "u",
                    "bookBiographyCode": " ",
                    "languageCode": "eng",
                    "recordModifiedCode": " ",
                    "recordCataloguingSourceCode": "r",
                    "sequenceNumber": 0,
                    "attributes": {
                        "bookIllustrationCode2": " ",
                        "dateFirstPublication": "    ",
                        "bookIllustrationCode3": " ",
                        "formOfItemCode": " ",
                        "bookIllustrationCode4": " ",
                        "dateTypeCode": "s",
                        "governmentPublicationCode": " ",
                        "natureOfContent4": " ",
                        "conferencePublicationCode": "0",
                        "bookIllustrationCode1": " ",
                        "natureOfContent3": " ",
                        "natureOfContent2": " ",
                        "bookIndexAvailabilityCode": "0",
                        "natureOfContent1": " ",
                        "bookLiteraryFormTypeCode": "u",
                        "bookBiographyCode": " ",
                        "languageCode": "eng",
                        "dateEnteredOnFile": "200616",
                        "dateLastPublication": "    ",
                        "recordModifiedCode": " ",
                        "recordCataloguingSourceCode": "r",
                        "placeOfPublication": "enk",
                        "bookFestschrift": "0",
                        "targetAudienceCode": " "
                    }
                },
                "added": false
            },
            {
                "code": "040",
                "mandatory": true,
                "fieldStatus": "unchanged",
                "variableField": {
                    "keyNumber": 0,
                    "categoryCode": 1,
                    "headingTypeCode": "1",
                    "itemTypeCode": "-1",
                    "functionCode": "-1",
                    "ind1": " ",
                    "ind2": " ",
                    "code": "040",
                    "displayValue":"aItFiC",
                    "subfields": [],
                    "sequenceNumber": 0,
                    "skipInFiling": 0
                },
                "added": false
            }
        ]
    }
});
