const validate = values => {
  const errors = {};
  if (!values.clubName) {
    errors.clubName = 'Required';
  }
  if (!values.items || !values.items.length) {
    errors.items = { _error: 'At least one member must be entered' };
  } else {
    const itemsArrayErrors = [];
    values.items.forEach((member, memberIndex) => {
      const memberErrors = {};
      if (!member || !member.firstName) {
        memberErrors.firstName = 'Required';
        itemsArrayErrors[memberIndex] = memberErrors;
      }
      if (!member || !member.lastName) {
        memberErrors.lastName = 'Required';
        itemsArrayErrors[memberIndex] = memberErrors;
      }
      if (member && member.hobbies && member.hobbies.length) {
        const hobbyArrayErrors = [];
        member.hobbies.forEach((hobby, hobbyIndex) => {
          if (!hobby || !hobby.length) {
            hobbyArrayErrors[hobbyIndex] = 'Required';
          }
        });
        if (hobbyArrayErrors.length) {
          memberErrors.hobbies = hobbyArrayErrors;
          itemsArrayErrors[memberIndex] = memberErrors;
        }
        if (member.hobbies.length > 5) {
          if (!memberErrors.hobbies) {
            memberErrors.hobbies = [];
          }
          memberErrors.hobbies._error = 'No more than five hobbies allowed';
          itemsArrayErrors[memberIndex] = memberErrors;
        }
      }
    });
    if (itemsArrayErrors.length) {
      errors.items = itemsArrayErrors;
    }
  }
  return errors;
};

export default validate;
