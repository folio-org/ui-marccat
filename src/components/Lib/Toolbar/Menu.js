/* eslint-disable react/no-unused-prop-types */
import * as React from 'react';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import IconButton from '@folio/stripes-components/lib/IconButton';
import Button from '@folio/stripes-components/lib/Button';
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
  label?: string;
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
          ) : (<IconButton
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
  const { formatMessage } = props.stripes.intl;
  return (
    <PaneMenu>
      <Button
        style={rightButton}
        id="create-new-template"
        buttonStyle="primary"
        onClick={onClick}
        type={type || 'button'}
        disabled={disabled}
        marginBottom0
      >{formatMessage({ id: label })}
      </Button>
    </PaneMenu>
  );
};

