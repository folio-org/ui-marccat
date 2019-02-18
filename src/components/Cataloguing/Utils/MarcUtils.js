/* eslint-disable no-mixed-operators */
/* eslint-disable no-bitwise */
/* eslint-disable one-var */
import { SPACED_STRING } from '../../../utils/Constant';

export const RECORD_FIELD_STATUS = {
  NEW: 'new',
  UNCHANGED: 'unchanged',
  CHANGED: 'changed',
  DELETED: 'deleted'
};

export const TAGS = {
  _001: '001',
  _003: '003',
  _005: '005',
  _006: '006',
  _007: '007',
  _008: '008',
  _040: '040'
};

export const FIXED_FIELD_TEMPLATE = (code, typeCode) => {
  return {
    'code': code,
    'mandatory': true,
    'fixedField': {
      'categoryCode': 1,
      'headerTypeCode': typeCode,
      'code': code,
      'displayValue': '',
      'sequenceNumber': 0
    },
    'added': true
  };
};

export const RECORD_ACTION = {
  CREATION_MODE: 'new',
  EDIT_MODE: 'edit'
};

export const SUBFIELD_DELIMITER = '\u001fa';

export const VARIABLE_FIELD_EMPTY = {
  'added': true,
  'mandatory': false,
  'code': '',
  'fieldStatus': 'new',
  'variableField': {
    categoryCode: 1,
    code: '',
    displayValue: '',
    functionCode: '-1',
    headingTypeCode: '1',
    ind1: '0',
    ind2: '0',
    itemTypeCode: '-1',
    keyNumber: 0,
    sequenceNumber: 0,
    skipInFiling: 0,
    subfields: []
  },
};
/**
 *
 * @param {text} string Text to camelize
 * @return string Camelized text
 */
export const camelizify = (str) => {
  return str.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) => {
    return (p2) ? p2.toUpperCase() : p1.toLowerCase();
  });
};

/**
 *
 * @param {text} s Text to make first char uppercase
 * @param {*} string with first char uppercase
 */
export const firstCharUppercase = s => s.charAt(0).toUpperCase() + s.slice(1);

/**
 *
 * @param {text} string Text to camelize
 * @param {*} string Decamelized text
 */
export const decamelizify = (str, separator) => {
  // eslint-disable-next-line no-param-reassign
  separator = typeof separator === 'undefined' ? SPACED_STRING : separator;

  return firstCharUppercase(str)
    .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2');
};

export const uuid = () => {
  return 'xxxx-xxxx-xxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0,
      v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};
