// @flow
import * as React from 'react';
import {
  Button
} from '@folio/stripes/components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { onlyUpdateForPropTypes, compose, setPropTypes } from 'recompose';
import PropTypes from 'prop-types';
import { Localize } from '../../../shared';

import style from '../Style/index.css';
import { saveRecordAction } from '../Actions';
/**
 *
 *
 * @param {*} { ...props }
 * @returns
 */
function SaveRecordButton({ ...props }) {
  const { saveRecord, payload } = props;
  return (
    <React.Fragment>
      <Button
        buttonStyle="primary"
        buttonClass={style.rightPosition}
        onClick={() => saveRecord(payload)}
        type="button"
        disabled={false}
        marginBottom0
      >
        {Localize({ key: 'cataloging.record.create' })}
      </Button>
    </React.Fragment>
  );
}

const mapDispatchToProps = dispatch => bindActionCreators({
  saveRecord: (payload) => _ => {
    dispatch(saveRecordAction(payload));
  }
}, dispatch);


export default compose(
  (connect(_state => ({
  }), mapDispatchToProps),
  onlyUpdateForPropTypes,
  setPropTypes({ payload: PropTypes.object.isRequired })
  )(SaveRecordButton)
);
