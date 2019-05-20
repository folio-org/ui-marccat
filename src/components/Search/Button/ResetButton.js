// @flow
import * as React from 'react';
import ClearFormValue from '../Filter/ResetButton';
import { ACTION } from '../../../redux';
import style from '../Style/index.css';
import { Localize } from '../../../shared';

export default function ResetButton(props) {

  const handleResetAllButton = () => {
    const { dispatch, reset } = this.props;
    dispatch({ type: ACTION.FILTERS, payload: {}, filterName: '', isChecked: false });
    dispatch(reset('searchForm'));
  };

  const renderResetButton = () => {
    return (
      <ClearFormValue
        className={style['mb-5']}
        visible
        onClick={handleResetAllButton}
        id="clickable-reset-all"
        label={Localize({ key: 'button.resetAll' })}
      />
    );
  };

  return (
    renderResetButton()
  );
}
