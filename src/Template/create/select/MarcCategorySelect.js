/**
 * @format
 * @flow
 */
import * as React from 'react';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Select from '@folio/stripes-components/lib/Select';

type CategorySelectProps = {
    resources: Object;
    mutator: Object;
};

export default function MarcCategorySelect({ ...props }: CategorySelectProps) {

  const onChangeMarcCategory = (e: any) => {
    const { mutator } = props;
    const { value } = e.target;
    mutator.headingTypes.reset();
    mutator.itemTypes.reset();
    mutator.marcCategory.replace(value);
    mutator.headingTypes.GET();
  };

  const marcCatValues = (props.resources.marcCategories || {}).records || [];
  return (
    <Row>
      <Col xs={6}>
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
