const Required = value => {
  if (value) return undefined;
  return 'Required!';
};

const RequiredInput = () => false;

export { Required, RequiredInput };
