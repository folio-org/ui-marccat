// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import sortBy from 'lodash/sortBy';
import FieldForm from './FieldForm';

type Props = {
  columnMapping?: PropTypes.object,
  columnWidths?: PropTypes.object,
  contentData: Array<Object>,
  formatter?: Object,
  id: string,
  nameKey?: string,
  readOnlyFields?: Array<String>,
};

const FieldList = (props: Props) => {
  const { contentData, nameKey = 'code' } = props;
  const items = sortBy(contentData, [t => t[nameKey] && t[nameKey].toLowerCase()]);
  return (<FieldForm initialValues={{ items }} {...props} />);
};

export default FieldList;
