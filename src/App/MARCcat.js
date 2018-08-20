
/**
 * @format
 * @flow
 */
import * as React from 'react';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import SRStatus from '@folio/stripes-components/lib/SRStatus';
import { connect } from '@folio/stripes-connect';
import { ToolbarMenu, EmptyMessage } from '../Core';
import * as C from '../Utils';
import LogicalView from '../Main/LogicalView';

type Props = {
  stripes: Object;
};
type State = {
  filterPaneIsVisible: bool;
};

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
    const leftMenu = <ToolbarMenu icon={['search']} onClick={this.toggleFilterPane} />;
    const rightMenu = <ToolbarMenu icon={['bookmark', 'gear']} />;
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
            <LogicalView {...this.props} />
          </Pane>}
        <Pane
          defaultWidth="fill"
          firstMenu={leftMenu}
          lastMenu={rightMenu}
          paneTitle={formatMessage({
            id: 'ui-marccat.app.title',
          })}
          paneSub={formatMessage({
            id: 'ui-marccat.noResult',
          })}
          appIcon={{ app: 'marccat' }}
        >
          <EmptyMessage
            icon="left-arrow"
            label={formatMessage({
              id: 'ui-marccat.initial.title',
            })}
          />
        </Pane>
      </Paneset>
    );
  }
}

export default connect(
  MARCcat,
  C.META.MODULE_NAME,
);

