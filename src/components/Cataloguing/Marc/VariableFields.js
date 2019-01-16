/**
 * @format
 * @flow
 */
import React from 'react';
import { Row, Col, TextField } from '@folio/stripes/components';
import { Field } from 'redux-form';
import type { Props } from '../../../core';
import { EMPTY_MESSAGE } from '../../../utils/Constant';
import css from '../Style/style.css';

class VariableFields extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.state = {
      variableFields: [{ name: EMPTY_MESSAGE }],
    };
    this.keys = {
      'new': ['enter'],
    };
    this.handlers = {
      'new': () => this.handleAddSearchForm(),
    };
  }

  handleAddSearchForm = () => {
    const { variableFields } = this.state;
    this.setState({
      variableFields: variableFields.concat([{ name: '' }])
    });
  }

  render() {
    const { record, name, dispatch, change } = this.props;
    const fieldStyle = { flex: '0 0 20%', width: ' 20%', padding: '6px' };
    const lastFieldStyle = { flex: '0 0 40%', width: ' 40%', padding: '6px' };
    dispatch(change(record.code, record.code));
    dispatch(change(record.displayValue, record.displayValue));
    return (
      <Row className={css.marcEditableListFormHeader}>
        <Col xs={12}>
          <div className={css.marcEditableListRow} role="row">
            <div style={fieldStyle}>
              <Field
                id={`variablefield-${name}`}
                name={record.code}
                type="text"
                component={TextField}
                marginBottom0
                fullWidth
                value={record.code}
              />
            </div>
            <div style={fieldStyle}>
              <Field
                id={`variablefield-${name}`}
                name={record.code}
                component={TextField}
                marginBottom0
                fullWidth
                value={record.ind1}
              />
            </div>
            <div style={fieldStyle}>
              <Field
                id={`variablefield-${name}`}
                name={name}
                component={TextField}
                marginBottom0
                fullWidth
                value={record.ind2}
              />
            </div>
            <div style={lastFieldStyle}>
              <Field
                id={`variablefield-${name}`}
                name={record.displayValue}
                type="text"
                component={TextField}
                marginBottom0
                fullWidth
                value={record.displayValue}
              />
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}

export default (VariableFields);
