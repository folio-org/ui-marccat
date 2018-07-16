import * as C from './Constant';

const marcSeparator = stringa => stringa.replace(
  C.MARC_CHARACTER.SEPARATOR,
  C.MARC_CHARACTER.DOLLAR,
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
    if (multiArray[index]['fixed-field'] !== undefined) {
      obj.push(multiArray[index]['fixed-field']);
    } else if (
      multiArray[index]['variable-field'] !== undefined
    ) {
      multiArray[index][ // eslint-disable-line
        'variable-field'
      ].displayValue = marcSeparator(multiArray[index]['variable-field'].displayValue);
      obj.push(multiArray[index]['variable-field']);
    }
  });
  return obj;
};


export {
  arrayToObject,
  convertValueToLabel,
  remapCodeLongDescription,
  remapMultiArray,
};
