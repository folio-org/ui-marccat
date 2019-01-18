import React from 'react';
import css from './EditableList.css';

type P = {
  cells: [{}],
};
const MarcItemView = ({ cells }:P) => (
  <div className={css.editListRow} role="row">
    {cells}
  </div>
);

export default MarcItemView;
