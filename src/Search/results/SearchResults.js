/**
 * @format
 * @flow
 */
/* eslint-disable react/no-deprecated */
import React from 'react';
// import Icon from '@folio/stripes-components/lib/Icon';
import Pane from '@folio/stripes-components/lib/Pane';
import { connect } from '@folio/stripes-connect';
import Paneset from '@folio/stripes-components/lib/Paneset';
import { ToolbarMenu } from '../../Core';
import * as C from '../../Utils';

type SearchResultsProps = {
  stripes: Object;
  root: {
    store: {}
  };
};
type SearchResultsState = {
  results: Array;
};

class SearchResults extends React.Component<SearchResultsProps, SearchResultsState> {
  constructor(props) {
    super(props);
    this.state = {
      results: [] // eslint-disable-line
    };
  }

  render() {
    const leftMenu = <ToolbarMenu icon={['search']} />;
    const rightMenu = <ToolbarMenu icon={['bookmark', 'gear']} />;
    const formatMsg = this.props.stripes.intl.formatMessage;
    const { store } = this.props.root;
    const state = store.getState();
    const formObserved = state.form.advancedSearchForm;
    const value = formObserved.values.searchTextArea;
    return (
      <Paneset>
        <Pane
          firstMenu={leftMenu}
          lastMenu={rightMenu}
          defaultWidth="fill"
          paneTitle={formatMsg({
            id: 'ui-marccat.search.result',
          })}
          paneSub="6 Result found"
          appIcon={{ app: 'marccat' }}
        >
          {/* <MultiColumnList
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
          /> */}
          <div>
            {'you typed:' + value}
          </div>
        </Pane>
      </Paneset>
    );
  }
}

export default connect(
  SearchResults,
  C.META.MODULE_NAME,
);
