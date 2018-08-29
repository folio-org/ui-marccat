/**
 * @format
 * @flow
 */
import * as React from 'react';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Select from '@folio/stripes-components/lib/Select';
import { Field } from 'redux-form';
import { MARC } from '../../../Utils/Constant';

type HeadingTypesSelectProps = {
    mutator: Object;
    resources: Object;
    translate: (o: Object) => string;
};

export default function HeadingTypesSelect({ translate, ...props }: HeadingTypesSelectProps) {
  const onChangeHeadingType = async (e: any) => {
    const { mutator } = props;
    const { value } = e.target;

    mutator.itemTypes.reset();
    mutator.fieldTemplate.reset();
    mutator.functionCode.replace(-1); // TO BE FIXME

    await mutator.headingType.replace(value);
    await mutator.itemTypes.GET().then((r) => { mutator.itemType.replace(r.length ? r[0].value : -1); });

    await mutator.marcAssociated.GET().then((k) => {
      mutator.validationTag.replace(k);
      mutator.fieldTemplate.GET().then((x) => handleFixedField(x)); // eslint-disable-line
    });
  };

  const handleFixedField = (x) => {
    const { mutator } = props;
    if (x[MARC.FIXED_FIELD]) {
      mutator.fixedField.replace(x);
      mutator.fixedFieldSelect.GET().then(g => mutator.fixedFieldGroup.replace(g));
    }
  };

  return (
    <Row>
      {props.resources.headingTypes && props.resources.headingTypes.records &&
      <Col xs={6}>
        <Field
          label={`${translate({ id: 'ui-marccat.heading.type' })} *`}
          component={Select}
          name="headingType"
          id="headingTypes-id"
          dataOptions={props.resources.headingTypes.records}
          onChange={onChangeHeadingType}
          required
        />
      </Col>
      }
    </Row>
  );
}
