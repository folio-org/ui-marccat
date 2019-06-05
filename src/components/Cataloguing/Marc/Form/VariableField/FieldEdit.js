// @flow
import * as React from 'react';
import { Field } from 'redux-form';
import { TextField, HotKeys } from '@folio/stripes/components';
import style from '../../../Style/variableform.css';
import AutoSuggestCode from '../../Suggestion/AutoSuggestCode';
import AutoSuggestInd1 from '../../Suggestion/AutoSuggestInd1';
import AutoSuggestInd2 from '../../Suggestion/AutoSuggestInd2';

type Props = {
  autoFocus: boolean,
  cells: Array<Object>,
  columnMapping: Array<Object>,
  error: string | boolean,
  field: PropTypes.string,
  fieldComponents: Array<Object>,
  readOnlyFields: Array<string>,
  rowIndex: number,
  visibleFields: Array<string>,
  widths: Array<Object>,
}

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

  const keys = {
    showHeading: 'ctrl+space'
  };

  const handlers = {
    showHeading: (event) => console.log(event)
  };

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
          <HotKeys
            keyMap={keys}
            handlers={handlers}
          >
            <Field
              component={
                (mappedName === 'code') ? AutoSuggestCode
                  : (mappedName === 'ind1') ? AutoSuggestInd1
                    : (mappedName === 'ind2') ? AutoSuggestInd2
                      : TextField
              }
              {...props}
              {...fieldProps}
              fullWidth
              autoFocus={autoFocus && fieldIndex === 0}
            />
          </HotKeys>
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
