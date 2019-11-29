import React from 'react';
import PropTypes from 'prop-types';
import FieldEdit from './FieldEdit';
import FieldView from './FieldView';

const EditableItem = ({ editing: isEditing, ...passThroughProps }) => {
  if (isEditing) {
    return <FieldEdit {...passThroughProps} autoFocus />;
  }
  return <FieldView {...passThroughProps} />;
};

EditableItem.propTypes = {
  editing: PropTypes.bool.isRequired,
};

export default EditableItem;
