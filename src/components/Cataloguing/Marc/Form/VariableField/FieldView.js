//
import * as React from 'react';
import style from '../../../Style/variableform.css';

export default ({ cells }) => (
  <div className={style.editListRow} role="row">
    {cells}
  </div>
);
