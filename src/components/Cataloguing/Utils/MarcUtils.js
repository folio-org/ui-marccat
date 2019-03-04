/* eslint-disable consistent-return */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-bitwise */
/* eslint-disable one-var */
import { range, union } from 'lodash';
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

/*
 * Create array with all tags code in a range
 * for instance tag from 300 to 399: range(300, 399, 1);
 */
export const TAG_1XX = range(100, 200, 1);
export const TAG_2XX = range(200, 300, 1);
export const TAG_3XX = range(300, 400, 1);
export const TAG_4XX = range(400, 500, 1);
export const TAG_5XX = range(500, 600, 1);
export const TAG_6XX = range(600, 700, 1);
export const TAG_7XX = range(700, 800, 1);
export const TAG_8XX = range(800, 900, 1);
export const TAG_9XX = range(900, 1000, 1);

export const TAG_WIDH_CAT_7 = [
  '018', '033', '034', '037', '250', '254', '255', '256', '257',
  '258', '260', '261', '262', '264', '265', '270', '300', '306', '307', '308', '310',
  '315', '321', '336', '337', '338', '340', '342', '343', '344', '345', '346', '347',
  '348', '350', '351', '352', '355', '357', '359', '362', '363', '365', '366', '370',
  '377', '380', '381', '382', '383', '384', '385', '386', '388', '490', '500', '501',
  '502', '503', '504', '505', '506', '507', '508', '510', '511', '512', '513', '514',
  '515', '516', '517', '518', '520', '521', '522', '523', '524', '525', '526', '527',
  '530', '533', '534', '535', '536', '537', '538', '540', '541', '542', '544', '545',
  '546', '547', '550', '552', '555', '556', '561', '562', '563', '565', '567', '570',
  '580', '581', '583', '584', '585', '586', '588', '590', '591', '592', '593', '594',
  '595', '596', '597', '598', '599', '751', '752', '753', '754', '882', '883', '856',
  '886', '887'];

export const TAG_WIDH_CAT_8 = [
  '760', '762', '765', '767', '770', '772', '773', '774', '775',
  '776', '777', '780', '785', '786', '787', '791', '792'];

export const TAG_WITH_NO_HEADING_ASSOCIATED = union(TAG_WIDH_CAT_7, TAG_WIDH_CAT_8);

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
export const VARIABLE_EMPTY_TEMPLATE = (tag) => {
  return {
    'code': tag.code,
    'mandatory': false,
    'variableField': {
      'keyNumebr': 0,
      'code': tag.code,
      'displayValue': tag.displayValue,
      'sequenceNumber': 0
    },
    'added': true
  };
};

export const RECORD_ACTION = {
  CREATION_MODE: 'new',
  EDIT_MODE: 'edit'
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

export const first = (arr, n) => {
  if (arr === null) { return; }
  if (n == null) { return arr[0]; }
  if (n < 0) { return []; }
  return arr.slice(0, n);
};

export const deduplicate = (obj, prop) => {
  return Object.values(obj.reduce((acc, cur) => Object.assign(acc, { [`${prop}`]: cur }), {}));
};
