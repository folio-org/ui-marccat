/**
 * @format
 * @flow
 */
import * as React from 'react';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Select from '@folio/stripes-components/lib/Select';
import { Field } from 'redux-form';
import _ from 'lodash';

type ItemTypesSelectProps = {
    mutator: Object;
    resources: Object;
    translate: (o: Object) => string;
};

export default function ItemTypesSelect({ translate, ...props }: ItemTypesSelectProps) {
  const onChangeItemType = (e: any) => {
    const { mutator } = props;
    const { value } = e.target;
    mutator.functionCodes.reset();
    mutator.itemType.replace(value);
    mutator.functionCodes.GET();
    mutator.marcAssociated.GET().then((k) => {
      if (!_.isEmpty(k)) {
        mutator.validationTag.replace(k);
        mutator.fieldTemplate.GET();
      } else {
        mutator.fieldTemplate.reset();
        mutator.validationTag.reset();
      }
    });
  };
  const itemTypesValues = (props.resources.itemTypes || {}).records || [];
  return (
    <Row>
      <Col xs={6}>
        {props.resources.itemTypes && props.resources.itemTypes.hasLoaded &&
        itemTypesValues.length > 0 &&
        <Field
          label={translate({ id: 'ui-marccat.item.type' })}
          component={Select}
          name="itemType"
          id="itemType-id"
          dataOptions={itemTypesValues}
          onChange={onChangeItemType}
        />
        }
      </Col>
    </Row>
  );
}
