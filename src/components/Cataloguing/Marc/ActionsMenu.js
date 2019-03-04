/**
 * @format
 * @flow
 */
import React from 'react';
import {
  Dropdown,
  DropdownMenu,
  Button,
  PaneMenu,
  Icon
} from '@folio/stripes/components';
import type { Props } from '../../../core';
import style from '../../../lib/Style/Dropdown.css';

type P = Props & {
  onToggle(): void,
  open: boolean
}

export default function ActionsMenuButton({ ...props }:P) {
  const { onToggle, open } = props;

  const renderDropdownLabels = () => {
    const { translate } = props;
    return [{
      label: translate({ id: 'ui-marccat.button.new.auth' }),
      shortcut: translate({ id: 'ui-marccat.button.new.short.auth' })
    },
    {
      label: translate({ id: 'ui-marccat.button.new.bib' }),
      shortcut: translate({ id: 'ui-marccat.button.new.short.bib' })
    }];
  };

  const renderDropdDownMenu = () => {
    const labels = renderDropdownLabels();
    return (
      <React.Fragment>
        <div className={style.dropdownContainer}>
          {labels.map((l, i) => (
            <div className={style.dropdownShortcut} key={i}>
              {l.label}
              <span>{l.shortcut}</span>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  };

  return (
    <PaneMenu>
      <Dropdown
        id="actions_cataloging"
        open={open}
        onToggle={onToggle}
        group
        pullRight
      >
        <Button
          data-role="toggle"
          align="end"
          bottomMargin0
          aria-haspopup
          buttonStyle="primary"
        >
          <Icon
            icon="caret-down"
            size="small"
            iconClassName="myClass"
          >
          Actions
          </Icon>
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
