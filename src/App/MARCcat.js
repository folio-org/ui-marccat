
/**
 * @format
 * @flow
 */
import * as React from 'react';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import { injectCommonProp, EmptyMessage, actionMenuItem } from '../Core';
import { LogicalView } from '../DB';

type Props = {
  translate: (o:Object) => string;
  children: any;
};
type State = {
  filterPaneIsVisible: bool;
};

/**
 * @module MARCcat
 */
class MARCcat extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      filterPaneIsVisible: true,
    };
    this.toggleFilterPane = this.toggleFilterPane.bind(this);
  }

  toggleFilterPane = () => {
    this.setState(prevState => ({ filterPaneIsVisible: !prevState.filterPaneIsVisible }));
  }

  render() {
    const { translate } = this.props;
    const { filterPaneIsVisible } = this.state;
    const actionMenuItems = actionMenuItem(['ui-marccat.indexes.title', 'ui-marccat.diacritic.title']);
    return (
      <Paneset static>
        { filterPaneIsVisible &&
          <Pane
            id="pane-filter"
            dismissible
            actionMenuItems={actionMenuItems}
            defaultWidth="25%"
            paneTitle={translate({ id: 'ui-marccat.searchAndFilter' })}
            onClose={this.toggleFilterPane}
          >
            <LogicalView {...this.props} />
          </Pane>}
        <EmptyMessage {...this.props} />
      </Paneset>
    );
  }
}

export default injectCommonProp(MARCcat);

