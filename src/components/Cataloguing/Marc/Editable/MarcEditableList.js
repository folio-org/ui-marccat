import React from 'react';
import PropTypes from 'prop-types';
import sortBy from 'lodash/sortBy';
import MarcRecordListForm from './MarcRecordListForm';

const propTypes = {
  columnMapping: PropTypes.object,
  columnWidths: PropTypes.object,
  contentData: PropTypes.arrayOf(PropTypes.object).isRequired,
  formatter: PropTypes.object,
  id: PropTypes.string,
  nameKey: PropTypes.string,
  readOnlyFields: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
  nameKey: 'name',
};

const EditableList = (props) => {
  const { contentData, nameKey } = props;
  const items = sortBy(contentData, [t => t[nameKey] && t[nameKey].toLowerCase()]);
  return (<MarcRecordListForm initialValues={{ items }} {...props} />);
};

EditableList.propTypes = propTypes;
EditableList.defaultProps = defaultProps;

export default EditableList;
