import React from 'react';
import { connect } from '@folio/stripes-connect';
import * as C from '../../Utils';

type SelectTagCreationProps = {
  mutator: Object,
  categoryCode: String,
  tag: String,
  ind1: String,
  ind2: String,
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
      headers: C.ENDPOINT.HEADERS,
      records: C.API_RESULT_JSON_KEY.FIELD_TEMPLATES,
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
    return (<div>{this.props.tag}</div>);
  }
}

export default connect(SelectTagCreation, C.META.MODULE_NAME);
