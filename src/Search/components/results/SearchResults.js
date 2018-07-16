/* @flow */
import React from 'react';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import Pane from '@folio/stripes-components/lib/Pane';
import { connect } from '@folio/stripes-connect';
import Paneset from '@folio/stripes-components/lib/Paneset';
import * as C from '../../../Utils';

const searchResultsData = require('../../../../config/mock/search-results');

class SearchResults extends React.Component<{}> {
  render() {
    const searchRes = searchResultsData;
    return (
      <Paneset>
        <Pane>
          <MultiColumnList
            id="search-results"
            contentData={searchRes}
            visibleColumns={[
              'id',
              'amicusNumber',
              'title',
              'name',
              'date',
              'date2',
              'edition',
              'serie',
              'volume',
            ]}
            striped
          />
        </Pane>
      </Paneset>
    );
  }
}

export default connect(
  SearchResults,
  C.META.MODULE_NAME,
);
