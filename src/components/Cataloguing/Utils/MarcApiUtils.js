import { union, sortBy, first } from 'lodash';
import { FIXED_FIELD_TEMPLATE, RECORD_FIELD_STATUS, TAGS } from './MarcUtils';

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
  return dedepuObj.filter(f => f.fixedField !== undefined || f.fixedField);
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
 * @description
 *
 * @param {*} props
 * @param {*} tag
 * @param {*} headerTypeCode
 */
export const handleTagXXXHeaderTypeChange = (props, tag, headerTypeCode) => {
  const { dispatch, change, record, leaderValue } = props;
  dispatch({ type: tag.action, leader: leaderValue, code: tag.code, typeCode: headerTypeCode });
  record.fields.push(FIXED_FIELD_TEMPLATE(tag.code, headerTypeCode, tag.default));
  first(record.fields.filter(f => f.code === tag.code)).fieldStatus = RECORD_FIELD_STATUS.NEW;
  dispatch(change(tag.name, headerTypeCode));
};
