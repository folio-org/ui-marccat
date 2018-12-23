/**
 * @format
 * @flow
 */
/* eslint-disable react/no-unused-prop-types */
import * as React from 'react';
import { PaneMenu, IconButton, IfPermission, Button } from '@folio/stripes/components';
import classNames from 'classnames';

type ToolbarMenuProps = {
  icon: Array,
  content: React.node,
  className?: string,
  style?: Object;
  withPrinter?: bool,
  badgeCount?: string,
  onClick: () => void;
  type?: string;
  create: bool;
  disabled?: bool;
  label?: React.Component<any>;
  stripes: Object;
};

export const ToolbarMenu = (props: ToolbarMenuProps) => {
  const { icon, onClick, className, badgeCount } = props;
  return (
    <PaneMenu>
      {
        icon.map((i) => {
          return (badgeCount !== undefined) ? (
            <IconButton
              key={`icon-${i}`}
              icon={i}
              badgeCount={badgeCount}
              onClick={onClick}
              className={classNames(className)}
            />
          )
            :
            (<IconButton
              key={`icon-${i}`}
              icon={i}
              onClick={onClick}
              className={classNames(className)}
            />);
        })
      }
    </PaneMenu>
  );
};

export const ToolbarButtonMenu = (props: ToolbarMenuProps) => {
  const rightButton = {
    marginRight: '10px',
    float: 'right',
  };

  const { onClick, label, type, disabled } = props;

  return (
    <IfPermission perm="marccat.create">
      <PaneMenu>
        <Button
          style={rightButton}
          buttonStyle="primary"
          onClick={onClick}
          type={type || 'button'}
          disabled={disabled}
          marginBottom0
        >
          {label}
        </Button>
      </PaneMenu>
    </IfPermission>
  );
};
