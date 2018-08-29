import * as C from './Constant';

const marcSeparator = stringa => stringa.replace(
  C.MARC.CHARACTER_SEPARATOR,
  C.MARC.CHARACTER_DOLLAR,
);

const arrayToObject = arr => {
  const objCur = [];
  for (let i = 0; i < arr.length; ++i) {
    objCur.push({ label: arr[i], value: arr[i] });
    if (arr.length - 1 === i) {
      return objCur;
    }
  }
  return objCur;
};

const convertValueToLabel = resourcesPath => {
  const newArray = [];
  const resCat = resourcesPath;
  const arrLength = resCat.length - 1;
  if (arrLength >= 1) {
    const arr = resCat;
    // Convert value to label & id to value
    Object.keys(arr).map(key => {
      const obj = {
        label: arr[key].name,
        value: arr[key].id,
      };
      newArray.push(obj);
      return newArray;
    });
  }
  return newArray;
};

const remapCodeLongDescription = logicalViews => (logicalViews.length > 0
  ? logicalViews.map(view => ({
    value: view.code,
    label: view.longDescription,
  }))
  : false);

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


export {
  arrayToObject,
  convertValueToLabel,
  remapCodeLongDescription,
  remapMultiArray,
  remapTemplateView,
  remapForTemplateMandatory
};
