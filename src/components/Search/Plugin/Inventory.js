import React from 'react';
import Button from '@folio/stripes-components/lib/Button';
import type { Props } from '../../../core';

type P = Props & {};

const InventoryPluggableBtn = ({ buttonLabel, ...props }:P) => {
  return (
    <div>
      <hr />
      <Button
        target={props.buttonTarget}
        buttonStyle="primary"
        fullWidth
        paddingSide0
        marginBottom0
        buttonClass={props.style}
      >
        {buttonLabel}
      </Button>
    </div>
  );
};

export default InventoryPluggableBtn;
