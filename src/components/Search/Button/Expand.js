import React from 'react';
import { Icon, Button } from '@folio/stripes-components';

import type { Props } from '../../../core';

type P = Props & {};

const ExpandCollapseButton = ({ buttonLabel, toggleFn, ...props }:P) => {
  return (
    <Button
      target={props.buttonTarget}
      buttonStyle="primary"
      fullWidth
      paddingSide0
      marginBottom0
      buttonClass={props.style}
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
