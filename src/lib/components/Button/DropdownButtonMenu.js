/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 * @format
 * @flow
 */
import React, { Fragment } from 'react';
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

export default function DropdownButtonMenu({ ...props }:P) {
  const { onToggle, open, labels, label, noDropdown, disabled } = props;

  const renderDropdDownMenu = () => {
    return (
      <Fragment>
        <div className={style.dropdownContainer}>
          {labels.map((l, i) => (
            <div className={style.dropdownShortcut} key={i} onClick={l.onClick}>
              {l.label}
              <span>{l.shortcut}</span>
            </div>
          ))}
        </div>
      </Fragment>
    );
  };

  return (
    <PaneMenu>
      <Dropdown
        id="AddPermissionDropdown"
        open={open}
        onToggle={onToggle}
        disabled={disabled}
        group
        pullRight
      >
        <Button
          data-role="toggle"
          align="end"
          bottomMargin0
          aria-haspopup
          buttonStyle="primary"
          disabled={disabled}
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
          disabled={disabled}
        >
          {renderDropdDownMenu()}
        </DropdownMenu>
      </Dropdown>
    </PaneMenu>
  );
}
