// @flow
import * as React from 'react';
import MarcItemView from './MarcItemView';
import MarcItemEdit from './MarcItemEdit';

type P = {
  editing: boolean,
};
const EditableItem = ({ editing, ...props }: P) => (editing ? <MarcItemEdit {...props} autoFocus /> : <MarcItemView {...props} />);

export default EditableItem;
