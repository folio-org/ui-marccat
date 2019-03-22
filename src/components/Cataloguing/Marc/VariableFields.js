/* eslint-disable react/no-unused-state */
/**
 * @format
 * @flow
 */
import React from 'react';
import MarcEditableList from './Editable';
import { Props, injectCommonProp } from '../../../core';
import { withSeparator } from '../Utils/MarcUtils';

class VariableFields extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.keys = { 'new': ['enter'] };
    this.handlers = { 'new': this.handleAdd };
  }

  handleAdd = () => {
    this.setState(({ fields }) => ({
      fields: fields.concat({}),
    }));
  }

  handleRemove = (index) => {
    this.setState(({ fields }) => ({
      fields: [...fields.slice(0, index), ...fields.slice(index + 1)]
    }));
  }

  renderList() {
    const { fields, translate, onUpdate, onSave, onDelete, onCreate } = this.props;
    const resultFormatter = {
      displayValue: x => (
        (x.variableField) ? withSeparator(x.variableField.displayValue) : withSeparator(x.displayValue)
      ),
      ind1: x => (
        (x.variableField) ? x.variableField.ind1 : x.ind1
      ),
      ind2: x => (
        (x.variableField) ? x.variableField.ind2 : x.ind2
      ),
    };
    return (
      <MarcEditableList
        createButtonLabel={translate({ id: 'ui-marccat.cataloging.variablefield.section.add.newtag' })}
        contentData={fields}
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
        onUpdate={onUpdate}
        onSave={onSave}
        onDelete={onDelete}
        onCreate={onCreate}
        formatter={resultFormatter}
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
