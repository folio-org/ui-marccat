/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
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
import style from '../../Style/Dropdown.css';

type P = Props & {
  onToggle(): void,
  open: boolean
}

export default function CreateButtonMenu({ ...props }:P) {
  const { onToggle, open, labels, label, noDropdown } = props;

  const renderDropdDownMenu = () => {
    return (
      <React.Fragment>
        <div className={style.dropdownContainer}>
          {labels.map((l, i) => (
            <div className={style.dropdownShortcut} key={i} onClick={l.onClick}>
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
        id="AddPermissionDropdown"
        open={open}
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
          <Icon
            icon="plus-sign"
            size="small"
            iconClassName="myClass"
          >
            {label}
          </Icon>
          {!noDropdown &&
          <Icon
            icon="caret-down"
            size="small"
            iconClassName="myClass"
          />}
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
