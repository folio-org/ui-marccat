/* eslint-disable no-sparse-arrays */
// @flow
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Pane, Icon, MultiColumnList, Button, PaneHeader } from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes-core';
import type { Props } from '../../../../flow/types.js.flow';
import {
  resultsFormatter,
  columnMapper,
  columnWidthMapper,
  renderColumn,
} from '../../../../shared/utils/Formatter';
import {
  injectProps,
  EmptyMessage,
  NoResultsMessage,
} from '../../../../shared';
import { ACTION } from '../../../../redux/actions/Actions';
import * as C from '../../../../config/constants';

class SearchResultPane extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      isFetching,
      firstMenu,
      actionMenu,
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
      isLoadMore,
      checkCustomColumns
    } = this.props;

    const customColumns = [];
    if (checkCustomColumns !== undefined) {
      checkCustomColumns.map(e => {
        if (e.isChecked === true) {
          customColumns.push(e.value.split('-')[0]);
        }
        return customColumns;
      });
    }

    return isLoadMore === 'N' || isLoadMore === undefined ? (
      <Pane
        padContent={containerMarcJSONRecords.length > 0 || isFetching}
        defaultWidth="fill"
        renderHeader={renderProps => (
          <PaneHeader
            {...renderProps}
            paneTitle={translate({ id: 'ui-marccat.search.record' })}
            actionMenu={actionMenu}
            paneSub={
              mergedRecord && mergedRecord.length > 0 ? message : messageNoContent
            }
            appIcon={<AppIcon app={C.META.ICON_TITLE} />}
          />
        )}
        firstMenu={firstMenu}
        onScroll={e => {
          const bottom =
            e.target.scrollHeight - e.target.scrollTop ===
            e.target.clientHeight;
          if (bottom && mergedRecord.length > 29) {
            store.dispatch({
              type: ACTION.SEARCH,
              isFromCat: 'N',
              queryBib: queryMoreBib,
              queryAuth: queryMoreAuth,
              moreData: 'Y',
              from: parseInt(countMoreData, 10) + 1,
              to: parseInt(countMoreData, 10) + 30,
              dataOld: mergedRecord,
              oldBibArray: bibliographicResults,
              oldAuthArray: authorityResults,
            });
          }
        }}
      >
        {isFetching ? (
          <Icon icon="spinner-ellipsis" />
        ) : !isFetching && noResults && mergedRecord.length === 0 ? (
          <NoResultsMessage {...this.props} />
        ) : isReady ? (
          <MultiColumnList
            autosize
            id="data-test-search-results-table"
            defaultWidth="fill"
            columnWidths={columnWidthMapper(bibsOnly, autOnly)}
            rowMetadata={['001', 'recordView']}
            onRowClick={handleDetails}
            contentData={mergedRecord}
            formatter={resultsFormatter(bibsOnly, autOnly)}
            columnMapping={columnMapper(bibsOnly, autOnly)}
            visibleColumns={renderColumn(bibsOnly, autOnly, customColumns)}
          />
        ) : (
          <EmptyMessage {...this.props} />
        )}
      </Pane>
    ) : (
      isLoadMore === 'Y' && (
        <Pane
          padContent={containerMarcJSONRecords.length > 0}
          defaultWidth="fill"
          renderHeader={renderProps => (
            <PaneHeader
              {...renderProps}
              paneTitle={translate({ id: 'ui-marccat.search.record' })}
              actionMenu={actionMenu}
              paneSub={message}
              appIcon={<AppIcon app={C.META.ICON_TITLE} />}
            />
          )}
          firstMenu={firstMenu}
          onScroll={e => {
            const bottom =
              e.target.scrollHeight - e.target.scrollTop ===
              e.target.clientHeight;
            if (bottom && mergedRecord.length > 29) {
              store.dispatch({
                type: ACTION.SEARCH,
                isFromCat: 'N',
                queryBib: queryMoreBib,
                queryAuth: queryMoreAuth,
                moreData: 'Y',
                from: parseInt(countMoreData, 10) + 1,
                to: parseInt(countMoreData, 10) + 30,
                dataOld: mergedRecord,
                oldBibArray: bibliographicResults,
                oldAuthArray: authorityResults,
              });
            }
          }}
        >
          <MultiColumnList
            id="data-test-search-results-table"
            autosize
            defaultWidth="fill"
            columnWidths={columnWidthMapper(bibsOnly, autOnly)}
            rowMetadata={['001', 'recordView']}
            onRowClick={handleDetails}
            contentData={mergedRecord}
            formatter={resultsFormatter(bibsOnly, autOnly)}
            columnMapping={columnMapper(bibsOnly, autOnly)}
            visibleColumns={renderColumn(bibsOnly, autOnly, customColumns)}
          />
        </Pane>
      )
    );
  }
}
export default connect(({ marccat: { search } }) => ({
  isLoadMore: search.moreData
}))(injectProps(SearchResultPane));
