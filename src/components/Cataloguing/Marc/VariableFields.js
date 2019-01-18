/**
 * @format
 * @flow
 */
import React from 'react';
import { HotKeys, Callout } from '@folio/stripes/components';
import MarcEditableList from './Editable';
import type { Props } from '../../../core';

class VariableFields extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.keys = { 'new' : ['enter'] };
    this.handlers = { 'new': this.handleAdd };
    this.callout = React.createRef();

    this.onCreate = this.onCreate.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSave = this.onSave.bind(this);
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

  onSave = () => { this.showCallout('Tag saved sucesfully'); }
  onUpdate = () => { this.showCallout('Tag update sucesfully'); }
  onDelete = () => { this.showCallout('Tag delete sucesfully'); }
  onCreate = () => { this.showCallout('Tag Saved sucesfully'); }

  showCallout = msg => this.callout.current.sendCallout({
    type: 'success',
    message: (
      <span>
        {msg}
      </span>
    )
  });

  renderList() {
    const { fields, itemTemplate } = this.props;
    fields.forEach((f, i) => {
      f.displayValue = fields[i].variableField.displayValue;
    });
    return (
      <React.Fragment>
        <MarcEditableList
          createButtonLabel="+ Add new Tag"
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
          onUpdate={this.onUpdate}
          onSave={this.onSave}
          onDelete={this.onDelete}
          onCreate={this.onCreate}
          nameKey="code"
          itemTemplate={itemTemplate}
        />
        <Callout ref={this.callout} />
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

export default VariableFields;
