/**
 * @format
 * @flow
 */
import * as React from 'react';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import PropTypes from 'prop-types';
import { LogicalView } from '../DB';
import { injectCommonProp } from '../Core';
import type Props from '../Core/type/props';
import { actionMenuItem } from '../Lib';
import SearchEngine from '../Search/SearchEngine';
import ScanBrowsing from '../Scan/ScanBrowsing';
import RowDetails from '../Scan/RowDetails';


type P = Props & {};
type S = {
  filterPaneIsVisible: bool;
};

/**
 * @module MARCcat
 */
class MARCcat extends React.Component<P, S> {
  static contextTypes = {
    store: PropTypes.object,
  };
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
    const myState = this.context.store.getState();
    return (
      <Paneset static>
        {filterPaneIsVisible &&
          <Pane
            id="pane-filter"
            dismissible
            actionMenuItems={actionMenuItems}
            defaultWidth="25%"
            paneTitle={translate({ id: 'ui-marccat.searchAndFilter' })}
            onClose={this.toggleFilterPane}
          >
            <LogicalView
              label={translate({ id: 'ui-marccat.database.label' })}
              {...this.props}
            />
            <SearchEngine {...this.props} />
          </Pane>}
        <ScanBrowsing {...this.props} />
      </Paneset>
    );
  }
}

export default injectCommonProp(MARCcat);

