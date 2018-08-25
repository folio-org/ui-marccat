/**
 * @format
 * @flow
 */
import * as React from 'react';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Select from '@folio/stripes-components/lib/Select';

type HeadingTypesSelectProps = {
    mutator: Object;
    resources: Object;
};

export default function HeadingTypesSelect({ ...props }: HeadingTypesSelectProps) {
  const onChangeHeadingType = (e: any) => {
    const { mutator } = props;
    const { value } = e.target;
    mutator.itemTypes.reset();
    mutator.headingType.replace(value);
    mutator.itemTypes.GET();
  };
  return (
    <Row>
      {props.resources.headingTypes && props.resources.headingTypes.records &&
      <Col xs={6}>
        <Select
          name="headingTypesSelect"
          id="headingTypesSelect"
          dataOptions={props.resources.headingTypes.records}
          onChange={onChangeHeadingType}
        />
      </Col>
      }
    </Row>
  );
}
