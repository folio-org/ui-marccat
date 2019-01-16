/**
 * @format
 * @flow
 */
import React from 'react';
import { Row, Col, TextField } from '@folio/stripes/components';
import MarcField from './MarcField';
import type { Props } from '../../../core';
import { EMPTY_MESSAGE } from '../../../utils/Constant';
import style from '../Style/style.css';

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


  renderField = (field) => (
    <input {...field.input} type="text" />
  )

  render() {
    const { record, idx } = this.props;
    const fieldStyle = { flex: '0 0 10%', width: ' 10%', padding: '6px' };
    const lastFieldStyle = { flex: '0 0 70%', width: ' 70%', padding: '6px' };
    return (
      <Row className={style.marcEditableListFormHeader} key={idx}>
        <Col xs={12}>
          <div className={style.marcEditableListRow} role="row">
            <div style={fieldStyle}>
              <MarcField
                {...this.props}
                id={`${record.variableField.code}-code`}
                name={`${record.variableField.code}-code`}
                component={TextField}
                value={record.variableField.code}
              />
            </div>
            <div style={fieldStyle}>
              <MarcField
                {...this.props}
                id={`${record.variableField.code}-ind1`}
                name={`${record.variableField.code}-ind1`}
                component={TextField}
                value={record.variableField.ind1}
              />
            </div>
            <div style={fieldStyle}>
              <MarcField
                {...this.props}
                id={`${record.variableField.code}-ind2`}
                name={`${record.variableField.code}-ind2`}
                component={TextField}
                value={record.variableField.ind2}
              />
            </div>
            <div style={lastFieldStyle}>
              <MarcField
                {...this.props}
                id={`${record.variableField.code}-displayValue`}
                name={`${record.variableField.code}-displayValue`}
                component={TextField}
                value={record.variableField.displayValue}
              />
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}

export default (VariableFields);
