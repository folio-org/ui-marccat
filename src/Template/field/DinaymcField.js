import React from 'react';
import Button from '@folio/stripes-components/lib/Button';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import { Field } from 'redux-form';
import TextField from '@folio/stripes-components/lib/TextField';
import { Select } from '../../Material';

type DinamicFieldProps = {|
    label:string;
    onOpenClick:Function;
    onCancelClick:Function;
    disabled:boolean;
|}

type DinamicFieldState = {||}

export default class DinamicField extends React.Component<DinamicFieldProps, DinamicFieldState> {
  render() {
    const { label, onOpenClick, onCancelClick, disabled } = this.props;
    return (
      <Row>
        <Col xs={3}>
          <Select native="true" lable="lable" plaeholder="placeholder" {...this.props} />
        </Col>
        <Col xs={3}>
          <Field
            label="labe"
            name="code"
            id="code"
            placeholder="labe"
            aria-label="labe"
            component={TextField}
            required
            fullWidth
          />
        </Col>
        <Button
          onClick={onCancelClick}
          type="submit"
          disabled={disabled}
          buttonStyle="primary"
          style={{ 'minHeight': '36px' }}
        >
          {'Cancel'}
        </Button>
        <Button
          onClick={onOpenClick}
          type="submit"
          disabled={disabled}
          buttonStyle="primary"
          style={{ 'minHeight': '36px' }}
        >
          {'Open'}
        </Button>
      </Row>
    );
  }
}
