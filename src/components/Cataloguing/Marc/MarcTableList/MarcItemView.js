import React from 'react';
import css from '../../Style/style.css';

const MarcItemView = ({ cells }:Array<Object>) => (
  <div className={css.marcEditableListRow} role="row">
    {cells}
  </div>
);

export default MarcItemView;
