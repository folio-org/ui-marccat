/* eslint-disable jsx-a11y/label-has-associated-control */
// @flow
import * as React from 'react';
import { Button, Icon } from '@folio/stripes/components';
import { connect } from 'react-redux';
import { Localize, findParam } from '../../../shared';
import { duplicaRecordAction } from '../Actions';

const DuplicateRecord = ({ ...props }) => {
  const onDuplicate = (response) => {
    const { router, toggleFilterPane } = props;
    setTimeout(() => {
      toggleFilterPane();
      router.push(
        `/marccat/cataloging?id=${response.bibliographicRecord.id}&mode=duplicate`
      );
    }, 3000);
  };

  const duplicaRecord = () => {
    const id = findParam('id') || findParam('savedId');
    const { store } = props;
    const cb = r => onDuplicate(r);
    store.dispatch(duplicaRecordAction(id, cb));
  };

  const { detail } = props;
  return (
    <Button
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
