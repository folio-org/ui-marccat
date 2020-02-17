/* eslint-disable jsx-a11y/label-has-associated-control */
// @flow
import * as React from 'react';
import { Button, PaneMenu, Icon } from '@folio/stripes/components';
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
    <Button
      {...props}
      buttonStyle="dropdownItem"
      disabled={!detail}
      onClick={() => handleClickEdit()}
    >
      <Icon icon="edit">{Localize({ key: 'cataloging.record.edit' })}</Icon>
    </Button>
  );
};

export default connect(state => ({
  detail: state.marccat.data.marcRecordDetail,
}))(EditRecordButton);
