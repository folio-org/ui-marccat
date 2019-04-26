/* eslint-disable no-use-before-define */
import React from 'react';
import { union, sortBy, first, includes } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { Callout } from '@folio/stripes/components';
import {
  SUBFIELD_DELIMITER,
  TAG_NOT_REPEATABLE,
  TAG_MANDATORY,
} from './MarcConstant';
import { EMPTY_STRING } from '../../../shared/config/constants';

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
  return (obj)
    .filter(f => f.fixedField !== undefined || f.fixedField);
};

/**
 * @description
 *
 * @param {*} obj
 */
export const filterFixedFieldsUntil = (obj, cond) => {
  return (obj)
    .filter(f => f.fixedField !== undefined || f.fixedField)
    .filter(f => f.code < cond);
};


/**
 * @description
 *
 * @param {*} obj
 */
export const filterFixedFieldForSaveRecord = (obj) => {
  return obj.filter(f => f.fixedField !== undefined || f.fixedField);
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
export const filterVariableFields = (obj:Array<Object>) => {
  return obj
    .filter(f => (f.fixedField === undefined || !f.fixedField) || f.variableField || f.variableField !== undefined);
};

/**
 *
 * @param {*} message - a message validation to display
 * @param {*} type - a type of callout
 */
export const showValidationMessage = (callout: React.RefObject<Callout>, message: string, type: string) => {
  callout.current.sendCallout({
    type: (type) || 'success',
    message: (
      <span>
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
