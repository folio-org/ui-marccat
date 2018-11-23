/**
 * @format
 * @flow
 */
import * as React from 'react';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import { injectCommonProp, Props } from './core';
import { SearchPanel } from './components/Search/';
import * as C from './utils/Constant';

type P = Props & {};
type S = {
};

/**
 * @module MARCcat
 */
class MARCcat extends React.Component<P, S> {
  constructor(props:P) {
    super(props);
    this.renderActionMenuItems = this.renderActionMenuItems.bind(this);
  }

  renderActionMenuItems = () => {
    return [
      { label: this.props.translate({ id: 'ui-marccat.indexes.title' }) },
      { label: this.props.translate({ id: 'ui-marccat.diacritic.title' }) }
    ];
  };

  render() {
    const { translate, filterPaneIsVisible, toggleFilterPane } = this.props;
    return (
      <Paneset static>
        {filterPaneIsVisible &&
          <Pane
            dismissible
            defaultWidth="18%"
            actionMenuItems={this.renderActionMenuItems()}
            onClose={toggleFilterPane}
            paneTitle={translate({ id: 'ui-marccat.searchAndFilter' })}
            paneSub={C.EMPTY_MESSAGE}
          >
            <SearchPanel {...this.props} />
          </Pane>}
        {...this.props.children}
      </Paneset>
    );
  }
}
export default injectCommonProp(MARCcat);

