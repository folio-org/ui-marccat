/**
 * @format
 * @flow
 */
import * as React from 'react';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Select from '@folio/stripes-components/lib/Select';

type HeadingTypesSelectProps = {
    onChangeHeadingType: Function;
    resources: Object;
};

export default function HeadingTypesSelect({ onChangeHeadingType, ...props }: HeadingTypesSelectProps) {
  const headingTypesValues = (props.resources.headingTypes || {}).records || [];
  return (
    <Row>
      <Col xs={7}>
        {props.resources.headingTypes && props.resources.headingTypes.hasLoaded &&
        <Select
          name="headingTypesSelect"
          id="headingTypesSelect"
          dataOptions={headingTypesValues}
          onChange={onChangeHeadingType}
        />
        }
      </Col>
    </Row>
  );
}
