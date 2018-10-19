/**
 * @format
 * @flow
 */
import * as React from 'react';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import { injectCommonProp, Props } from '../core';
import { actionMenuItem } from './lib';
import SearchPanel from './Search/SearchPanel';
import SearchResults from './Search/Result/SearchResults';

type P = Props & {};
type S = {
  filterPaneIsVisible: bool;
};

/**
 * @module MARCcat
 */
class MARCcat extends React.Component<P, S> {
  constructor(props:P) {
    super(props);
    this.state = {
      filterPaneIsVisible: true,
    };
    this.toggleFilterPane = this.toggleFilterPane.bind(this);
  }

  toggleFilterPane = () => {
    this.setState(prevState => ({ filterPaneIsVisible: prevState.filterPaneIsVisible }));
  }

  render() {
    const { translate } = this.props;
    const { filterPaneIsVisible } = this.state;
    const actionMenuItems = actionMenuItem(['ui-marccat.indexes.title', 'ui-marccat.diacritic.title']);
    return (
      <Paneset static>
        {filterPaneIsVisible &&
          <Pane
            defaultWidth="25%"
            actionMenuItems={actionMenuItems}
            onClose={this.toggleFilterPane}
            paneTitle={translate({ id: 'ui-marccat.searchAndFilter' })}
          >
            <SearchPanel {...this.props} />
          </Pane>}
        <SearchResults {...this.props} />
      </Paneset>
    );
  }
}

export default injectCommonProp(MARCcat);

