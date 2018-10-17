/**
 * @format
 * @flow
 */
import * as React from 'react';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import { injectCommonProp } from '../Core';
import type Props from '../Core/type/props';
import { actionMenuItem } from '../Lib';
import SearchEngine from '../Search/SearchEngine';
import SearchResults from '../Search/Scan/SearchResults';


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
            id="pane-filter"
            defaultWidth="25%"
            dismissible
            actionMenuItems={actionMenuItems}
            paneTitle={translate({ id: 'ui-marccat.searchAndFilter' })}
            onClose={this.toggleFilterPane}
          >
            <SearchEngine {...this.props} />
          </Pane>}
        <SearchResults {...this.props} />
      </Paneset>
    );
  }
}

export default injectCommonProp(MARCcat);

