import React from 'react';
import { Headline } from '@folio/stripes/components';
import { Localize } from '../../../shared/Function';

export default () => {
  return (
    <Headline size="small" margin="medium" tag="h3">
      {Localize('search.history.title')}
    </Headline>
  );
};
