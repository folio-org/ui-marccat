/* eslint-disable no-sparse-arrays */
/**
 * @format
 * @flow
 */
import React from 'react';
import { Pane, Icon, MultiColumnList } from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes-core';
import { ActionMenu } from '../../../../lib';
import { Props, injectCommonProp } from '../../../../core';
import { resultsFormatter, columnMapper, columnWidthMapper, renderColumn } from '../../../../utils/Formatter';
import { EmptyMessage, NoResultsMessage } from '../../../../lib/components/Message';
import * as C from '../../../../utils/Constant';
import { FormReducer } from '../../../../redux/helpers/StoreReducer';
import { ActionTypes } from '../../../../redux/actions/Actions';


class SearchResultPane extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.state = {
    };
  }

    renderVisibleColumns = () => {
      const { store } = this.props;
      const form = FormReducer.resolve(store, 'checkboxForm');
      const visibleColumns = [];
      const visibleColumns2 = [
        'resultView',
        '001',
        '245',
        'name',
        'preferredTitle',
        'tagHighlighted',,
        'date1',
        'date2',
        'format'
      ];

      if (form) {
        Object.keys(form)
          // eslint-disable-next-line no-unused-vars
          .forEach((z, i) => {
            switch (z) {
            case 'id Number': if (form[z]) visibleColumns[1] = '001'; break;
            case 'Title': if (form[z]) visibleColumns[2] = '245'; break;
            case 'Name': if (form[z]) visibleColumns[3] = 'name'; break;
            case 'Preferred Title': if (form[z]) visibleColumns[4] = 'preferredTitle'; break;
            case 'Tag': if (form[z]) visibleColumns[5] = 'tagHighlighted'; break;
            case 'Date 1': if (form[z]) visibleColumns[6] = 'date1'; break;
            case 'Date 2': if (form[z]) visibleColumns[7] = 'date2'; break;
            case 'Format': if (form[z]) visibleColumns[8] = 'format'; break;
            default:
              break;
            }
          });
      }
      return (visibleColumns.length > 1) ? visibleColumns : visibleColumns2;
    };

    render() {
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
        store
      } = this.props;
      return (
        <Pane
          padContent={(containerMarcJSONRecords.length > 0) || isFetching}
          autosize
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
              store.dispatch({ type: ActionTypes.SEARCH, queryBib: queryMoreBib, queryAuth: queryMoreAuth, from: parseInt(countMoreData, 10) + 1, to: parseInt(countMoreData, 10) + 100, dataOld: mergedRecord, oldBibArray: bibliographicResults, oldAuthArray: authorityResults });
            }
          }
          }
        >
          {
            (isFetching) ?
              <Icon icon="spinner-ellipsis" /> :
              ((!isFetching && noResults && mergedRecord.length === 0)) ?
                <NoResultsMessage {...this.props} /> :
                (isReady) ?
                  <MultiColumnList
                    id="data-test-search-results-table"
                    defaultWidth="fill"
                    columnWidths={columnWidthMapper(false, false)}
                    rowMetadata={['001', 'recordView']}
                    onRowClick={handleDetails}
                    contentData={mergedRecord}
                    formatter={resultsFormatter(bibsOnly, autOnly)}
                    columnMapping={columnMapper(bibsOnly, autOnly)}
                    visibleColumns={renderColumn(bibsOnly, autOnly)}
                  /> : <EmptyMessage {...this.props} />
          }
        </Pane>
      );
    }
}
export default (injectCommonProp(SearchResultPane));
