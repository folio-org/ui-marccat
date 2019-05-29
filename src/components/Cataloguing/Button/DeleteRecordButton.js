// @flow
import * as React from 'react';
import {
  Icon,
  Button
} from '@folio/stripes/components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Localize, findParam } from '../../../shared';

import style from '../Style/index.css';
import { deleteRecordAction } from '../Actions';
import { RECORD_ACTION } from '..';
/**
 *
 *
 * @param {*} { ...props }
 * @returns
 */
function DeleteRecordButton({ ...props }) {
  const { deleteRecord, id } = props;
  return (
    <React.Fragment>
      {(findParam('mode') === RECORD_ACTION.EDIT_MODE) &&
      <Button
        buttonStyle="primary"
        buttonClass={style.rightPosition}
        onClick={deleteRecord(id)}
        type="button"
        disabled={false}
        marginBottom0
      >
        <Icon icon="trash">
          {Localize({ key: 'cataloging.record.delete' })}
        </Icon>
      </Button>
      }
    </React.Fragment>
  );
}

const mapDispatchToProps = dispatch => bindActionCreators({
  deleteRecord: (id) => _ => {
    dispatch(deleteRecordAction(id));
  }
}, dispatch);

export default (connect(_state => ({
}), mapDispatchToProps)
)(DeleteRecordButton);
