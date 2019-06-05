// @flow
import * as React from 'react';
import { Button } from '@folio/stripes/components';

const InventoryPluggableButton = ({ buttonLabel, ...props }) => {
  const { buttonTarget, className, withLine } = props;
  return (
    <div>
      {withLine &&
      <hr />
      }
      <Button
        target={buttonTarget}
        buttonStyle="primary"
        fullWidth
        paddingSide0
        marginBottom0
        buttonClass={className}
      >
        {buttonLabel}
      </Button>
    </div>
  );
};

export default InventoryPluggableButton;
