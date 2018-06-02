/**
 *
 */
/* eslint-disable no-alert, no-console */
import React from 'react';
import Pane from '@folio/stripes-components/lib/Pane';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import IconButton from '@folio/stripes-components/lib/IconButton';
import Icon from '@folio/stripes-components/lib/Icon';

const searchMenu = (
  <PaneMenu>
    <IconButton key="icon-search" icon="search" />
  </PaneMenu>
);

const lastMenu = (
  <PaneMenu>
    <IconButton key="icon-comment" icon="comment" />
    <IconButton key="icon-edit" icon="edit" />
    <IconButton key="icon-user" icon="comment" />
    <IconButton key="icon-edit" icon="edit" />
  </PaneMenu>
);

const actionMenuItems = [
  {
    label: 'New',
    onClick: () => {
      console.log('click!');
    },
  },
  {
    label: 'edit',
    href: '#hello',
  },
  {
    label: 'delete',
    href: '#export',
  },
];

const PaneHeader = (paneTitle, paneSub) => (
  <Pane actionMenuItems={actionMenuItems} searchMenu={searchMenu} lastMenu={lastMenu} defaultWidth="fill" paneTitle={paneTitle} paneSub={paneSub} onClose={() => {}}>
    <Icon icon="spinner-ellipsis" width="10px" />
  </Pane>
);

export default PaneHeader;
