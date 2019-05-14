/* eslint-disable jsx-a11y/label-has-associated-control */
// @flow
import * as React from 'react';
import { Button, PaneMenu } from '@folio/stripes/components';
import { connect } from 'react-redux';
import { Localize, findParam } from '../../../shared';

const EditRecordButton = ({ ...props }) => {
  const handleClickEdit = () => {
    const { router, toggleFilterPane } = props;
    const id = findParam('id');
    toggleFilterPane();
    router.push(`/marccat/cataloging?id=${id}&mode=edit`);
  };

  const { detail } = props;
  return (
    <PaneMenu>
      <Button
        {...props}
        buttonStyle="primary"
        type="button"
        marginBottom0
        disabled={!detail}
        onClick={() => handleClickEdit()}
      >
        {Localize({ key: 'cataloging.record.edit' })}
      </Button>
    </PaneMenu>
  );
};

export default (connect((state) => ({
  detail: state.marccat.data.marcRecordDetail
}))(EditRecordButton));
