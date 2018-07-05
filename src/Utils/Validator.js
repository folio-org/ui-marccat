const Required = (value) => {
  if (value) return undefined;
  return 'Required!';
};

const RequiredInput = () => {
  return false;
};

export { Required, RequiredInput };
