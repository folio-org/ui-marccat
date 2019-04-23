/* eslint-disable react/no-unused-state */
/**
 * @format
 * @flow
 */
import React, { Fragment } from 'react';
import { MarcEditableList } from '..';
import type { Props } from '../../../shared';
import { injectCommonProp } from '../../../shared';
import { replaceAll } from '../Utils/MarcApiUtils';
import { EMPTY_STRING, EMPTY_SPACED_STRING } from '../../../config/constants';

class VariableFields extends React.Component<Props, {}> {

  renderList() {
    const { fields, translate, onUpdate, onSave, onDelete, onCreate } = this.props;
    const resultsFormatter = {
      'categoryCode': item => `${item.variableField.code}`,
      'code': item => `${item.variableField.code}`,
      'variableField.code': item => `${item.variableField.code}`,
      'variableField.ind1': item => `${item.variableField.ind1}`,
      'variableField.ind2': item => `${item.variableField.ind2}`,
      'variableField.displayValue': item => `${item.variableField.displayValue = replaceAll(item.variableField.displayValue)}`,
    };

    const emptyfield = {
      code: EMPTY_STRING,
      mandatory: false,
      fieldStatus: 'new',
      variableField: {
        keyNumber: 0,
        code: EMPTY_STRING,
        ind1: EMPTY_SPACED_STRING,
        ind2: EMPTY_SPACED_STRING,
        displayValue: EMPTY_STRING,
        headingTypeCode: 0,
        sequenceNumber: 0,
        skipInFiling: 0,
        subfields: [],
      },
      added: true
    };

    return (
      <Fragment>
        <MarcEditableList
          createButtonLabel={translate({ id: 'ui-marccat.cataloging.actions' })}
          contentData={fields}
          itemTemplate={emptyfield}
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
      </Fragment>
    );
  }

  render() {
    return (
      <Fragment>
        {this.renderList()}
      </Fragment>
    );
  }
}

export default injectCommonProp(VariableFields);
