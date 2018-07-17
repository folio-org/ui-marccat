import React from 'react';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import { connect } from '@folio/stripes-connect';
import Router from '../../router';
import { NavMenu, LogicalView } from '../';
import * as C from '../../Utils';


export interface NavItem {
  id: string;
  sectionLabel: string;
  label: string;
  to: string;
  href?: string;
  activeLink: string;
}

type NavigatorProps = {
  stripes: Object;
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
          paneSub={formatMessage({
            id: 'ui-marccat.diacritic.title',
          }).toLowerCase()}
          appIcon={{ app: 'marccat' }}
        >
          <LogicalView {...this.props} label="Database"/>
          <NavMenu {...this.props} />
        </Pane>
        <Router {...this.props} />
      </Paneset>
    );
  }
}
export default connect(
  Navigator,
  C.META.MODULE_NAME,
);
