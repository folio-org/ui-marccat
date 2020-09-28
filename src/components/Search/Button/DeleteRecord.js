/* eslint-disable jsx-a11y/label-has-associated-control */
// @flow
import * as React from 'react';
import { Button, Icon } from '@folio/stripes/components';
import { connect } from 'react-redux';
import { Localize } from '../../../shared';
// import { lockRecordAction } from '../../Cataloguing/Actions';

const DeleteRecordButton = ({ eHandleClickDelete, ...props }) => {

  const handleClickDelete = () => {
    eHandleClickDelete();
  };

  return (
    <div>
      <Button
        {...props}
        buttonStyle="dropdownItem"
        onClick={() => handleClickDelete()}
      >
        <Icon icon="trash">{Localize({ key: 'cataloging.record.delete' })}</Icon>
      </Button>
    </div>
  );
};

export default connect(state => ({
  detail: state.marccat.data.marcRecordDetail,
}))(DeleteRecordButton);
