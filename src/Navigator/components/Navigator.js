import React from 'react';
import NavList from '@folio/stripes-components/lib/NavList';
import Router from '../../router';
import NavMenu from './NavMenu';

export interface NavItem {
  id: string;
  sectionLabel: string;
  label: string;
  to: string;
  href?: string;
  activeLink: string;
}

export default class Navigator extends React.Component {
  render() {
    const item = require('../../../config/static/menu');
    const navItem: Array<NavItem> = [];
    return (
      <div>
        <NavList>
          <NavMenu item={navItem} />
        </NavList>
        <main>
          <Router {...this.props} />
        </main>
      </div>
    );
  }
}
