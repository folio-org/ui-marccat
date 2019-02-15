/* eslint-disable react/no-unused-state */
/**
 * @format
 * @flow
 */
import React from 'react';
import { HotKeys } from '@folio/stripes/components';
import MarcEditableList from './Editable';
import { Props, injectCommonProp } from '../../../core';
import { separator } from '../../../utils';
import { SUBFILED_DELIMITER } from '../Utils/MarcUtils';

class VariableFields extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.keys = { 'new' : ['enter'] };
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
    const { fields, itemTemplate, translate, onUpdate, onSave, onDelete, onCreate } = this.props;
    fields.forEach((f, i) => {
      f.displayValue = fields[i].variableField.displayValue;
      separator(f.displayValue, SUBFILED_DELIMITER);
    });
    return (
      <React.Fragment>
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
            displayValue: 'variableField.displayValue',
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
          nameKey="code"
          itemTemplate={itemTemplate}
        />
      </React.Fragment>
    );
  }

  render() {
    return (
      <HotKeys keyMap={this.keys} handlers={this.handlers} data-full-width>
        {this.renderList()}
      </HotKeys>
    );
  }
}

export default injectCommonProp(VariableFields);
