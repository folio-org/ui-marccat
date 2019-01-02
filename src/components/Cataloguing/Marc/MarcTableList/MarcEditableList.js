import React from 'react';
import PropTypes from 'prop-types';
import sortBy from 'lodash/sortBy';
import MarcEditableForm from './MarcEditableForm';
import { Props, injectCommonProp } from '../../../../core';

type P = Props & {
  columnMapping: Object,
  columnWidths: Object,
  contentData: Array<Object>,
  fieldComponents: Object,
  formatter?: Object,
  id?: PropTypes.string,
  nameKey?: PropTypes.string,
  readOnlyFields: Array<string>,
};

const MarcEditableList = (props:P) => {
  const { contentData, nameKey } = props;
  const key = (nameKey) || 'name';
  const items = sortBy(contentData, [t => t[key] && t[key].toLowerCase()]);
  return (<MarcEditableForm initialValues={{ items }} {...props} />);
};

export default injectCommonProp(MarcEditableList);
