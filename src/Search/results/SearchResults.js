/* @flow */
import React from 'react';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import Pane from '@folio/stripes-components/lib/Pane';
import { connect } from '@folio/stripes-connect';
import Paneset from '@folio/stripes-components/lib/Paneset';
import * as C from '../../Utils';

type SearchResultsProps = {
  stripes: Object;
};
type SearchResultsState = {};


class SearchResults extends React.Component<SearchResultsProps, SearchResultsState> {
  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;
    return (
      <Paneset>
        <Pane
          dismissible
          onClose={() => {}}
          defaultWidth="fill"
          paneTitle={formatMsg({
            id: 'ui-marccat.search.result',
          })}
          paneSub="6 Result found"
          appIcon={{ app: 'marccat' }}
        >
          <MultiColumnList
            id="search-results"
            contentData={{}}
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
