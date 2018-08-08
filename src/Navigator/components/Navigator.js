/**
 * @format
 * @flow
 */
import React from 'react';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import Icon from '@folio/stripes-components/lib/Icon';
import { connect } from '@folio/stripes-connect';
import { NavMenu, LogicalView } from '../';
// import { ToolbarMenu } from '../../Core';
import { VersionModal } from '../../Modal/';
import * as C from '../../Utils';

type NavigatorProps = {
  stripes: Object;
  children: Object;
  resources: Object;
};
type NavigatorState = {
  isOpen: bool;
};
class Navigator extends React.Component<NavigatorProps, NavigatorState> {
  constructor(props) {
    super(props);
    this.handleVersionModal = this.handleVersionModal.bind(this);
  }

  handleVersionModal = () => {
  };

  render() {
    const { formatMessage } = this.props.stripes.intl;
    const isPending = this.props.resources.categories;
    // const rightMenu = <ToolbarMenu icon={['info']} onClick={this.handleVersionModal} className={css.customSize} />;
    return (!isPending || !isPending.hasLoaded) ? (<Icon icon="spinner-ellipsis" />) :
      (
        <Paneset>
          <Pane
            dismissible
            onClose={this.handleClose}
            defaultWidth="30%"
            // lastMenu={rightMenu}
            paneTitle={formatMessage({
              id: 'ui-marccat.navigator.title',
            })}
            appIcon={{ app: 'marccat' }}
          >
            <LogicalView {...this.props} label="Database" />
            <NavMenu {...this.props} />
            <VersionModal open />
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
