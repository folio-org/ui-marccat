/* eslint-disable jsx-a11y/label-has-associated-control */
/**
 * @format
 * @flow
 */
import React from 'react';
import { Button, PaneMenu } from '@folio/stripes/components';
import { Localize, findParam } from '../../../shared/Function';

export default ({ ...props }) => {
  const handleClickEdit = () => {
    const { router, toggleFilterPane } = props;
    const id = findParam('id');
    toggleFilterPane();
    router.push(`/marccat/cataloging?id=${id}&mode=edit`);
  };

  return (
    <PaneMenu>
      <Button
        {...props}
        buttonStyle="primary"
        type="button"
        marginBottom0
        onClick={() => handleClickEdit()}
      >
        {Localize({ key: 'cataloging.record.edit' })}
      </Button>
    </PaneMenu>
  );
};
