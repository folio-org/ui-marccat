import React from 'react';
import PropTypes from 'prop-types';
import sortBy from 'lodash/sortBy';
import MarcEditableForm from './EditableListForm';

const propTypes = {
  columnMapping: PropTypes.object,
  columnWidths: PropTypes.object,
  contentData: PropTypes.arrayOf(PropTypes.object).isRequired,
  fieldComponents: PropTypes.object,
  formatter: PropTypes.object,
  id: PropTypes.string,
  nameKey: PropTypes.string,
  readOnlyFields: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
  nameKey: 'name',
};

const MarcEditableList = (props) => {
  const { contentData, nameKey } = props;
  const items = sortBy(contentData, [t => t[nameKey] && t[nameKey].toLowerCase()]);
  return (<MarcEditableForm initialValues={{ items }} {...props} />);
};

MarcEditableList.propTypes = propTypes;
MarcEditableList.defaultProps = defaultProps;

export default MarcEditableList;
