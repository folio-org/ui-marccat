/* eslint-disable no-use-before-define */
import React from 'react';
import { union, sortBy, first, includes } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { Callout } from '@folio/stripes/components';
import {
  RECORD_FIELD_STATUS as STATUS,
  SUBFIELD_DELIMITER,
  TAG_NOT_REPEATABLE,
  TAG_MANDATORY,
  TAGS
} from './MarcConstant';
import { EMPTY_STRING, EMPTY_SPACED_STRING } from '../../../shared/Constants';

/**
 *
 * @param {*} o - the object to deduplicate
 * @returns the objcet passed as parameter without duplicate code
 */
export const dedupe = (o) => Object.values(o.reduce((acc, cur) => Object.assign(acc, { [cur.code]: cur }), {}));

/**
 *
 * @param {*} t - the tag to validate
 * @returns true if code of @param t is not repeatble
 */
export const validate = t => includes(TAG_NOT_REPEATABLE, t.code);

/**
 * @description
 *
 * @param {*} sortByProp
 * @param  {...any} obj
 */
export const unionSortAndDedupe = (sortByProp, ...obj) => {
  union(...obj);
  sortBy(first(obj), sortByProp);
  return dedupe(first(obj));
};

/**
 * @description
 *
 * @param {*} obj
 */
export const filterFixedFields = (obj) => {
  return dedupe(obj)
    .filter(f => f.fixedField !== undefined || f.fixedField)
    .filter(f => f.code !== TAGS._008);
};

/**
 * @description
 *
 * @param {*} obj
 */
export const filterMandatoryFields = (obj) => {
  return dedupe(obj).filter(f => includes(TAG_MANDATORY, f.code));
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
 * @param {*} message - a message validation to display
 * @param {*} type - a type of callout
 */
export const showValidationMessage = (callout: React.RefObject<Callout>, message: string, type: string, value: any) => {
  callout.current.sendCallout({
    type: (type) || 'success',
    message: (
      <span>
        {value &&
        <FormattedMessage id={message} values={{ value }} />}
        <FormattedMessage id={message} />
      </span>
    )
  });
};

/**
 *
 * @param {*} s - an input string
 * @returns s - appen SUBFIELD_DELIMITER to @param s
 */
export const addSeparator = (s: string): string => SUBFIELD_DELIMITER.concat(s);

/**
 *
 * @param {*} s - an input string
 * @returns s - a string with all SUBFIELD_CHARACTER replaced with SUBFIELD_DELIMITER
 */
export const replaceAll = (s: string): string => ((s) ? s.replace(RegExp(String.fromCharCode(31), 'g'), '$') : EMPTY_STRING);

/**
 *
 * @param {*} s - an input string
 * @returns s - a string with all SUBFIELD_DELIMITER replaced with SUBFIELD_CHARACTER
 */
export const replaceAllinverted = (s: string): string => ((s) ? s.replace(/\$/g, SUBFIELD_DELIMITER) : EMPTY_STRING);

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
export const getEmptyVariableField = (editMode: boolean, tag?: Object): Object => {
  return (!editMode) ? {
    code: tag.code || EMPTY_STRING,
    mandatory: false,
    fieldStatus: STATUS.NEW,
    variableField: {
      keyNumber: tag.keyNumber || 0,
      code: tag.code || EMPTY_STRING,
      ind1: tag.ind1 || EMPTY_SPACED_STRING,
      ind2: tag.ind2 || EMPTY_SPACED_STRING,
      headingNumber: tag.headingNumber || 0,
      displayValue: tag.displayValue || EMPTY_STRING,
      subfields: [],
      sequenceNumber: 0,
      skipInFiling: 0
    },
    added: true
  } : {
    code: tag.code,
    mandatory: false,
    fieldStatus: STATUS.CHANGED,
    variableField: {
      keyNumber: tag.variableField.keyNumber,
      categoryCode: tag.variableField.categoryCode,
      code: tag.code,
      ind1: tag.ind1 || EMPTY_SPACED_STRING,
      ind2: tag.ind2 || EMPTY_SPACED_STRING,
      headingNumber: tag.headingNumber || 0,
      displayValue: tag.displayValue,
      subfields: [],
      sequenceNumber: 0,
      skipInFiling: 0
    },
    added: true
  };
};
