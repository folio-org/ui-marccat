/**
 * @format
 * @flow
 */
import * as React from 'react';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Select from '@folio/stripes-components/lib/Select';
import { Observable } from 'rxjs';
import { Field } from 'redux-form';
import { injectIntl } from 'react-intl';

type CategorySelectProps = {
    resources: Object;
    mutator: Object;
    reset: () => void;
    intl: Object;
};


function MarcCategorySelect({ reset, ...props }: CategorySelectProps) {
  const onChangeMarcCategory = async (e: any) => {
    const { mutator } = props;
    const { value } = e.target;
    reset('marcCategories');
    mutator.marcCategory.replace(value);
    await mutator.headingTypes.GET().then(headings => { mutator.headingType.replace(headings[0].value); });
    await mutator.itemTypes.GET().then(items => { mutator.itemType.replace(items.length ? items[0].value : 1); });
    await mutator.functionCodes.GET().then(functions => { mutator.functionCode.replace(functions[0].value); });
    await mutator.marcAssociated.GET().then((k) => { mutator.validationTag.replace(k); });
    await mutator.fieldTemplate.GET();
  };

  const marcCatValues = (props.resources.marcCategories || {}).records || [];
  return (
    <Row>
      <Col xs={6}>
        {marcCatValues &&
        <Field
          label={`${props.intl.formatMessage({ id: 'ui-marccat.marc.category' })} *`}
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
export default injectIntl(MarcCategorySelect);
