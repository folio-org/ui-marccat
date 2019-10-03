/* eslint-disable react/no-unused-prop-types */
// @flow
import * as React from 'react';
import { PaneMenu, IconButton, Button } from '@folio/stripes/components';
import classNames from 'classnames';

type ToolbarMenuProps = {
  icon: Array<any>,
  content: React.Node,
  className?: string,
  style?: Object;
  withPrinter?: boolean,
  badgeCount?: string,
  onClick: () => void;
  type?: string;
  create: boolean;
  disabled?: boolean;
  secondButton?: boolean;
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

  const { onClick, label, type, disabled, secondButton } = props;

  return (
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
      {secondButton &&
        <Button
          style={rightButton}
          buttonStyle="primary"
          onClick={onClick}
          type={type || 'button'}
          disabled={disabled}
          marginBottom0
        >
          {label}
        </Button>}
    </PaneMenu>
  );
};
