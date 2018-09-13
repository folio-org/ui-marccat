import _ from 'lodash';
import { MARC } from './Constant';

export const getLeader = currentTemp => { // eslint-disable-line
  let leader = '';
  currentTemp.fixedFields.map(element => {
    if (element.code === '000') {
      return leader = element.fixedField.displayValue;
    }
    return '';
  });
  return leader;
};

export const findLabel = (array, value) => {
  let label = '';
  array.map(element => {
    if (element.value === value) {
      return label = element.label;
    }
    return '';
  });
  return label;
};

/*
* re-organize data from fixed-field-codes-group API to remove empty select and organize object in array
*/

export const organize = (input, defaultValues) => {
  const result = [];
  const keySet = Object.keys(input);
  keySet.map(key => {
    const element = input[key];
    if (element.length > 0) {
      return result.push({
        label: key,
        default: defaultValues[key],
        values: element
      });
    }
    return result;
  });
  return result;
};

/*
* to detect label that terminates with a character that is a number not equeal 1.
*/

export const fixedFieldLabelRender = (label) => {
  const lastCharacter = Number.parseInt(label.substr(label.length - 1), 10);
  return (label && Number.isInteger(lastCharacter) && lastCharacter !== 1) ? '' : label;
};

/*
* return a date in format for marc21 tag 008
*/

export const getDateNow = () => {
  const currentDate = new Date();
  let month = Number.parseInt(currentDate.getMonth(), 10) + 1;
  if (month.toString().length === 1) {
    month = '0' + month;
  }
  let day = currentDate.getDate();
  if (day.toString().length === 1) {
    day = '0' + day;
  }
  return currentDate.getFullYear() + month + day;
};


export const remapFieldTemplate = (mandatory, fixedField, variableFields) => {
  const fixed = [{}];
  const variable = [{}];
  mandatory.records.map(k => {
    return {
      ...k[MARC.FIXED_FIELD],
      ...k[MARC.VARIABLE_FIELD],
    };
  }).forEach((e) => {
    if (e.subfields === undefined) {
      fixed.push(e);
    } else {
      variable.push(e);
    }
  });
  fixed.push(fixedField);
  variable.push(variableFields);

  fixed.filter((k) => Object.keys(k).length !== 0);
  variable.filter((k) => Object.keys(k).length !== 0);

  return {
    fixed,
    variable
  };
};

export const normalizeData = (data = [{}]) => {
  return (_.isObject) ?
    data.filter((k) => Object.keys(k).length !== 0) :
    data.filter(k => k.length !== 0);
};
