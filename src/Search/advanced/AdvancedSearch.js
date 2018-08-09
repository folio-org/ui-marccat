/**
 * @format
 * @flow
 */
import * as React from 'react';
import { AdvanceSearchForm } from '../';
import withConnect from '../../Core/Provider/withConnect';


class AdvancedSearch extends React.Component<*> {
  render() {
    return (
      <AdvanceSearchForm {...this.props} />
    );
  }
}

export default withConnect(AdvancedSearch);
