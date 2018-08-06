const getLeader = currentTemp => {
  let leader = '';
  currentTemp.fixedFields.map(element => {
    if (element.code === '000') {
      return leader = element.displayValue;
    }
    return '';
  });
  return leader;
};

const findLabel = (array, value) => {
  let label = '';
  array.map(element => {
    if (element.value === value) {
      return label = element.label;
    }
    return '';
  });
  return label;
};

export {
  getLeader,
  findLabel
};
