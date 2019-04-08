import React from 'react';
import { Headline } from '@folio/stripes/components';

export default ({ ...props }) => {
  const { translate } = props;

  return (
    <Headline size="small" margin="medium" tag="h3">
      {translate({ id: 'ui-marccat.search.actionmenu.title' })}
    </Headline>
  );
};
