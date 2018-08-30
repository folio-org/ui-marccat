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
    reset: () => void;
    translate: (o: Object) => string;
};

export default function MarcCategorySelect({ reset, translate, ...props }: CategorySelectProps) {
  const onChangeMarcCategory = async (e: any) => {
    const { mutator } = props;
    const { value } = e.target;
    reset('marcCategories');
    mutator.marcCategory.replace(value);
    await mutator.headingTypes.GET().then(h => { mutator.headingType.replace(h.length ? h[0].value : 1); });
    await mutator.itemTypes.GET().then(i => { mutator.itemType.replace(i.length ? i[0].value : 1); });
    await mutator.functionCodes.GET().then(f => { mutator.functionCode.replace(f.length ? f[0].value : -1); });
    await mutator.marcAssociated.GET().then((k) => { mutator.validationTag.replace(k); });
    await mutator.fieldTemplate.GET();
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
