/**
 * @format
 * @flow
 */
/* eslint-disable react/no-deprecated */
/* eslint-disable react/prop-types */

import React from 'react';
import Pane from '@folio/stripes-components/lib/Pane';
import { connect } from 'react-redux';
import Paneset from '@folio/stripes-components/lib/Paneset';
import { ToolbarMenu } from '../../Core';
import { searchUsers } from '../../Redux/actions/ActionCreator';
import AdvanceSearchResult from './AdvanceSearchResult';

type SearchResultsProps = {
  stripes: Object;
  root: {
    store: {}
  };
  query: string;
  handleSearch: () => void;
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
    this.handleAdvancedSearch = this.handleAdvancedSearch.bind(this);
  }

  componentDidMount() {
    //this.handleAdvancedSearch(this.props.query);
  }

  componentWillReceiveProps(nextProps) {
    // if (this.props.query !== nextProps.query) {
    //   this.handleAdvancedSearch(nextProps.query);
    // }
  }

  handleAdvancedSearch(query) {
    this.props.handleSearch(query);
  }


  render() {
    const leftMenu = <ToolbarMenu icon={['search']} />;
    const rightMenu = <ToolbarMenu icon={['bookmark', 'gear']} />;
    const formatMsg = this.props.stripes.intl.formatMessage;
    const { store } = this.props.root;
    const state = store.getState();
    const formObserved = state.form.advancedSearchForm;
    const value = formObserved.values.searchTextArea;

    const {
      results,
      searchInPreFlight
    } = this.props;

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
          <AdvanceSearchResult
            results={results}
            loading={searchInPreFlight}
          />
          <div>
            {'you typed:' + (value || 'anything') }
          </div>
        </Pane>
      </Paneset>
    );
  }
}

export default connect(
  ({ userResults, searchInPreFlight }) => ({
    query: 'Manzoni',
    results: userResults,
    searchInPreFlight
  }),
  { searchUsers }
)(SearchResults);
