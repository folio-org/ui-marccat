/* eslint-disable react/no-unused-state */
/**
 * @format
 * @flow
 */
import React from 'react';
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

  handleAdd = () => {
    this.setState(({ fields }) => ({
      fields: fields.concat(getEmptyVariableField({})),
    }));
  }

  handleRemove = (index) => {
    this.setState(({ fields }) => ({
      fields: [...fields.slice(0, index), ...fields.slice(index + 1)]
    }));
  }

  renderList() {
    const { fields, translate, onUpdate, onSave, onDelete, onCreate } = this.props;
    const resultsFormatter = {
      code: item => `${item.code}`,
      ind1: item => `${item.variableField.ind1}`,
      ind2: item => `${item.variableField.ind2}`,
      displayValue: item => `${replaceAll(item.variableField.displayValue)}`,
    };

    return (
      <MarcEditableList
        createButtonLabel={translate({ id: 'ui-marccat.cataloging.variablefield.section.add.newtag' })}
        contentData={fields}
        itemTemplate={getEmptyVariableField({})}
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
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.renderList()}
      </React.Fragment>
    );
  }
}

export default injectCommonProp(VariableFields);
