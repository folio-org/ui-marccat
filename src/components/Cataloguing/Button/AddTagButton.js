import * as React from 'react';
import {
  Button
} from '@folio/stripes/components';
import { Localize } from '../../../utils/Function';

export default function AddTagButton({ ...props }) {
  const { tagCode, onClick } = props;
  return (
    <Button
      {...props}
      onClick={onClick}
      type="button"
      disabled={false}
    >
      {Localize({ key: 'cataloging.fixedfield.section.add.newtag', value: tagCode })}
    </Button>
  );
}
