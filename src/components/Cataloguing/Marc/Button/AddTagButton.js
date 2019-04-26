import React from 'react';
import {
  Button
} from '@folio/stripes/components';
import { Localize } from '../../../../utils/Function';

// eslint-disable-next-line no-unused-vars
export default ({ ...props }) => {
  const { tagCode } = props;
  return (
    <Button
      style={{ marginLeft: -16 + 'px' }}
      onClick={() => {}}
      type="button"
      disabled={false}
    >
      {Localize({ key: 'cataloging.fixedfield.section.add.newtag', value: tagCode })}
    </Button>
  );
};
