/* eslint-disable no-use-before-define */
// @flow
import * as React from 'react';
import { union, sortBy, first, includes } from 'lodash';
import { change } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Callout } from '@folio/stripes/components';
import {
  SUBFIELD_DELIMITER,
  TAG_NOT_REPEATABLE,
  TAG_MANDATORY,
} from './MarcConstant';
import { EMPTY_STRING } from '../../../config/constants';

/**
 *
 * @param {Object} o the object passed as parameter to sort
 * @returns true if tha tag code passed
 */
export const sort = (o: Array<*>): Array<*> => o.sort((a, b) => a.code > b.code);
/**
 *
 * @param {string} o - the object to deduplicate
 * @returns the object passed as parameter without duplicate code
 */
export const dedupe = (o) => Object.values(o.reduce((acc, cur) => Object.assign(acc, { [cur.code]: cur }), {}));

/**
 *
 * @param {string} t - the tag to validate
 * @returns true if code of @param t is not repeatble
 */
export const validate = t => includes(TAG_NOT_REPEATABLE, t.code);

/**
 * @description
 *
 * @param {string} sortByProp
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
 * @param {Object} obj
 */
export const filterFixedFields = (obj) => {
  return (obj)
    .filter(f => f.fixedField !== undefined || f.fixedField);
};

/**
 * @description
 *
 * @param {Object} obj
 */
export const filterFixedFieldsUntil = (obj, cond) => {
  return (obj)
    .filter(f => f.fixedField !== undefined || f.fixedField)
    .filter(f => f.code < cond);
};


/**
 * @description
 *
 * @param {Object} obj
 */
export const filterFixedFieldForSaveRecord = (obj) => {
  return obj.filter(f => f.fixedField !== undefined || f.fixedField);
};

/**
 * @description
 *
 * @param {Object} obj
 */
export const filterMandatoryFields = (obj): string => {
  return dedupe(obj).filter(f => includes(TAG_MANDATORY, f.code));
};

/**
 * @description
 *
 * @param {Object} obj
 */
export const filterVariableFields = (obj: Array<Object>) => {
  return obj
    .filter(f => (f.fixedField === undefined || !f.fixedField) || f.variableField || f.variableField !== undefined);
};

/**
 * @param {React.RefObject<Callout>} callout - a message validation to display
 * @param {string} message - a message validation to display
 * @param {string} type - a type of callout
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

/**
 *
 * @param {*} displayValue
 */
export const changeValue = (field: String, displayValue: String, dispatch: Function): void => {
  dispatch(change(field, displayValue));
};

/**
 *
 * @param {*} s - an input string
 * @returns s - a string with all SUBFIELD_CHARACTER replaced with EMPTY_STRING
 */
export const replaceAllWithEmptyString = (s: string): string => ((s) ? s.replace(/\$[a-z]|:/g, EMPTY_STRING) : EMPTY_STRING);
