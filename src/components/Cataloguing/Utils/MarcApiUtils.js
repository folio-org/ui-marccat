/* eslint-disable no-use-before-define */
import React from 'react';
import { union, sortBy, first, includes } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { Callout } from '@folio/stripes/components';
import {
  RECORD_FIELD_STATUS as STATUS,
  SUBFIELD_DELIMITER,
  TAG_NOT_REPEATABLE,
  TAG_MANDATORY
} from './MarcConstant';
import { EMPTY_STRING, EMPTY_SPACED_STRING } from '../../../shared/Constants';

export const dedupe = (o) => Object.values(o.reduce((acc, cur) => Object.assign(acc, { [cur.code]: cur }), {}));
export const validate = t => includes(TAG_NOT_REPEATABLE, t.code);

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
  const dedupeObj = dedupe(obj);
  return dedupeObj.filter(f => f.fixedField !== undefined || f.fixedField).filter(f => f.code !== '008');
};

/**
 * @description
 *
 * @param {*} obj
 */
export const filterMandatoryFields = (obj) => {
  const dedupeObj = dedupe(obj);
  return dedupeObj.filter(f => includes(TAG_MANDATORY, f.code));
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
 * @param {*} message
 * @param {*} type
 */
export const showValidationMessage = (callout: React.RefObject<Callout>, message: string, type?: string) => {
  callout.current.sendCallout({
    type: type || 'success',
    message: (
      <span>
        <FormattedMessage id={message} />
      </span>
    )
  });
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
      headerTypeCode: 0,
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
      ind1: tag.ind1,
      ind2: tag.ind2,
      headerTypeCode: 0,
      displayValue: tag.displayValue,
      subfields: [],
      sequenceNumber: 0,
      skipInFiling: 0
    },
    added: true
  };
};

export const getEmptyTag007 = (): Object => { // Book
  return {
    categoryCode: 1,
    headerTypeCode: 45,
    code: '007',
    displayValue: '',
    sequenceNumber: 0,
  };
};

export const getEmptyTag008 = (tag: Object): Object => { // Book
  return {
    'categoryCode': tag.categoryCode || 1,
    'headerTypeCode':tag.headerTypeCode || 31,
    'code': '008',
    'displayValue': EMPTY_STRING,
    'dateEnteredOnFile': tag.dateEnteredOnFile || EMPTY_SPACED_STRING,
    'dateTypeCode': tag.dateTypeCode || 's',
    'dateFirstPublication': tag.dateFirstPublication || EMPTY_STRING.padStart(4),
    'dateLastPublication': tag.dateLastPublication || EMPTY_STRING.padStart(4),
    'placeOfPublication': tag.placeOfPublication || EMPTY_SPACED_STRING,
    'bookIllustrationCode1': tag.bookIllustrationCode1 || EMPTY_SPACED_STRING,
    'bookIllustrationCode2': tag.bookIllustrationCode2 || EMPTY_SPACED_STRING,
    'bookIllustrationCode3': tag.bookIllustrationCode3 || EMPTY_SPACED_STRING,
    'bookIllustrationCode4': tag.bookIllustrationCode4 || EMPTY_SPACED_STRING,
    'targetAudienceCode': tag.targetAudienceCode || EMPTY_SPACED_STRING,
    'formOfItemCode': tag.formOfItemCode || EMPTY_SPACED_STRING,
    'natureOfContent1':tag.natureOfContent1 || EMPTY_SPACED_STRING,
    'natureOfContent2': tag.natureOfContent2 || EMPTY_SPACED_STRING,
    'natureOfContent3': tag.natureOfContent3 || EMPTY_SPACED_STRING,
    'natureOfContent4': tag.natureOfContent4 || EMPTY_SPACED_STRING,
    'governmentPublicationCode': tag.governmentPublicationCode || 'u',
    'conferencePublicationCode': tag.conferencePublicationCode || '0',
    'bookFestschrift': tag.bookFestschrift || '1',
    'bookIndexAvailabilityCode': tag.bookIndexAvailabilityCode || '1',
    'bookLiteraryFormTypeCode': tag.bookLiteraryFormTypeCode || 'u',
    'bookBiographyCode': tag.bookBiographyCode || EMPTY_SPACED_STRING,
    'languageCode': tag.languageCode || 'ita',
    'recordModifiedCode': tag.recordModifiedCode || EMPTY_SPACED_STRING,
    'recordCataloguingSourceCode':  tag.recordCataloguingSourceCode || 'r',
    'sequenceNumber': 0,
  };
};
