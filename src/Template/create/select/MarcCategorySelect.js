/**
 * @format
 * @flow
 */
import * as React from 'react';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Select from '@folio/stripes-components/lib/Select';

type CategorySelectProps = {
    resources: Object;
    onChangeMarcCategory: Function;
};

export default function MarcCategorySelect({ onChangeMarcCategory, ...props }: CategorySelectProps) {
  const marcCatValues = (props.resources.marcCategories || {}).records || [];
  return (
    <Row>
      <Col xs={7}>
        {marcCatValues &&
        <Select
          name="marcCategoriesSelect"
          id="marcCategoriesSelect"
          dataOptions={marcCatValues}
          onChange={onChangeMarcCategory}
        />
        }
      </Col>
    </Row>
  );
}
