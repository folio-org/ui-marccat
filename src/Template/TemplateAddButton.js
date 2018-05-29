import React from 'react';
import css from './styles/TemplateAddButton.css';

const TemplateAddButton = (props) => (
  <div className={css.root}>
    <button buttonId="add" {...props} />
  </div>
);

export default TemplateAddButton;
