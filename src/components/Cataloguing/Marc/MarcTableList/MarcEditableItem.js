import React from 'react';
import MarcItemView from './MarcItemView';
import MarcItemEdit from './MarcItemEdit';

const MarcEditableItem = ({ editing, ...props }: boolean) => (
  editing ? <MarcItemEdit {...props} autoFocus /> : <MarcItemView {...props} editing />);

export default MarcEditableItem;
