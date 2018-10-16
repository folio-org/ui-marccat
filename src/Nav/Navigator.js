import React from 'react';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import type Props from '../Core/type/props';
import { actionMenuItem, EmptyMessage } from '../Lib';
import SearchEngine from '../Search/SearchEngine';

type P = Props & {};
type S = {
  filterPaneIsVisible: bool;
};

export default class Navigator extends React.Component<P, S> {
  render() {
    const { translate } = this.props;
    const actionMenuItems = actionMenuItem(['ui-marccat.indexes.title', 'ui-marccat.diacritic.title']);
    return (
      <Paneset static>
        <Pane
          id="pane-filter"
          dismissible
          defaultWidth="25%"
          actionMenuItems={actionMenuItems}
          paneTitle={translate({ id: 'ui-marccat.searchAndFilter' })}
          onClose={() => {}}
        >
          <SearchEngine {...this.props} />
        </Pane>
        <EmptyMessage {...this.props} />
      </Paneset>
    );
  }
}
