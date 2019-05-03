// @flow
import * as React from 'react';
import Tag00X from './Tags/Tag00X';

export default ({ ...props }) => {

  const renderTag00X = (field) => {
    const { record } = props;
    return (
      <Tag00X {...props} field={field} record={record} />
    );
  };

  const { fixedfields } = props;
  return (
    renderTag00X(
      fixedfields
    )
  );
};
