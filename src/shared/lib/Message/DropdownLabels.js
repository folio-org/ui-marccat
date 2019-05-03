/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// @flow
import * as React from 'react';
import style from '../Style/Dropdown.css';

const renderDropdDownMenu = (labels) => {
  return (
    <React.Fragment>
      <div className={style.dropdownContainer}>
        {labels.map((l, i) => (
          <div className={style.dropdownShortcut} key={i} onClick={l.onClick}>
            {l.label}
            <span>{l.shortcut}</span>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};
export default renderDropdDownMenu;
