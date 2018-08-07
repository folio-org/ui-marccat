export const getLeader = currentTemp => { // eslint-disable-line
  let leader = '';
  currentTemp.fixedFields.map(element => {
    if (element.code === '000') {
      return leader = element.displayValue;
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

export const organize = (input) => {
  const result = [];
  const keySet = Object.keys(input);
  keySet.map(key => {
    const element = input[key];
    if (element.length > 0) {
      return result.push({
        label: key,
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
