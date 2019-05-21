/* @flow strict  */
import * as React from 'react';
import { Field } from 'redux-form';
import { TextField } from '@folio/stripes/components';
import style from '../Style/variableform.css';

type Props = {
  autoFocus: boolean,
  cells: Array<{ }>,
  columnMapping: Array<{ }>,
  error: string | boolean,
  field: string,
  fieldComponents: Array<{ }>,
  readOnlyFields: Array<string>,
  rowIndex: number,
  visibleFields: Array<string>,
  widths: Array<{ }>,
}
/**
 *
 *
 * @export
 * @param {Props} {
 *   rowIndex,
 *   error,
 *   field,
 *   visibleFields,
 *   columnMapping,
 *   fieldComponents,
 *   readOnlyFields,
 *   widths,
 *   cells,
 *   autoFocus
 * }
 * @returns
 */
export default function ItemEdit({
  rowIndex,
  error,
  field,
  visibleFields,
  columnMapping,
  fieldComponents,
  readOnlyFields,
  widths,
  cells,
  autoFocus,
  ...props
}: Props) {
  const fields = visibleFields.map((name, fieldIndex) => {
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
            {...props}
            component={TextField}
            marginBottom0
            fullWidth
            autoFocus={autoFocus && fieldIndex === 0}
          />
        </div>
      );
    }
    return cells[fieldIndex];
  });

  return (
    <div className={style.editListRow} role="row">
      {fields}
      { error &&
        <div className={style.editableListError}>
                  Error:
          {error}
        </div>
      }
    </div>
  );
}
