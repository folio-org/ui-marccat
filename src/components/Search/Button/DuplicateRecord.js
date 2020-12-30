/* eslint-disable jsx-a11y/label-has-associated-control */
// @flow
import React, { useState } from 'react';
import { Button, Icon } from '@folio/stripes/components';
import { connect } from 'react-redux';
import { Localize, findParam } from '../../../shared';
import { duplicaRecordAction } from '../Actions';

const DuplicateRecord = ({ ...props }) => {
  const [buttonEnabled, setEnabled] = useState(true);
  const onDuplicate = (response) => {
    const { router, toggleFilterPane } = props;
    setTimeout(() => {
      toggleFilterPane();
      router.push({
        pathname: '/marccat/cataloging',
        search: `?id=${response.bibliographicRecord.id}&mode=duplicate`,
        state: { id: response.bibliographicRecord.id, mode: 'duplicate' },
      });
    }, 3000);
  };

  const duplicaRecord = () => {
    if (buttonEnabled) {
      setEnabled(false);
      const id = findParam('id') || findParam('savedId');
      const { store } = props;
      const cb = r => onDuplicate(r);
      store.dispatch(duplicaRecordAction(id, cb));
    }
  };

  const { detail } = props;
  return (
    <Button
      id="clickable-dropdown-duplicate-record"
      buttonStyle="dropdownItem"
      disabled={!detail}
      onClick={() => duplicaRecord()}
    >
      <Icon icon="duplicate">
        {Localize({
          key: 'search.actionmenu.duplicate',
        })}
      </Icon>
    </Button>
  );
};

export default connect(state => ({
  detail: state.marccat.data.marcRecordDetail,
}))(DuplicateRecord);
