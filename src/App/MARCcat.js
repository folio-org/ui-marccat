
/**
 * @format
 * @flow
 */
import * as React from 'react';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import TabControl from '../Switcher/TabControl';
import { injectCommonProp } from '../Core';
import { TAB_CONTROL_ID } from '../Utils/Constant';

type Props = {
  stripes: Object;
  resources: Object;
  translate: (o:Object) => string;
  location: Object;
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

  handleActiveTab = () => {
    switch (this.props.location.pathname) {
    case '/marccat/advancedSearch':
      return TAB_CONTROL_ID.SEARCH;
    case '/marccat/templateList':
      return TAB_CONTROL_ID.TEMPLATE;
    default:
      return TAB_CONTROL_ID.DATABASE;
    }
  };

  toggleFilterPane = () => {
    this.setState(prevState => ({ filterPaneIsVisible: !prevState.filterPaneIsVisible }));
  }

  render() {
    const { translate } = this.props;
    const { filterPaneIsVisible } = this.state;
    return (
      <Paneset static>
        { filterPaneIsVisible &&
          <Pane
            id="pane-filter"
            dismissible
            defaultWidth="20%"
            paneTitle={translate({ id: 'stripes-smart-components.searchAndFilter' })}
            onClose={this.toggleFilterPane}
          >
            <TabControl {...this.props} activateTab={this.handleActiveTab} />
          </Pane>}
        {this.props.children}
      </Paneset>
    );
  }
}

export default injectCommonProp(MARCcat);

