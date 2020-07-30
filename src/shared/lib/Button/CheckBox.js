import React from 'react';

export const CheckBox = ({ id, handleCheckChieldElement, isChecked, value }) => {
  return (
    <li>
      <input key={id} onClick={handleCheckChieldElement} type="checkbox" checked={isChecked} value={value} />
      {' '}
      {value.split('-')[1]}
    </li>
  );
};

export default CheckBox;
