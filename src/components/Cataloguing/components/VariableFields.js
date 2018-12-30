/**
 * @format
 * @flow
 */
import React from 'react';
import {
  Row,
  Col,
  HotKeys,
  RepeatableField,
  LayoutBox,
  Icon
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
    const labels = [''];
    return (
      <HotKeys keyMap={this.keys} handlers={this.handlers} data-full-width>
        <LayoutBox className={style.fieldContainer}>
          <Row>
            <Icon
              icon="caret-down"
              size="large"
            />
            <SingleCheckboxIconButton labels={labels} className={style['pl-10']} />
            <Col xs={1}>
              <div>
                <Field
                  id="tagField"
                  name="tagField"
                  type="text"
                  component="input"
                />
              </div>
            </Col>
            <Col xs={1}>column 2</Col>
            <Col xs={1}>column 2</Col>
            <Col xs={8}>column 5</Col>
          </Row>
        </LayoutBox>
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
