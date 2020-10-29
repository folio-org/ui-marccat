/* eslint-disable jsx-a11y/label-has-associated-control */
// @flow
import * as React from 'react';
import { Button, Icon } from '@folio/stripes/components';
import { connect } from 'react-redux';
import { IfPermission } from '@folio/stripes-core';
import { Localize } from '../../../shared';

const DeleteRecordButton = ({ eHandleClickDelete }) => {

  const handleClickDelete = () => {
    eHandleClickDelete();
  };

  return (
    <div>
      <IfPermission perm="ui-marccat.edit-delete-records.view">
        <Button
          id="clickable-dropdown-delete-record"
          buttonStyle="dropdownItem"
          onClick={() => handleClickDelete()}
          data-test-btn-delete-record
        >
          <Icon icon="trash">{Localize({ key: 'cataloging.record.delete' })}</Icon>
        </Button>
      </IfPermission>
    </div>
  );
};

export default connect(state => ({
  detail: state.marccat.data.marcRecordDetail,
}))(DeleteRecordButton);
