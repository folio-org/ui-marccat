const validate = values => {
  const errors = {};
  if (!values.searchTextArea) {
    errors.searchTextArea = 'Required';
  }
  return errors;
};

