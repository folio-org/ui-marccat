/**
 * @format
 * @flow
 */
/* eslint-disable react/no-deprecated */
import React from 'react';
import Pane from '@folio/stripes-components/lib/Pane';
import { connect } from 'react-redux';
import Paneset from '@folio/stripes-components/lib/Paneset';
import { AdvanceSearchResult } from '../../';
import { ToolbarMenu } from '../../../Core';

type SearchResultsProps = {
  stripes: Object;
  searchInput: string;
  actionMenuItems: Object;
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
    const { searchInput, actionMenuItems } = this.props;
    return (
      <Paneset>
        <Pane
          firstMenu={leftMenu}
          lastMenu={rightMenu}
          actionMenuItems={actionMenuItems}
          defaultWidth="fill"
          paneTitle={formatMsg({
            id: 'ui-marccat.search.result',
          })}
          paneSub={(searchInput) ? 'Result found for: ' + searchInput : 'No Result found'}
          appIcon={{ app: 'marccat' }}
        >
          <AdvanceSearchResult {...this.props} />
        </Pane>
      </Paneset>
    );
  }
}

export default connect(
  (state) => ({
    searchInput: state.marccat.form.fieldValue || '',
  }),
  (dispatch) => ({}), null // eslint-disable-line
)(SearchResults);
