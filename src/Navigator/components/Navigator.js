import React from 'react';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import { connect } from '@folio/stripes-connect';
import Router from '../../router';
import NavMenu from './NavMenu';
import * as C from '../../Utils';


export interface NavItem {
  id: string;
  sectionLabel: string;
  label: string;
  to: string;
  href?: string;
  activeLink: string;
}

class Navigator extends React.Component {
  render() {
    return (
      <Paneset>
        <Pane
          defaultWidth="20%"
          paneTitle="Menu"
          paneSub=""
          appIcon={{ app: 'marccat' }}
        >
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
