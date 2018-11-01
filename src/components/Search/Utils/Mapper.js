import _ from 'lodash';
import * as C from '../../../utils/Constant';

/**
 * concatenate all subfield text data of a tag
 * @param {*} tagNode
 */
const getTagDisplayValue = tagNode => {
  let result = '';
  tagNode.subfields.forEach(el => {
    result += ' '.concat(Object.values(el)[0]);
  });
  return result;
};

const remapForAssociatedBibList = i => {
  const result = [];
  i.forEach(el => {
    const record = {
      countDoc: el.countDoc,
      queryForBibs: el.queryForAssociatedDoc,
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

const getTag245 = (data) => {
  let tag245 = '';
  data.map(item => {
    if (item.substring(0, 4).trim() === '245') {
      tag245 = item.substring(0, 4);
    }
    return tag245;
  });
  return tag245;
};

const getTitle245 = (bigStringArray) => {
  let titleTag245 = '';
  bigStringArray.map(item => {
    if (item.substring(0, 4).trim() === '245') {
      titleTag245 = item.substring(4);
    }
    return titleTag245;
  });
  return titleTag245;
};


const getFieldPosition = (controlField, pos1, pos2) => {
  return (!controlField || controlField.length < pos2) ? controlField : controlField.substring(pos1, pos2);
};

const remapFilters = (filterObject) => {
  const result = {};
  Object.keys(filterObject).forEach(element => {
    const category = element.split('.')[0];
    const optionCategory = element.split('.')[1];
    if (filterObject[element]) {
      if (!_.isArray(result[category]) || result[category].length < 1) {
        result[category] = [];
      }
      result[category].push({ [optionCategory]: filterObject[element] });
    }
  });
  return result;
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
  getFieldPosition,
  getFormat,
  getTag245,
  getTitle245,
  remapFilters,
  remapForAssociatedBibList
};
