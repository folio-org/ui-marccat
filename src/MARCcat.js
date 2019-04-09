/**
 * @format
 * @flow
 */
import * as React from 'react';
import { Paneset, Pane } from '@folio/stripes/components';
import { injectCommonProp, Props } from './core';
import { SearchPanel } from './components/Search';
import PanelHistory from './components/Search/History/PanelHistory';
import * as C from './shared/Constants';

/**
 * @module MARCcat
 */
class MARCcat extends React.Component<Props, {}> {
  searchPanelActionMenu = () => {
    return (
      <PanelHistory {...this.props} />
    );
  };

  render() {
    const { translate, filterPaneIsVisible, toggleFilterPane, children } = this.props;
    return (
      <Paneset static>
        {filterPaneIsVisible &&
          <Pane
            dismissible
            defaultWidth="24%"
            actionMenu={this.searchPanelActionMenu}
            onClose={toggleFilterPane}
            paneTitle={translate({ id: 'ui-marccat.searchAndFilter' })}
            paneSub={C.EMPTY_STRING}
          >
            <SearchPanel {...this.props} />
          </Pane>}
        {children}
      </Paneset>
    );
  }
}
export default injectCommonProp(MARCcat);
