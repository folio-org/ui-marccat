/**
 * @format
 * @flow
 */
import * as React from 'react';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Select from '@folio/stripes-components/lib/Select';
import { Field } from 'redux-form';
import _ from 'lodash';

type HeadingTypesSelectProps = {
    mutator: Object;
    resources: Object;
    translate: (o: Object) => string;
};

export default function HeadingTypesSelect({ translate, ...props }: HeadingTypesSelectProps) {
  const onChangeHeadingType = (e: any) => {
    const { mutator } = props;
    const { value } = e.target;

    mutator.itemTypes.reset();
    mutator.headingType.replace(value);
    mutator.itemTypes.GET().then((r) => {
      if (r.length > 0) {
        mutator.functionCode.replace(r[0].value);
        mutator.marcAssociated.GET().then((k) => {
          if (!_.isEmpty(k)) {
            mutator.validationTag.replace(k);
            mutator.fieldTemplate.GET();
          } else {
            mutator.fieldTemplate.reset();
          }
        });
      } else {
        mutator.fieldTemplate.reset();
      }
    });
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
