// @flow
import * as React from 'react';
import { Paneset, Pane } from '@folio/stripes/components';
import type { Props } from './flow/types.js.flow';
import { SearchPanel } from './components/Search';
import PanelHistory from './components/Search/History/PanelHistory';
import * as C from './config/constants';
import { Localize } from '../../utils/Function';

const Provider = ({ filterPaneIsVisible, toggleFilterPane, children, props }: Props) => {
  return (
    <Paneset static>
      {filterPaneIsVisible &&
      <Pane
        dismissible
        defaultWidth="24%"
        actionMenu={this.searchPanelActionMenu}
        onClose={toggleFilterPane}
        paneTitle={Localize({ key: 'searchAndFilter' })}
        paneSub={C.EMPTY_STRING}
      >
        <SearchPanel {...props} />
      </Pane>}
      {children}
    </Paneset>
  );
};
