import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { TextField } from '@folio/stripes/components';
import css from './EditableList.css';

const testItems = [
  {
    value: '100',
    code: '100',
  },
  {
    value: '110',
    label: '110',
  },
  {
    value: '120',
    label: '130',
  },
  {
    value: '160',
    label: '160',
  },
  {
    value: '170',
    label: '170',
  },
];

const ItemEdit = ({
  rowIndex,
  error,
  field,
  visibleFields,
  columnMapping,
  fieldComponents,
  readOnlyFields,
  widths,
  cells,
  autoFocus
}) => {
  const fields = visibleFields.map((name, fieldIndex) => {
    // const AutoSuggestion = () => (
    //   <AutoSuggest
    //     marginBottom0
    //     items={testItems}
    //     renderOption={item => item.value}
    //     renderValue={item => item.value}
    //     label=""
    //   />
    // );
    if (readOnlyFields.indexOf(name) === -1) {
      let mappedName = name;
      if (Object.hasOwnProperty.call(columnMapping, name)) {
        mappedName = columnMapping[name];
      }

      const fieldName = `${field}[${rowIndex}].${name}`;
      const ariaLabel = `${mappedName} ${rowIndex}`;
      const fieldKey = `${field}-${name}-${rowIndex}`;
      const fieldStyle = { flex: `0 0 ${widths[name]}`, width: `${widths[name]}`, padding: '6px' };
      const fieldProps = {
        'name': fieldName,
        'aria-label': ariaLabel,
      };

      if (Object.hasOwnProperty.call(fieldComponents, name)) {
        return (
          <div key={fieldKey} style={fieldStyle}>
            { fieldComponents[name]({ fieldProps, fieldIndex, name, field, rowIndex }) }
          </div>
        );
      }

      return (
        <div key={fieldKey} style={fieldStyle}>
          <Field
            {...fieldProps}
            // component={(name === 'code') ? AutoSuggestion : TextField}
            component={TextField}
            items={testItems}
            marginBottom0
            fullWidth
            placeholder={name}
            autoFocus={autoFocus && fieldIndex === 0}
          />
        </div>
      );
    }
    return cells[fieldIndex];
  });

  return (
    <div className={css.editListRow} role="row">
      {fields}
      { error &&
        <div className={css.editableListError}>
Error:
          {error}
        </div>
      }
    </div>
  );
};

ItemEdit.propTypes = {
  autoFocus: PropTypes.bool,
  cells: PropTypes.arrayOf(PropTypes.object),
  columnMapping: PropTypes.object,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  field: PropTypes.string,
  fieldComponents: PropTypes.object,
  readOnlyFields: PropTypes.arrayOf(PropTypes.string),
  rowIndex: PropTypes.number,
  visibleFields: PropTypes.arrayOf(PropTypes.string),
  widths: PropTypes.object,
};

export default ItemEdit;
