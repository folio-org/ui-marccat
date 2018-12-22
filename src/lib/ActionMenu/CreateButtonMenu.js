import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Row,
  Col,
  Dropdown,
  DropdownMenu,
  Button,
  PaneMenu,
  Icon
} from '@folio/stripes/components';
import type { Props } from '../../core';

type P = Props & {
  onToggle(): void,
  open: boolean
}

export default function CreateButtonMenu({ ...props }:P) {
  const { onToggle, open } = props;

  const renderDropdDownMenu = () => {
    return (
      <React.Fragment>
        <div>pippo</div>
        <div>pluto</div>
      </React.Fragment>
    );
  };

  return (
    <PaneMenu>
      <Dropdown
        id="AddPermissionDropdown"
        open
        onToggle={onToggle}
        group
        pullRight
      >
        <Button
          data-role="toggle"
          align="end"
          bottomMargin0
          aria-haspopup="true"
          buttonStyle="primary"
        >
          <FormattedMessage id="ui-marccat.search.record.new.keyboard" />
          <Icon
            icon="caret-down"
            size="small"
            iconClassName="myClass"
          />
        </Button>
        <DropdownMenu
          data-role="menu"
          aria-label="available permissions"
          onToggle={onToggle}
        >
          {renderDropdDownMenu()}
        </DropdownMenu>
      </Dropdown>
    </PaneMenu>
  );
}
