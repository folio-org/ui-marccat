import React from 'react';
import { connect } from '@folio/stripes-connect';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import * as C from '../../Utils';
import SelectFirstCorrelation from './SelectFirstCorrelation';

type SelectTagCreationProps = {
  mutator: Object,
  categoryCode: String,
  tag: String,
  ind1: String,
  ind2: String,
  resources: Object,
}

class SelectTagCreation extends React.Component<SelectTagCreationProps, SelectTagCreationState> {
  static manifest = Object.freeze({
    categoryCodeObj: {},
    ind1Obj: {},
    ind2Obj: {},
    codeObj: {},
    fieldTemplate: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: `field-template?categoryCode=%{categoryCodeObj}&ind1=%{ind1Obj}&ind2=%{ind2Obj}&code=%{codeObj}&lang=${C.ENDPOINT.DEFAULT_LANG}&headerType=0&leader=''&valueField=''`,
      headers: C.ENDPOINT.HEADERS
    }
  });

  constructor(props) {
    super(props);
    this.props.mutator.categoryCodeObj.replace(this.props.categoryCode);
    this.props.mutator.ind1Obj.replace(this.props.ind1);
    this.props.mutator.ind2Obj.replace(this.props.ind2);
    this.props.mutator.codeObj.replace(this.props.tag);
  }

  render() {
    const { resources: { fieldTemplate } } = this.props;
    let firstCorrelationValue;
    if (fieldTemplate && fieldTemplate.hasLoaded) {
      firstCorrelationValue = fieldTemplate.records.map(element => element['variable-field'].firstCorrelation || element.fixedField.firstCorrelation);
    }

    return (
      <Row>
        <Col xs={12}>
          {fieldTemplate && fieldTemplate.hasLoaded &&
          <SelectFirstCorrelation {...this.props} marcCategory={firstCorrelationValue} />
          }
        </Col>
      </Row>
    );
  }
}

export default connect(SelectTagCreation, C.META.MODULE_NAME);
