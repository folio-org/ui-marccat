/**
 * @format
 * @flow
 */
import * as React from 'react';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Select from '@folio/stripes-components/lib/Select';

type FunctionCodeSelectProps = {
    onChangeFunctionCode: Function;
    resources: Object;
};

export default function FunctionCodeSelect({ onChangeFunctionCode, ...props }: FunctionCodeSelectProps) {
  const functionCodesValues = (props.resources.functionCodes || {}).records || [];
  return (
    <Row>
      <Col xs={6}>
        {props.resources.functionCodes && props.resources.functionCodes.hasLoaded && functionCodesValues.length > 0 &&
        <Select
          name="functionCodesSelect"
          id="functionCodesSelect"
          dataOptions={functionCodesValues}
          onChange={onChangeFunctionCode}
        />
        }
      </Col>
    </Row>
  );
}
