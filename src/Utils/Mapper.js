import * as C from './Constant';

/**
 * concatenate all subfield text data of a tag
 * @param {*} tagNode
 */
const getTagDisplayValue = tagNode => {
  let result = '';
  tagNode.subfields.forEach(el => {
    result = result + ' ' + Object.values(el)[0];
  });
  return result;
};

const remapForResultList = i => {
  const result = [];
  i.forEach(el => {
    const record = {
      recordView: el.recordView,
      leader: el.data.leader
    };
    const { fields } = el.data;
    fields.forEach(field => {
      const tag = Object.keys(field)[0];
      record[tag] = (typeof field[tag] === 'string' || field[tag] instanceof String)
        ? field[tag]
        : getTagDisplayValue(field[tag]);
    });
    result.push(record);
  });
  return result;
};

const getFieldPosition = (controlField, pos1, pos2) => {
  return (!controlField || controlField.length < pos2) ? controlField : controlField.substring(pos1, pos2);
};

const getFormat = (leader) => {
  const pos = leader.substring(6, 7);

  switch (pos) {
  case 'a': return 'book';
  case 'p': return 'archival manuscript/mixed format';
  case 'g': return 'film or video';
  case 'e': return 'map';
  case 'f': return 'map (manuscript)';
  case 'j': return 'music recording';
  case 'd': return 'music score (manuscript)';
  case 'i': return 'nonmusic recording';
  case 's': return 'periodical or serial';
  case 'k': return 'photograph, print or drawing';
  case 't': return 'rare book or manuscript';
  case 'm': return 'software and e-resource';
  case 'r': return '3d object';
  default: return C.EMPTY_MESSAGE;
  }
};

export {
  remapForResultList,
  getFieldPosition,
  getFormat
};
