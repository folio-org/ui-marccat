/**
 * @format
 * @flow
 */
import React from 'react';
import { Button } from '@folio/stripes/components';
import type { Props } from '../../../core';

const InventoryPluggableBtn = ({ buttonLabel, ...props }:Props) => {
  const { buttonTarget, style } = props;
  return (
    <div>
      <hr />
      <Button
        target={buttonTarget}
        buttonStyle="primary"
        fullWidth
        paddingSide0
        marginBottom0
        buttonClass={style}
      >
        {buttonLabel}
      </Button>
    </div>
  );
};

export default InventoryPluggableBtn;
