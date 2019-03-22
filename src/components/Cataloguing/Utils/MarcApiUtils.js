import { union, sortBy } from 'lodash';

export const unionSortAndDedupe = (sortByProp, ...obj) => {
  union(obj[0], obj[1]);
  sortBy(obj[0], sortByProp);
  return Object.values(obj[0].reduce((acc, cur) => Object.assign(acc, { [`cur.${sortByProp}`]: cur }), {}));
};

export const filterFixedFields = (obj) => {
  return obj.filter(f => f.code === '001' || f.code === '003' || f.code === '005' || f.code === '008' || f.code === '040');
};

export const filterVariableFields = (obj) => {
  return obj.filter(f => f.fixedField === undefined || !f.fixedField);
};
