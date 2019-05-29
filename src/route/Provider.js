// @flow
import * as React from 'react';
import Router from './Router';
import SearchPane from '../components/Search/Panel/SearchPane';
import { SearchPanel } from '../components/Search';
import { withProps } from '../shared';

const Provider = ({ ...props }) => {
  return (
    <SearchPane
      {...props}
      component={<SearchPanel {...props} />}
    >
      <Router {...props} />
    </SearchPane>
  );
};

export default withProps(Provider);
