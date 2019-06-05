/* eslint-disable react/no-unused-prop-types */
//
import * as React from 'react';
import { PaneMenu, IconButton, Button } from '@folio/stripes/components';
import classNames from 'classnames';


export const ToolbarMenu = (props) => {
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

export const ToolbarButtonMenu = (props) => {
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
