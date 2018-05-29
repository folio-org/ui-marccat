import React from 'react';
import NavList from '@folio/stripes-components/lib/NavList';
import NavListSection from '@folio/stripes-components/lib/NavListSection';
import NavListItem from '@folio/stripes-components/lib/NavListItem';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';


class Menu extends React.Component {
  render() {
    return (
      <Paneset>
        <Pane defaultWidth="20%" paneTitle="Menu">
          <NavList>
            <NavListSection label="Templates" activeLink="/active-link-here">
              <NavListItem to="/cataloging/newTemplate">New template</NavListItem>
              <NavListItem to="/cataloging/templateList">Template list</NavListItem>
            </NavListSection>
            <br />
            <NavListSection label="Search" activeLink="/active-link-here">
              <NavListItem to="/cataloging/simpleSearch">Simple Search</NavListItem>
              <NavListItem to="/cataloging/advancedSearch">Advanced Search</NavListItem>
            </NavListSection>
          </NavList>
        </Pane>
        <Switch>
          <Route path="/cataloging/newTemplate" />
          <Route path="/cataloging/templateList" />
          <Route path="/cataloging/simpleSearch" />
          <Route path="/cataloging/advancedSearch" />
        </Switch>
      </Paneset>
    );
  }
}
export default Menu;
