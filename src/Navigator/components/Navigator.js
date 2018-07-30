import React from 'react';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import { connect } from '@folio/stripes-connect';
import { NavMenu, LogicalView } from '../';
import * as C from '../../Utils';

type NavigatorProps = {
  stripes: Object;
  children: Object;
  resources: Object;
};
type NavigatorState = {};

class Navigator extends React.Component<NavigatorProps, NavigatorState> {
  render() {
    const { formatMessage } = this.props.stripes.intl;

    return (
      <Paneset>
        <Pane
          dismissible
          onClose={() => {}}
          defaultWidth="30%"
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
