import React from 'react';
import { connect } from '@folio/stripes-connect';
import Select from '@folio/stripes-components/lib/Select';
import * as C from '../../Utils';

type SelectFirstCorrelationProps = {
  mutator: Object;
  resources: Object;
  marcCategory: String;
};
type SelectFirstCorrelationState = {
};

class SelectFirstCorrelation extends React.Component<SelectFirstCorrelationProps, SelectFirstCorrelationState> {
  static manifest = Object.freeze({
    marcCategoryObj: {},
    firstCorrelation: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: `heading-types?marcCategory=%{marcCategoryObj}&lang=${C.ENDPOINT.DEFAULT_LANG}`,
      headers: C.ENDPOINT.HEADERS,
      records: 'headingTypes',
    }
  });

  constructor(props) {
    super(props);
    this.props.mutator.marcCategoryObj.replace(this.props.marcCategory);
  }

  render() {
    const { resources: { firstCorrelation } } = this.props;
    let options = {};
    if (firstCorrelation && firstCorrelation.hasLoaded) {
      options = firstCorrelation.records.map((element) => (
        <option key={element.value} value={element.value}>{element.label}</option>
      ));
    }
    return (
      <div>
        {firstCorrelation && firstCorrelation.hasLoaded &&
        <Select
          native
        >
          {options}
        </Select>
        }
      </div>
    );
  }
}

export default connect(SelectFirstCorrelation, C.META.MODULE_NAME);
