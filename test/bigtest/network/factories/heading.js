import { Factory } from 'miragejs';
import faker from 'faker';

faker.seed(1);

export default Factory.extend({
    
        "headingNumber": 13,
        "stringText": faker.lorem.sentence(),
        "countAuthorities": 0,
        "countDocuments": 2,
        "crossReferences": [],
        "countTitleNameDocuments": 0
   
});