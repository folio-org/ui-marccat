import React, { useState, useEffect } from 'react';
import { Button } from '@folio/stripes-components';
import { Field as FormField } from '../Common/Field';
import style from '../../Style/index.css';

function FixedFieldRepe(props) {
  const { renderField, addLabel, name, headingTypes, record: { fields } } = props;

  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });


  return (
    <div className={style.repeatableField}>
      {fields.length > 0 && (
        <ul className={style.repeatableFieldList}>
          {fields.map((field, index) => (
            <li
              className={style.fieldContainer}
              key={index}
            >
              <FormField
                {...props}
                label={field.label}
                name={name}
                prepend="true"
                onClick={() => {
                  setToggle({ toggle: !toggle });
                }}
              />
              <div className={(toggle) ? style.leaderResultsActive : style.leaderResults}>
                {headingTypes && renderField(field, index, fields)}
              </div>
            </li>
          ))}
        </ul>
      )}
      {addLabel && (
        <Button
          data-test-repeatable-field-add-item-button
          onClick={() => fields.push({})}
          type="button"
        >
          {addLabel}
        </Button>
      )}
    </div>
  );
}

export default Repetblefield;
