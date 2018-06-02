import React from 'react';
import IconButton from '@folio/stripes-components/lib/IconButton';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import css from './Navigator.css';
import CatalogingLoader from '../Loader';

class NavigatorEmpty extends React.Component {
  render() {
    const searchMenu = (
      <PaneMenu>
        <IconButton key="icon-search" icon="search" />
      </PaneMenu>
    );

    const lastMenu = (
      <PaneMenu>
        <IconButton key="icon-add" icon="comment" />
      </PaneMenu>
    );


    return (
      <Paneset static style={css.root}>
        <Pane
          firstMenu={searchMenu}
          lastMenu={lastMenu}
          defaultWidth="fill"
          paneTitle="Cataloging"
          paneSub="0 result found"
          onClose={() => { }}
          appIcon={{ app: 'cataloging' }}
        >
          <CatalogingLoader />
          <h1>No result found</h1>
        </Pane>
      </Paneset>

    );
  }
}


export default NavigatorEmpty;
