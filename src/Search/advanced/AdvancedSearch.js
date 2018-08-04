/**
 * @format
 * @flow
 */
import React from 'react';
import { connect } from '@folio/stripes-connect';
import { AdvanceSearchForm } from '../';
import * as C from '../../Utils';

class AdvancedSearch extends React.Component<*> {
  render() {
    return (
      <AdvanceSearchForm {...this.props} />
    );
  }
}

export default connect(
  AdvancedSearch,
  C.META.MODULE_NAME,
);
