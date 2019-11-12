// @flow
import * as React from 'react';
import FieldView from './FieldView';
import FieldEdit from './FieldEdit';

type Prop = {
  editing: boolean,
  cells: Array<Object>,
};
const EditableItem = ({ editing, ...props }: Prop): React.Component<Prop> => (
  editing ? <FieldEdit {...props} autoFocus /> : <FieldView {...props} />
);

export default EditableItem;
