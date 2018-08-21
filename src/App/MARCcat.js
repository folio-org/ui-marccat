
/**
 * @format
 * @flow
 */
import * as React from 'react';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import SRStatus from '@folio/stripes-components/lib/SRStatus';
import TabControl from '../Main/TabControl';
import { injectCommonProp } from '../Core/';

type Props = {
  stripes: Object;
  resources: Object;
  children: React.ReactNode;
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
    this.SRStatus = null; // eslint-disable
    this.toggleFilterPane = this.toggleFilterPane.bind(this);
  }

  toggleFilterPane = () => {
    this.setState(prevState => ({ filterPaneIsVisible: !prevState.filterPaneIsVisible }));
  }

  render() {
    const { formatMessage } = this.props.stripes.intl;
    const { filterPaneIsVisible } = this.state;
    return (
      <Paneset static>
        <SRStatus ref={(ref) => { this.SRStatus = ref; }} />
        { filterPaneIsVisible &&
          <Pane
            id="pane-filter"
            dismissible
            defaultWidth="20%"
            paneTitle={formatMessage({ id: 'stripes-smart-components.searchAndFilter' })}
            onClose={this.toggleFilterPane}
          >
            <TabControl {...this.props} />
          </Pane>}
        {this.props.children}
      </Paneset>
    );
  }
}

export default injectCommonProp(MARCcat);

