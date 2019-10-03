// @flow
import * as React from 'react';
import style from '../../../Style/variableform.css';

type Prop = {
  cells: Array<Object>,
};
export default ({ cells }: Prop): JSX.Element => (
  <div className={style.editListRow} role="row">
    {cells}
  </div>
);
