import { union, sortBy } from 'lodash';
import { head } from 'ramda';
import { FIXED_FIELD_TEMPLATE, RECORD_FIELD_STATUS } from './MarcUtils';

export const unionSortAndDedupe = (sortByProp, ...obj) => {
  union(obj[0], obj[1]);
  sortBy(obj[0], sortByProp);
  return Object.values(obj[0].reduce((acc, cur) => Object.assign(acc, { [`cur.${sortByProp}`]: cur }), {}));
};

export const filterFixedFields = (obj) => {
  const dedupe = Object.values(obj.reduce((acc, cur) => Object.assign(acc, { [cur.code]: cur }), {}));
  return dedupe.filter(f => f.code === '001' || f.code === '003' || f.code === '005');
};

export const filterVariableFields = (obj) => {
  return obj.filter(f => f.fixedField === undefined || !f.fixedField);
};

export const handleTagXXXHeaderTypeChange = (props, tag, headerTypeCode) => {
  const { dispatch, change, record, leaderValue } = props;
  dispatch({ type: tag.action, leader: leaderValue, code: tag.code, typeCode: headerTypeCode });
  record.fields.push(FIXED_FIELD_TEMPLATE(tag.code, headerTypeCode, tag.default));
  head(record.fields.filter(f => f.code === tag.code)).fieldStatus = RECORD_FIELD_STATUS.NEW;
  dispatch(change(tag.name, headerTypeCode));
};
