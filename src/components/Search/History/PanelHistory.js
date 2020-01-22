import React, { Fragment } from 'react';
import { Row, MultiColumnList } from '@folio/stripes/components';
import { connect } from 'react-redux';
import ClearHistory from './ClearHistory';
import { resetHistoryAction } from '../Actions';
import style from '../../../shared/lib/Style/Dropdown.css';
import { ACTION } from '../../../redux/actions';

const PanelHistory = ({ ...props }) => {
  const { searchPerformed, recentHistory, totalBib, withMulticolumn } = props;
  const resultsFormatter = {
    index: item => `${item.index.split('"')[0].trim()}`,
    query: item => `${item.query.split('"')[1].trim()}`,
    num: (item) => `${item.found}`,
  };
  return (
    <Fragment>
      <ClearHistory {...props} />
      {(withMulticolumn) ?
        (
          <Row>
            <div className={style.dropdownContainer}>
              {recentHistory.map((h, i) => (
                <div className={style.dropdownShortcut} key={i}>
                  {`queryBib: ${h.query}`}
                  <span>{`record found: ${totalBib}`}</span>
                </div>
              ))}
            </div>
          </Row>
        ) : (
          <Row>
            <MultiColumnList
              id="hostory-recent-search"
              isEmptyMessage={(searchPerformed === 0) ? 'No Search performed' : ''}
              formatter={resultsFormatter}
              onRowClick={(e, meta) => {
                const { dispatch } = props;
                const query = meta['query'];
                const numFound = meta['found'];
                dispatch({ type: ACTION.SEARCH, moreData: 'N', queryBib: query, queryAuth: query, from: '1', to: '30' });
                // dispatch({ type: ACTION.TOTAL_BIB_COUNT, query: bibQuery });
                // dispatch({ type: ACTION.TOTAL_AUTH_COUNT, query: authQuery });
              }}
              rowMetadata={['index', 'query']}
              contentData={recentHistory}
              visibleColumns={[
                'index',
                'query',
                'num',
              ]}
            />
          </Row>)
      }
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
