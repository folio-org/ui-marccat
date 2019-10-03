// @flow
import * as React from 'react';
import { Button, Dropdown, DropdownMenu, Icon } from '@folio/stripes/components';
import type { Props } from '../../../flow/types.js.flow';
import { Localize } from '../../../shared/utils/Function';
import renderDropdDownMenu from '../../../shared/lib/Message/DropdownLabels';

import style from '../Style/index.css';

export default ({ ...props }: Props) => {
  const { labels, open, onToggle, noDropdown, disabled, label } = props;
  return (
    <Dropdown
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
        buttonClass={style['mr-8']}
        buttonStyle="primary"
        disabled={disabled}
      >
        <Icon
          icon="plus-sign"
          size="small"
        >
          {Localize({ key: label })}
        </Icon>
        {!noDropdown &&
          <Icon
            icon="caret-down"
            size="small"
          />}
      </Button>
      <DropdownMenu
        data-role="menu"
        aria-label="create record"
        onToggle={onToggle}
        disabled={disabled}
      >
        {renderDropdDownMenu(labels)}
      </DropdownMenu>
    </Dropdown>
  );
};
