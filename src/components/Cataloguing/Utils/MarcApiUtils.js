/* eslint-disable no-use-before-define */
import { union, sortBy, first } from 'lodash';
import {
  RECORD_FIELD_STATUS as STATUS,
  SUBFIELD_DELIMITER,
  SUBFIELD_CHARACTER
} from './MarcConstant';
import { EMPTY_STRING } from '../../../shared/Constants';

export const dedupe = (o) => Object.values(o.reduce((acc, cur) => Object.assign(acc, { [cur.code]: cur }), {}));

/**
 * @description
 *
 * @param {*} sortByProp
 * @param  {...any} obj
 */
export const unionSortAndDedupe = (sortByProp, ...obj) => {
  union(first(obj), obj[1]);
  sortBy(first(obj), sortByProp);
  return dedupe(first(obj));
};

/**
 * @description
 *
 * @param {*} obj
 */
export const filterFixedFields = (obj) => {
  const dedepuObj = dedupe(obj);
  return dedepuObj.filter(f => f.code !== '008' && (f.fixedField !== undefined || f.fixedField));
};

/**
 * @description
 *
 * @param {*} obj
 */
export const filterVariableFields = (obj) => {
  return obj.filter(f => f.fixedField === undefined || !f.fixedField);
};

/**
 *
 * @param {*} props
 * @param {*} tag
 * @param {*} headerTypeCode
 */
export const handleTagXXXHeaderTypeChange = (props, tag, headerTypeCode) => {
  const { dispatch, change, record, leaderValue } = props;
  dispatch({ type: tag.action, leader: leaderValue, code: tag.code, typeCode: headerTypeCode });
  record.fields.push(getFixedField(tag, headerTypeCode));
  first(record.fields.filter(f => f.code === tag.code)).fieldStatus = STATUS.NEW;
  dispatch(change(tag.name, headerTypeCode));
};

/**
 *
 * @param {*} s
 * @returns s - appen SUBFIELD_DELIMITER to @param s
 */
export const addSeparator = (s: string): string => SUBFIELD_DELIMITER.concat(s);

/**
 *
 * @param {*} s
 * @returns s - a string with all SUBFIELD_CHARACTER replaced with SUBFIELD_DELIMITER
 */
export const replaceAll = (s: string): string => ((s) ? s.replace(RegExp(String.fromCharCode(31), 'g'), '$') : EMPTY_STRING);

/**
 *
 * @param {*} s
 * @returns s - a string with all SUBFIELD_DELIMITER replaced with SUBFIELD_CHARACTER
 */
export const replaceAllinverted = (s: string): string => ((s) ? s.replace(SUBFIELD_CHARACTER, RegExp(String.fromCharCode(31), 'g')) : EMPTY_STRING);

/**
 *
 * @param {*} tag
 * @param {*} typeCode
 */
export const getFixedField = (tag: Object, typeCode): Object => {
  return {
    'code': tag.code,
    'mandatory': false,
    'fieldStatus': STATUS.NEW,
    'fixedField': {
      'categoryCode': 1,
      'headerTypeCode': typeCode,
      'code': tag.code,
      'displayValue': tag.default,
      'sequenceNumber': 0
    },
    'added': false
  };
};

/**
 *
 * @param {*} tag
 */
export const getEmptyVariableField = (tag?: Object): Object => {
  return {
    code: tag.code || EMPTY_STRING,
    mandatory: false,
    fieldStatus: STATUS.NEW,
    variableField: {
      keyNumber: tag.keyNumber || -1,
      code: tag.code || EMPTY_STRING,
      ind1: tag.ind1 || EMPTY_STRING,
      ind2: tag.ind2 || EMPTY_STRING,
      headerTypeCode: 0,
      displayValue: tag.displayValue || EMPTY_STRING,
      subfields: [],
      sequenceNumber: 0,
      skipInFiling: 0
    },
    added: true
  };
};
