import React from 'react';
import SearchAndSort from '@folio/stripes-smart-components/lib/SearchAndSort';
import { connect } from '@folio/stripes-connect';
import * as C from '../Utils';

class MARCCat extends React.Component<*> {
  static manifest = Object.freeze({
    initializedFilterConfig: { initialValue: false },
    query: { initialValue: {} },
    resultCount: { initialValue: 30 },
  });

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SearchAndSort {...this.props} />
    );
  }
}

export default connect(
  MARCCat,
  C.META.MODULE_NAME,
);

