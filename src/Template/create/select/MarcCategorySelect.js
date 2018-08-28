/**
 * @format
 * @flow
 */
import * as React from 'react';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Select from '@folio/stripes-components/lib/Select';
import { Field } from 'redux-form';
import { injectIntl } from 'react-intl';

type CategorySelectProps = {
    resources: Object;
    mutator: Object;
    intl: Object;
};

function MarcCategorySelect({ ...props }: CategorySelectProps) {
  const onChangeMarcCategory = (e: any) => {
    const { mutator } = props;
    const { value } = e.target;
    mutator.headingTypes.reset();
    mutator.itemTypes.reset();
    mutator.functionCodes.reset();
    mutator.marcCategory.replace(value);
    mutator.headingTypes.GET().then(headings => {
      mutator.headingType.replace(headings[0].value);
      mutator.itemTypes.GET().then(items => {
        mutator.itemType.replace(items[0].value);
        mutator.functionCodes.GET().then(functions => {
          mutator.functionCode.replace(functions[0].value);
        });
      });
    });
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
