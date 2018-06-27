/* @flow */
import React from 'react';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import Pane from '@folio/stripes-components/lib/Pane';
import Paneset from '@folio/stripes-components/lib/Paneset';
import searchResultsData from '../Mock/search-results';

class SearchResults extends React.Component {
  render() {
    return (
      <Paneset>
        <Pane>
          <p> Ciao </p>
          <MultiColumnList
            id="search-results"
            contentData={searchResultsData}
          />
        </Pane>
      </Paneset>
    );
  }
}

export default SearchResults;
