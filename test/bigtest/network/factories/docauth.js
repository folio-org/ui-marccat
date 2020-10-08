import { Factory } from 'miragejs';
import faker from 'faker';

faker.seed(1);

export default Factory.extend({
  recordView: -1,
  countDoc: 3,
  queryForAssociatedDoc: 'NK 1',
  tagHighlighted: '100',
  recordId: i => i + 32,
  data: {
    leader: '00215nz   2200097   4500',
    fields: [
      {
        '001': i => '0000000000' + (i + 32),
      },
      {
        '005': '20200220080126.0',
      },
      {
        '008': '200729 n annnnabbn n2ann und u',
      },
      {
        '040': {
          subfields: [
            {
              a: 'ItFiC',
            },
            {
              b: 'eng',
            },
          ],
          ind1: ' ',
          ind2: ' ',
        },
      },
      {
        '100': {
          subfields: [
            {
              a: 'Giannini, Luca.',
            },
          ],
          ind1: '1',
          ind2: ' ',
        },
      },
    ],
  },
});
