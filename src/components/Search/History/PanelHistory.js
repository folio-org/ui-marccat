import React, { Fragment } from 'react';
import { Row, MultiColumnList } from '@folio/stripes/components';
import { connect } from 'react-redux';
import ClearHistory from './ClearHistory';
import { resetHistoryAction } from '../Actions';
import style from '../../../shared/lib/Style/Dropdown.css';
import { ACTION } from '../../../redux/actions';
import { SORT_TYPE, EMPTY_STRING, FILTER_NAME } from '../../../config/constants';

const PanelHistory = ({ ...props }) => {
  const { searchPerformed, recentHistory, totalBib, withMulticolumn } = props;
  const resultsFormatter = {
    index: item => `${item.index.split('"')[0].trim()}`,
    query: item => `${item.query.split('"')[1].trim()}`,
    num: (item) => `${item.found}`,
    recType: (item) => `${item.recordType}`,
  };

  const disableSortOnAuthority = (sortType) => {
    const { store: { getState } } = props;
    const filter = getState().marccat.filter.filters;
    const sortAuth = (sortType === SORT_TYPE.UNIFORM_TITLE || sortType === SORT_TYPE.DATA1 || sortType === SORT_TYPE.DATE2);
    if (sortAuth) filter[FILTER_NAME.AUTHORITY] = false;
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
              id="history-recent-search"
              isEmptyMessage={(searchPerformed === 0) ? 'No Search performed' : ''}
              formatter={resultsFormatter}
              onRowClick={(e, meta) => {
                const { dispatch, router } = props;
                const query = meta.query;
                const index = meta.index;
                const recType = meta.recordType;
                const sortType = meta.sortStrategy;
                disableSortOnAuthority(sortType);
                dispatch({ type: ACTION.SETTINGS, data: { sortType } });

                if (index.split(' ')[1] === 'BROWSE') {
                  dispatch({ type: ACTION.BROWSE_FIRST_PAGE, query });
                  router.push('/marccat/browse');
                } else {
                  dispatch({ type: ACTION.SEARCH, isFromCat: 'N', moreData: 'N', queryBib: query, queryAuth: (recType === 'biblio') ? EMPTY_STRING : query, from: '1', to: '30' });
                  router.push('/marccat/search');
                }
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
