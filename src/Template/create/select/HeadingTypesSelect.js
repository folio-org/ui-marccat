/**
 * @format
 * @flow
 */
import * as React from 'react';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Select from '@folio/stripes-components/lib/Select';
import { Field } from 'redux-form';
import { injectIntl } from 'react-intl';

type HeadingTypesSelectProps = {
    mutator: Object;
    resources: Object;
    intl: Object;
};

function HeadingTypesSelect({ ...props }: HeadingTypesSelectProps) {
  const onChangeHeadingType = (e: any) => {
    const { mutator } = props;
    const { value } = e.target;
    mutator.itemTypes.reset();
    mutator.headingType.replace(value);
    mutator.itemTypes.GET();
  };
  return (
    <Row>
      {props.resources.headingTypes && props.resources.headingTypes.records &&
      <Col xs={6}>
        <Field
          label={`${props.intl.formatMessage({ id: 'ui-marccat.heading.type' })} *`}
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
export default injectIntl(HeadingTypesSelect);
