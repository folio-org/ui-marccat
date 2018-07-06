/* @flow */
import React from 'react';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import Pane from '@folio/stripes-components/lib/Pane';
import { connect } from '@folio/stripes-connect';
import Paneset from '@folio/stripes-components/lib/Paneset';
import searchResultsData from '../../../config/mock/search-results';
import * as C from '../../Utils';

class SearchResults extends React.Component<{}> {
  render() {
    const searchRes = searchResultsData.searchResults;
    return (
      <Paneset>
        <Pane>
          <MultiColumnList
            id="search-results"
            contentData={searchRes}
            visibleColumns={
              ['id', 'amicusNumber', 'title', 'name', 'date', 'date2', 'edition', 'serie', 'volume']}
            striped
          />
        </Pane>
      </Paneset>
    );
  }
}

export default connect(SearchResults, C.META.MODULE_NAME);
