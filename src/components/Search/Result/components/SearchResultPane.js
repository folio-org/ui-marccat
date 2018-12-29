/**
 * @format
 * @flow
 */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Pane, Icon, MultiColumnList } from '@folio/stripes/components';
import { ActionMenu } from '../../../../lib';
import { Props, injectCommonProp } from '../../../../core';
import { resultsFormatter, columnMapper } from '../../../../utils/Formatter';
import { EmptyMessage, NoResultsMessage } from '../../../../lib/components/Message';
import * as C from '../../../../utils/Constant';

class SearchResultPane extends React.Component<Props, {}> {
    renderVisibleColumns = () => {
      return [
        'resultView',
        '001',
        '245',
        'name',
        'uniformTitle',
        'subject',
        'date1',
        'date2',
        'format',
        'tagHighlighted',
        'countDoc'
      ];
    };

    render() {
      const {
        marcJSONRecords,
        isFetching,
        firstMenu,
        lastMenu,
        mergedRecord,
        message,
        noResults,
        bibliographicResults,
        authorityResults,
        isReady,
        handleDetails,
        bibsOnly,
        loading,
        messageNoContent
      } = this.props;
      return (
        <Pane
          padContent={(marcJSONRecords.length > 0) || isFetching}
          defaultWidth="fill"
          actionMenu={ActionMenu}
          paneTitle={<FormattedMessage id="ui-marccat.search.record" />}
          paneSub={(mergedRecord && mergedRecord.length > 0) ? message : messageNoContent}
          appIcon={{ app: C.META.ICON_TITLE }}
          firstMenu={firstMenu}
          lastMenu={lastMenu}
        >
          {
            (isFetching) ?
              <Icon icon="spinner-ellipsis" /> :
              (!isFetching && noResults && !(bibliographicResults === undefined && authorityResults === undefined)) ?
                <NoResultsMessage {...this.props} /> :
                (isReady) ?
                  <MultiColumnList
                    autosize
                    id="tabella"
                    defaultWidth="fill"
                    isEmptyMessage={C.EMPTY_MESSAGE}
                    columnWidths={
                      {
                        'resultView': '5%',
                        '001': '10%',
                        '245': '30%',
                        'name': '15%',
                        'uniformTitle': '5%',
                        'subject': '8%',
                        'date1': '5%',
                        'date2': '5%',
                        'format': '8%',
                        'tagHighlighted': '5%',
                        'countDoc': '4%'
                      }
                    }
                    rowMetadata={['001', 'recordView']}
                    onRowClick={handleDetails}
                    contentData={marcJSONRecords}
                    formatter={resultsFormatter(bibsOnly, false)}
                    columnMapping={columnMapper(bibsOnly)}
                    onNeedMoreData={() => {}}
                    virtualize
                    loading={loading}
                    visibleColumns={this.renderVisibleColumns()}
                  /> :
                  <EmptyMessage {...this.props} />
          }
        </Pane>
      );
    }
}
export default (injectCommonProp(SearchResultPane));
