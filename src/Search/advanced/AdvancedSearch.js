/**
 * @format
 * @flow
 */
import * as React from 'react';
import { AdvanceSearchForm } from '../';


class AdvancedSearch extends React.Component<*> {
  render() {
    return (
      <AdvanceSearchForm {...this.props} />
    );
  }
}

export default AdvancedSearch;
