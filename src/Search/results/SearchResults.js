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
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ToolbarMenu, BehaviorSubscription } from '../../Core';
import * as C from '../../Utils';

type SearchResultsProps = {
  stripes: Object;
};
type SearchResultsState = {};

class SearchResults extends React.Component<SearchResultsProps, SearchResultsState> {
  createBehaviorSubject(initialValue = 3) {
    const behaviorSubject = new BehaviorSubject();
    if (initialValue) {
      behaviorSubject.next(initialValue);
    }
    return behaviorSubject;
  }

  render() {
    const leftMenu = <ToolbarMenu icon={['search']} />;
    const rightMenu = <ToolbarMenu icon={['bookmark', 'gear']} />;
    const formatMsg = this.props.stripes.intl.formatMessage;
    const observable = this.createBehaviorSubject();

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
          <BehaviorSubscription source={observable}>
            {value => 'There are ' + value + ' results'}
          </BehaviorSubscription>
        </Pane>
      </Paneset>
    );
  }
}

export default connect(
  SearchResults,
  C.META.MODULE_NAME,
);
