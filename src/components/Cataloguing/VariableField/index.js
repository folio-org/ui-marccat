/* @flow strict  */
import * as React from 'react';
import { Accordion } from '@folio/stripes/components';
import FieldList from './FieldList';
import { Localize, CheckBoxLabelField } from '../../../shared';
import { replaceAll } from '../Utils/MarcApiUtils';
import { EMPTY_VARIABLE_FIELD } from '../Utils/MarcConstant';
/**
 *
 *
 * @export
 * @param {*} { ...props }
 * @returns
 */
export default function ({ ...props }) {

  const { fields, onUpdate, onSave, onDelete, onCreate } = props;
  const resultsFormatter = {
    'selectable': (_) => (<CheckBoxLabelField nolabel={true.toString()} label={_.rowIndex} {...props} />),
    'variableField.code': item => `${item.variableField.code}`,
    'variableField.ind1': item => `${item.variableField.ind1}`,
    'variableField.ind2': item => `${item.variableField.ind2}`,
    'variableField.displayValue': item => `${item.variableField.displayValue = replaceAll(item.variableField.displayValue)}`,
  };

  return (
    <Accordion
      label={Localize({ key:'cataloging.accordion.variablefield.label' })}
      id="variable-field"
    >
      <FieldList
        createButtonLabel={Localize({ key: 'cataloging.actions' })}
        contentData={fields}
        itemTemplate={EMPTY_VARIABLE_FIELD}
        visibleFields={[
          'selectable',
          'variableField.code',
          'variableField.ind1',
          'variableField.ind2',
          'variableField.displayValue'
        ]}
        columnMapping={
          {
            'selectable': '',
            'variableField.code': 'code',
            'variableField.ind1': 'ind1',
            'variableField.ind2': 'ind2',
            'variableField.displayValue': 'displayValue',
          }
        }
        columnWidths={{
          'selectable': '5%',
          'variableField.code': '10%',
          'variableField.ind1': '10%',
          'variableField.ind2': '10%',
          'variableField.displayValue': '40%',
        }}
        formatter={resultsFormatter}
        onUpdate={onUpdate}
        onSave={onSave}
        onDelete={onDelete}
        onCreate={onCreate}
      />
    </Accordion>
  );
}
