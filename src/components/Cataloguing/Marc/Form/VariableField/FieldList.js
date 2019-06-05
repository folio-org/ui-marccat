import * as React from 'react';
import sortBy from 'lodash/sortBy';
import FieldForm from './FieldForm';


export default (props) => {
  const { contentData, nameKey = 'code' } = props;
  const items = sortBy(contentData, [t => t[nameKey] && t[nameKey].toLowerCase()]);
  return (<FieldForm initialValues={{ items }} {...props} />);
};
