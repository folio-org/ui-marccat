// @flow
import * as React from 'react';
import { MarcEditableList } from '../..';
import { replaceAll } from '../../Utils/MarcApiUtils';
import { EMPTY_VARIABLE_FIELD } from '../../Utils/MarcConstant';
import { Localize } from '../../../../utils/Function';

export default ({ ...props }) => {

  const { fields, onUpdate, onSave, onDelete, onCreate } = props;
  const resultsFormatter = {
    'categoryCode': item => `${item.variableField.code}`,
    'code': item => `${item.variableField.code}`,
    'variableField.code': item => `${item.variableField.code}`,
    'variableField.ind1': item => `${item.variableField.ind1}`,
    'variableField.ind2': item => `${item.variableField.ind2}`,
    'variableField.displayValue': item => `${item.variableField.displayValue = replaceAll(item.variableField.displayValue)}`,
  };

  return (
    <MarcEditableList
      createButtonLabel={Localize({ key: 'cataloging.actions' })}
      contentData={fields}
      itemTemplate={EMPTY_VARIABLE_FIELD}
      visibleFields={[
        'variableField.code',
        'variableField.ind1',
        'variableField.ind2',
        'variableField.displayValue'
      ]}
      columnMapping={
        {
          'variableField.code': 'code',
          'variableField.ind1': 'ind1',
          'variableField.ind2': 'ind2',
          'variableField.displayValue': 'displayValue',
        }
      }
      columnWidths={{
        'variableField.code': '10%',
        'variableField.ind1': '10%',
        'variableField.ind2': '10%',
        'variableField.displayValue': '50%',
      }}
      formatter={resultsFormatter}
      onUpdate={onUpdate}
      onSave={onSave}
      onDelete={onDelete}
      onCreate={onCreate}
    />
  );
};
