/**
 * @format
 * @flow
 */
import * as React from 'react';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Select from '@folio/stripes-components/lib/Select';

type ItemTypesSelectProps = {
    onChangeItemType: Function;
    resources: Object;
};

export default function ItemTypesSelect({ onChangeItemType, ...props }: ItemTypesSelectProps) {
  const itemTypesValues = (props.resources.itemTypes || {}).records || [];
  return (
    <Row>
      <Col xs={6}>
        {props.resources.itemTypes && props.resources.itemTypes.hasLoaded &&
        itemTypesValues.length > 0 &&
        <Select
          name="itemTypesSelect"
          id="itemTypesSelect"
          dataOptions={itemTypesValues}
          onChange={onChangeItemType}
        />
        }
      </Col>
    </Row>
  );
}
