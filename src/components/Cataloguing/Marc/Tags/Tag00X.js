import React from 'react';
import MarcField from '../MarcField';
import style from '../../Style/style.css';

export default class Tag00X extends React.Component {
  render() {
    const { tag, readOnly } = this.props;
    return (
      <div className={style.controlFieldContainer}>
        <MarcField
          {...this.props}
          readOnly={readOnly}
          label={tag.fixedField.code}
          name={tag.fixedField.code}
          value={tag.fixedField.displayValue}
        />
      </div>
    );
  }
}
