import * as C from './Constant';

const marcSeparator = s => s.replace(
  C.MARC.CHARACTER_SEPARATOR,
  C.MARC.CHARACTER_DOLLAR,
);

const remapMultiArray = multiArray => {
  const obj = [];
  multiArray.forEach((el, index) => {
    if (multiArray[index][C.MARC.FIXED_FIELD] !== undefined) {
      obj.push(multiArray[index][C.MARC.FIXED_FIELD]);
    } else if (
      multiArray[index][C.MARC.VARIABLE_FIELD] !== undefined
    ) {
      multiArray[index][ // eslint-disable-line
        C.MARC.VARIABLE_FIELD
      ].displayValue = marcSeparator(multiArray[index][C.MARC.VARIABLE_FIELD].displayValue);
      obj.push(multiArray[index][C.MARC.VARIABLE_FIELD]);
    }
  });
  return obj;
};

export const remapSubfield = (data) => {
  const obj = [{}];
  const fieldType = data[C.MARC.VARIABLE_FIELD] ? C.MARC.VARIABLE_FIELD : C.MARC.FIXED_FIELD;
  if (fieldType === C.MARC.FIXED_FIELD) return;
  data[fieldType].subfields.map(i => { // eslint-disable-line
    obj.push({
      value: i, label: i
    });
  });
  return obj; // eslint-disable-line
};

const remapTemplateView = json => {
  const obj = [];
  const arrayFixedFields = [];
  const arrayVariableFields = [];
  arrayFixedFields.push(...json.fixedFields);
  json.variableFields.forEach((el, index) => {
    json.variableFields[index].displayValue = marcSeparator(json.variableFields[index].displayValue);
  });
  arrayVariableFields.push(...json.variableFields);
  obj.push(...arrayFixedFields, ...arrayVariableFields);
  return obj;
};
/**
 * map mandatory json in form of template to have a base structure to save
 * @param {} multiArray
 */
const remapForTemplateMandatory = multiArray => {
  const fixedFields = [];
  const variableFields = [];
  multiArray.forEach((el, index) => {
    if (multiArray[index][C.MARC.FIXED_FIELD] !== undefined) {
      fixedFields.push(multiArray[index][C.MARC.FIXED_FIELD]);
    } else if (
      multiArray[index][C.MARC.VARIABLE_FIELD] !== undefined
    ) {
      variableFields.push(multiArray[index][C.MARC.VARIABLE_FIELD]);
    }
  });
  const result = {
    fixedFields,
    variableFields
  };
  return result;
};

/**
 * concatenate all subfield text data of a tag
 * @param {*} tagNode
 */
const getTagDisplayValue = tagNode => {
  let result = '';
  tagNode.subfields.forEach(el => {
    result = result + ' ' + Object.values(el)[0];
  });
  return result;
};

const remapForResultList = jsonInput => {
  const result = [];
  jsonInput.forEach(el => {
    const record = {};
    record.recordView = el.recordView;
    record.leader = el.data.leader;
    const { fields } = el.data;
    fields.forEach(field => {
      const tag = Object.keys(field)[0];
      if (typeof field[tag] === 'string' || field[tag] instanceof String) {
        record[tag] = field[tag];
      } else {
        record[tag] = getTagDisplayValue(field[tag]);
      }
    });
    result.push(record);
  });
  return result;
};

export {
  remapMultiArray,
  remapTemplateView,
  remapForTemplateMandatory,
  remapForResultList
};
