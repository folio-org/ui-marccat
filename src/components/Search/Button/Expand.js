import React from 'react';
import { Icon, Button } from '@folio/stripes/components';
import type { Props } from '../../../core';

type P = Props & {};

const ExpandCollapseButton = ({ buttonLabel, toggleFn, ...props }:P) => {
  const { buttonTarget, style } = props;
  return (
    <Button
      target={buttonTarget}
      buttonStyle="primary"
      fullWidth
      paddingSide0
      marginBottom0
      buttonClass={style}
      onClick={toggleFn}
    >
      <Icon
        icon="down-caret"
        iconPosition="start"
      >
        {buttonLabel}
      </Icon>
    </Button>);
};

export default ExpandCollapseButton;
