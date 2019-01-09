import React from 'react';
import PropTypes from 'prop-types';
import sortBy from 'lodash/sortBy';
import MarcEditableForm from './MarcEditableForm';
import { Props, injectCommonProp } from '../../../../core';

type P = Props & {
  id: string,
  columnMapping: Object,
  columnWidths: Object,
  contentData: Array<Object>,
  fieldComponents: Object,
  formatter?: Object,
  id?: string,
  nameKey?: string,
  readOnlyFields: Array<string>,
};

const MarcEditableList = (props:P) => {
  const { contentData, nameKey, editable, idx } = props;
  const key = (nameKey) || 'name';
  const items = sortBy(contentData, [t => t[key] && t[key].toLowerCase()]);
  return (<MarcEditableForm id={idx} initialValues={{ items }} {...props} editable={editable} />);
};

export default injectCommonProp(MarcEditableList);
