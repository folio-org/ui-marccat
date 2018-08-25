/**
 * @format
 * @flow
 */
import * as React from 'react';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Select from '@folio/stripes-components/lib/Select';
import { Observable } from 'rxjs';

type FunctionCodeSelectProps = {
    mutator: Object;
    resources: Object;
};

export default function FunctionCodeSelect({ ...props }: FunctionCodeSelectProps) {
  const onChangeFunctionCode = (e: any) => {
    const { mutator } = props;
    const { value } = e.target;
    mutator.functionCode.replace(value);
    const source = Observable.fromPromise(mutator.marcAssociated.GET());
    source
      .subscribe(k => handleFieldTemplate(k)); // eslint-disable-line
  };

  const handleFieldTemplate = (k: Object) => {
    const { mutator } = props;
    mutator.validationTag.replace(k);
    mutator.fieldTemplate.GET();
    mutator.fixedFieldSelect.GET();
  };

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
