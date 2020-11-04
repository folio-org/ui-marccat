/* eslint-disable jsx-a11y/label-has-associated-control */
// @flow
import * as React from 'react';
import { Button, Icon } from '@folio/stripes/components';
import { connect } from 'react-redux';
import { Localize, findParam } from '../../../shared';
// import { lockRecordAction } from '../../Cataloguing/Actions';

const EditRecordButton = ({ ...props }) => {
  // const lockRecord = id => {
  //   const { dispatch, store } = props;
  //   const user = store.getState().okapi.currentUser.username;
  //   const idLock = store.getState().okapi.currentUser.id;
  //   console.log(idLock);
  //   const payload = {
  //     user,
  //     id,
  //     idLock,
  //   };
  //   dispatch(lockRecordAction(payload));
  // };
  const handleClickEdit = () => {
    const { router, toggleFilterPane } = props;
    const id = findParam('id');
    toggleFilterPane();
    // lockRecord(id);
    router.push({
      pathname: '/marccat/cataloging',
      search: `?id=${id}&mode=edit`,
      state: { id, mode: 'edit' },
    });
  };

  return (
    <div>
      <Button
        id="clickable-dropdown-edit-record"
        buttonStyle="dropdownItem"
        onClick={() => handleClickEdit()}
      >
        <Icon icon="edit">{Localize({ key: 'cataloging.record.edit' })}</Icon>
      </Button>
    </div>
  );
};

export default connect(state => ({
  detail: state.marccat.data.marcRecordDetail,
}))(EditRecordButton);
