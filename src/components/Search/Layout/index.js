import React from 'react';
import RouteProvider from '../../Route/Provider';
import { SearchResults } from '..';
import SearchPane from '../Panel/SearchPane';
import { injectProps } from '../../../shared';

const Container = (props) => (
  <RouteProvider {...props}>
    <SearchPane {...props}>
      <SearchResults {...props} />
    </SearchPane>
  </RouteProvider>
);

export default injectProps(Container);
