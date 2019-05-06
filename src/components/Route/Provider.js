// @flow
import * as React from 'react';
import Router from './Router';
import SearchPane from '../Search/Panel/SearchPane';
import { SearchPanel } from '../Search';
import { injectProps } from '../../shared';

const Provider = ({ ...props }) => {
  return (
    <SearchPane
      {...props}
      component={<SearchPanel {...props} />}
    >
      <Router
        {...props}
      />
    </SearchPane>
  );
};

export default injectProps(Provider);
