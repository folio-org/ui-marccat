//
import * as React from 'react';
import FieldView from './FieldView';
import FieldEdit from './FieldEdit';

export default ({ editing, ...props }) => (
  editing ? <FieldEdit {...props} autoFocus /> : <FieldView {...props} />
);
