import React, { Fragment } from 'react';
import { Headline, Row, IconButton } from '@folio/stripes/components';
import { connect } from 'react-redux';
import { Localize } from '../../../shared/Function';
import { resetHistoryAction } from '../Actions';
import style from '../../../lib/Style/Dropdown.css';

const PanelHistory = ({ searchPerformed, recentHistory, totalBib, resetHistory }) => {
  return (
    <Fragment>
      <Row>
        <div className={style.dropdownContainer}>
          <Headline size="small" margin="medium" tag="h3">
            {Localize({ key: 'search.history.title', value: searchPerformed })}
          </Headline>
        </div>
        <div className={style.clearHistoryContainer}>
          <IconButton
            key="icon-trash-history"
            icon="trash"
            badgeCount={searchPerformed}
            onClick={resetHistory}
            className={style.clearHistory}
          />
        </div>
      </Row>
      <Row>
        <div className={style.dropdownContainer}>
          {recentHistory.map((h, i) => (
            <div className={style.dropdownShortcut} key={i}>
              {`queryBib: ${h.queryBib}`}
              <span>{`record found: ${totalBib}`}</span>
            </div>
          ))}
        </div>
      </Row>
    </Fragment>
  );
};

export default (connect(
  ({ marccat: { history, totalBibRecords, totalAuthRecords } }) => ({
    searchPerformed: history.list.length,
    recentHistory: history.list,
    totalBib: totalBibRecords.totalBibDoc,
    totalAuth: totalAuthRecords.totalAuthDoc
  }),
  (dispatch) => ({
    resetHistory: () => dispatch(resetHistoryAction())
  })
)(PanelHistory));
