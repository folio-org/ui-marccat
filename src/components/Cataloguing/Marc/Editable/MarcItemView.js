// @flow
import * as React from 'react';
import style from '../../Style/variableform.css';

type P = {
  cells: [{}],
};
const MarcItemView = ({ cells }: P) => (
  <div className={style.editListRow} role="row">
    {cells}
  </div>
);

export default MarcItemView;
