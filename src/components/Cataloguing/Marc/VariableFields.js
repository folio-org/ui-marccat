/* eslint-disable react/no-unused-state */
/**
 * @format
 * @flow
 */
import React, { Fragment } from 'react';
import MarcEditableList from './Editable';
import { Props, injectCommonProp } from '../../../core';
import { getEmptyVariableField } from '..';
import { replaceAll } from '../Utils/MarcApiUtils';

class VariableFields extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.keys = { 'new': ['enter'] };
    this.handlers = { 'new': this.handleAdd };
  }

  renderList() {
    const { fields, translate, onUpdate, onSave, onDelete, onCreate } = this.props;
    const resultsFormatter = {
      code: item => `${item.code}`,
      ind1: item => `${item.variableField.ind1}`,
      ind2: item => `${item.variableField.ind2}`,
      displayValue: item => `${replaceAll(item.displayValue)}` || `${replaceAll(item.variableField.displayValue)}`,
    };
    return (
      <Fragment>
        <MarcEditableList
          createButtonLabel={translate({ id: 'ui-marccat.cataloging.actions' })}
          contentData={fields}
          itemTemplate={getEmptyVariableField(false, {})}
          visibleFields={[
            'code',
            'ind1',
            'ind2',
            'displayValue'
          ]}
          columnMapping={{
            code: 'code',
            ind1: 'ind1',
            ind2: 'ind2',
            displayValue: 'displayValue',
          }}
          columnWidths={{
            code: '10%',
            ind1: '10%',
            ind2: '10%',
            displayValue: '50%',
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
