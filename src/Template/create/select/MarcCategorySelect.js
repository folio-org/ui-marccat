/**
 * @format
 * @flow
 */
import * as React from 'react';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Select from '@folio/stripes-components/lib/Select';
import { Field } from 'redux-form';

type CategorySelectProps = {
    resources: Object;
    mutator: Object;
    translate: () => string;
};

export default function MarcCategorySelect({ translate, ...props }: CategorySelectProps) {
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
        <Field
          label={`${translate({ id: 'ui-marccat.marc.category' })} *`}
          component={Select}
          name="marcCategory"
          id="marcCategorie-id"
          dataOptions={marcCatValues}
          onChange={onChangeMarcCategory}
          required
        />
        }
      </Col>
    </Row>
  );
}
