/**
 * @format
 * @flow
 */
import * as React from 'react';
import { Paneset, Pane, Row, Col, Headline } from '@folio/stripes/components';
import { injectCommonProp, Props } from './core';
import { SearchPanel } from './components/Search';
import * as C from './utils/Constant';

type P = Props & {};
type S = {
};

/**
 * @module MARCcat
 */
class MARCcat extends React.Component<P, S> {
  searchPanelActionMenu = () => {
    const { translate } = this.props;
    return (
        <Headline size="small" margin="medium" tag="h3">
          {translate({id:"ui-marccat.search.actionmenu.title"})}
        </Headline>
    );
  };

  render() {
    const { translate, filterPaneIsVisible, toggleFilterPane, children } = this.props;
    return (
      <Paneset static>
        {filterPaneIsVisible &&
          <Pane
            dismissible
            defaultWidth="18%"
            actionMenu={this.searchPanelActionMenu}
            onClose={toggleFilterPane}
            paneTitle={translate({ id: 'ui-marccat.searchAndFilter' })}
            paneSub={C.EMPTY_MESSAGE}
          >
            <SearchPanel {...this.props} />
          </Pane>}
        {...children}
      </Paneset>
    );
  }
}
export default injectCommonProp(MARCcat);
