/* eslint-disable no-sparse-arrays */
// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Pane, Icon, MultiColumnList } from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes-core';
import { resultsFormatter, columnMapper, columnWidthMapper, renderColumn } from '../../../../utils/Formatter';
import { withProps, ActionMenu, EmptyMessage, NoResultsMessage } from '../../../../shared';
import { ACTION } from '../../../../redux/actions/Actions';
import * as C from '../../../../config/constants';


function SearchResultPane(props) {

  const {
    isFetching,
    firstMenu,
    lastMenu,
    mergedRecord,
    message,
    noResults,
    bibliographicResults,
    authorityResults,
    queryMoreBib,
    queryMoreAuth,
    countMoreData,
    isReady,
    handleDetails,
    translate,
    bibsOnly,
    autOnly,
    messageNoContent,
    containerMarcJSONRecords,
    store,
    isLoadMore
  } = props;
  return (
    isLoadMore === 'N' || isLoadMore === undefined ?
      <Pane
        padContent={(containerMarcJSONRecords.length > 0) || isFetching}
        autosize={true.toString()}
        defaultWidth="fill"
        actionMenu={ActionMenu}
        paneTitle={translate({ id: 'ui-marccat.search.record' })}
        paneSub={(mergedRecord && mergedRecord.length > 0) ? message : messageNoContent}
        appIcon={<AppIcon app={C.META.ICON_TITLE} />}
        firstMenu={firstMenu}
        lastMenu={lastMenu}
        onScroll={(e) => {
          const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
          if (bottom) {
            store.dispatch({ type: ACTION.SEARCH, queryBib: queryMoreBib, queryAuth: queryMoreAuth, moreData: 'Y', from: parseInt(countMoreData, 10) + 1, to: parseInt(countMoreData, 10) + 30, dataOld: mergedRecord, oldBibArray: bibliographicResults, oldAuthArray: authorityResults });
          }
        }
        }
      >
        {
          (isFetching) ?
            <Icon icon="spinner-ellipsis" /> :
            (!isFetching && noResults && mergedRecord.length === 0) ?
              <NoResultsMessage {...props} /> :
              (isReady) ?
                <MultiColumnList
                  id="data-test-search-results-table"
                  defaultWidth="fill"
                  columnWidths={columnWidthMapper(bibsOnly, autOnly)}
                  rowMetadata={['001', 'recordView']}
                  onRowClick={handleDetails}
                  contentData={mergedRecord}
                  formatter={resultsFormatter(bibsOnly, autOnly)}
                  columnMapping={columnMapper(bibsOnly, autOnly)}
                  visibleColumns={renderColumn(bibsOnly, autOnly)}
                /> : <EmptyMessage {...props} />
        }
      </Pane> : (isLoadMore === 'Y') &&
        <Pane
          padContent={(containerMarcJSONRecords.length > 0)}
          autosize={true.toString()}
          defaultWidth="fill"
          actionMenu={ActionMenu}
          paneTitle={translate({ id: 'ui-marccat.search.record' })}
          paneSub={message}
          appIcon={<AppIcon app={C.META.ICON_TITLE} />}
          firstMenu={firstMenu}
          lastMenu={lastMenu}
          onScroll={(e) => {
            const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
            if (bottom) {
              store.dispatch({ type: ACTION.SEARCH, queryBib: queryMoreBib, queryAuth: queryMoreAuth, moreData: 'Y', from: parseInt(countMoreData, 10) + 1, to: parseInt(countMoreData, 10) + 30, dataOld: mergedRecord, oldBibArray: bibliographicResults, oldAuthArray: authorityResults });
            }
          }
          }
        >
          <MultiColumnList
            id="data-test-search-results-table"
            defaultWidth="fill"
            columnWidths={columnWidthMapper(bibsOnly, autOnly)}
            rowMetadata={['001', 'recordView']}
            onRowClick={handleDetails}
            contentData={mergedRecord}
            formatter={resultsFormatter(bibsOnly, autOnly)}
            columnMapping={columnMapper(bibsOnly, autOnly)}
            visibleColumns={renderColumn(bibsOnly, autOnly)}
          />
        </Pane>
  );
}
export default (connect(
  ({ marccat: { search } }) => ({
    isLoadMore: search.moreData
  }),
)(withProps(SearchResultPane)));
