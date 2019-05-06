// @flow
import * as React from 'react';
import Tag00X from './Tags/Tag00X';

export default ({ fixedfields, record, ...props }) => {
  return (<Tag00X {...props} field={fixedfields} record={record} {...props} />);
};
