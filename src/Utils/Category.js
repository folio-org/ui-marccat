const parseCategories = (val, dropdownCategories) => {
  const arr = [];
  val.forEach((val1) => {
    dropdownCategories.forEach((val2) => {
      if (val1 === val2.value) return arr.push(val2.label);
      return false;
    });
  });
  return arr.join(', ');
};

export default parseCategories;
