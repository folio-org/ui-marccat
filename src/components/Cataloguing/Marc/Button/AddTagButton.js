import * as React from 'react';
import {
  Button
} from '@folio/stripes/components';
import { Localize } from '../../../../shared/utils/Function';

// eslint-disable-next-line no-unused-vars
export default ({ ...props }) => {
  const { tagCode, onClick } = props;
  return (
    <Button
      onClick={onClick}
      type="button"
      disabled={false}
    >
      {Localize({ key: 'cataloging.fixedfield.section.add.newtag', value: tagCode })}
    </Button>
  );
};
