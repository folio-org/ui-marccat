/**
 * @format
 * @flow
 */
import * as React from 'react';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Select from '@folio/stripes-components/lib/Select';

type ItemTypesSelectProps = {
    mutator: Object;
    resources: Object;
};

export default function ItemTypesSelect({ ...props }: ItemTypesSelectProps) {
  const onChangeItemType = (e: any) => {
    const { mutator } = props;
    const { value } = e.target;
    mutator.functionCodes.reset();
    mutator.itemType.replace(value);
    mutator.functionCodes.GET();
  };
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
