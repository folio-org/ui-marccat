/**
 * @format
 * @flow
 */
/* eslint-disable react/no-deprecated */
import React from 'react';
import Icon from '@folio/stripes-components/lib/Icon';
import Pane from '@folio/stripes-components/lib/Pane';
import { connect } from '@folio/stripes-connect';
import Paneset from '@folio/stripes-components/lib/Paneset';
import { ToolbarMenu, EventBus } from '../../Core';
import * as C from '../../Utils';

type SearchResultsProps = {
  stripes: Object;
};
type SearchResultsState = {};

const bus = new EventBus();

class SearchResults extends React.Component<SearchResultsProps, SearchResultsState> {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.addEvent = this.addEvent.bind(this);
  }

  // Listen for event
  componentWillMount() {
    bus.subscribeOn('TODO_ADDED', this.addEvent);
  }

  // Remove listener
  // componentWillUnmount() {
  //   bus.unsubscribe('TODO_ADDED', this.addEvent);
  // }

  addEvent() {
    alert('newItem');
  }

  render() {
    const leftMenu = <ToolbarMenu icon={['search']} />;
    const rightMenu = <ToolbarMenu icon={['bookmark', 'gear']} />;
    const formatMsg = this.props.stripes.intl.formatMessage;
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
          <Icon icon="spinner-ellipsis" />
        </Pane>
      </Paneset>
    );
  }
}

export default connect(
  SearchResults,
  C.META.MODULE_NAME,
);
