import React, { Fragment } from 'react';
import { Row, MultiColumnList } from '@folio/stripes/components';
import { connect } from 'react-redux';
import ClearHistory from './ClearHistory';
import { resetHistoryAction } from '../Actions';
import style from '../../../shared/lib/Style/Dropdown.css';

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
                  {`queryBib: ${h.queryBib}`}
                  <span>{`record found: ${totalBib}`}</span>
                </div>
              ))}
            </div>
          </Row>
        ) : (
          <Row>
            <MultiColumnList
              id="hostory-recent-search"
              defaultWidth="fill"
              isEmptyMessage={(searchPerformed === 0) ? 'No Search performed' : ''}
              columnWidths={
                {
                  'query': '40%',
                  'index': '30%',
                  'num': '20%',
                }
              }
              formatter={resultsFormatter}
              onRowClick={() => {}}
              rowMetadata={['query', 'found']}
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
