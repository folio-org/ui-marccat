import React from 'react';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import Icon from '@folio/stripes-components/lib/Icon';
import { connect } from '@folio/stripes-connect';
import { NavMenu, LogicalView } from '../';
import * as C from '../../Utils';
import { ToolbarMenu } from '../../Core';

type NavigatorProps = {
  stripes: Object;
  children: Object;
  resources: Object;
};
type NavigatorState = {
  isOpen: bool;
};

class Navigator extends React.Component<NavigatorProps, NavigatorState> {
  render() {
    const { formatMessage } = this.props.stripes.intl;
    const isPending = this.props.resources.categories;
    const rightMenu = <ToolbarMenu icon={['info']} />;
    return (!isPending || !isPending.hasLoaded) ? (<Icon icon="spinner-ellipsis" />) :
      (
        <Paneset>
          <Pane
            dismissible
            onClose={this.handleClose}
            defaultWidth="30%"
            lastMenu={rightMenu}
            paneTitle={formatMessage({
              id: 'ui-marccat.navigator.title',
            })}
            appIcon={{ app: 'marccat' }}
          >
            <LogicalView {...this.props} label="Database" />
            <NavMenu {...this.props} />
          </Pane>
          {this.props.children}
        </Paneset>
      );
  }
}
export default connect(
  Navigator,
  C.META.MODULE_NAME,
);
