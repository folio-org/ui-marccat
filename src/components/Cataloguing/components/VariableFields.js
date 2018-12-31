/**
 * @format
 * @flow
 */
import React from 'react';
import {
  HotKeys,
  RepeatableField,
} from '@folio/stripes/components';
import { Field } from 'redux-form';
import type { Props } from '../../../core';
import { SingleCheckboxIconButton } from '../../../lib';

import style from '../Style/style.css';

export default class VariableFields extends React.Component<Props, {}> {
  constructor(props) {
    super(props);
    this.state = {
      fields: [''],
    };
    this.keys = {
      'new' : ['enter'],
    };
    this.handlers = {
      'new': this.handleAdd,
    };
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

  renderField = () => {
    return (
      <HotKeys keyMap={this.keys} handlers={this.handlers} data-full-width>
        <div className={style.divTable}>
          <div className={style.divTableBody}>
            <div className={style.divTableRow}>
              <SingleCheckboxIconButton labels={['']} pullLeft />
              <div className={style.divTableCell}>
                <Field
                  id="{name}"
                  name="{name}"
                  type="text"
                  component="input"
                />
              </div>
              <div className={style.divTableCell}>
                <Field
                  id="{name}"
                  name="{name}"
                  type="text"
                  component="input"
                />
              </div>
              <div className={style.divTableCell}>
                <Field
                  id="{name}"
                  name="{name}"
                  type="text"
                  component="input"
                />
              </div>
              <div className={style.divTableCell}>
                <Field
                  id="{name}"
                  name="{name}"
                  type="text"
                  component="input"
                />
              </div>
            </div>
          </div>
        </div>
      </HotKeys>
    );
  };

  render() {
    const { fields } = this.state;
    return (
      <RepeatableField
        fields={fields}
        onAdd={this.handleAdd}
        onRemove={this.handleRemove}
        renderField={() => this.renderField()}
      />
    );
  }
}
