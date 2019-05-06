// @flow
import * as React from 'react';
import {
  Icon,
  Button
} from '@folio/stripes/components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Localize, findParam } from '../../../../shared';

import style from '../../Style/index.css';
import { saveRecordAction } from '../../Actions';
import { RECORD_ACTION } from '../..';

function SaveRecordButton({ ...props }) {
  const { saveRecord, payload } = props;
  return (
    <React.Fragment>
      {(findParam('mode') === RECORD_ACTION.EDIT_MODE) &&
      <Button
        buttonStyle="primary"
        buttonClass={style.rightPosition}
        onClick={saveRecord(payload)}
        type="button"
        disabled={false}
        marginBottom0
      >
        <Icon icon="trash">
          {Localize({ key: 'cataloging.record.save' })}
        </Icon>
      </Button>
      }
    </React.Fragment>
  );
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  saveRecord: (payload) => (_) => {
    dispatch(saveRecordAction(payload));
  }
}, dispatch);

export default (connect(() => ({
}), mapDispatchToProps)(SaveRecordButton));
