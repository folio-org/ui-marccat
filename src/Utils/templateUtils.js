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

export {
  getLeader
};
