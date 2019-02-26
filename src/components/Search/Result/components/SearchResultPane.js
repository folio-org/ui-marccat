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

class SearchResultPane extends React.Component<Props, {}> {
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
        translate,
        bibsOnly,
        autOnly,
        messageNoContent,
      } = this.props;
      return (
        <Pane
          padContent={(marcJSONRecords.length > 0) || isFetching}
          defaultWidth="fill"
          actionMenu={ActionMenu}
          paneTitle={translate({ id: 'ui-marccat.search.record' })}
          paneSub={(mergedRecord && mergedRecord.length > 0) ? message : messageNoContent}
          appIcon={<AppIcon app={C.META.ICON_TITLE} />}
          firstMenu={firstMenu}
          lastMenu={lastMenu}
        >
          {
            (isFetching) ?
              <Icon icon="spinner-ellipsis" /> :
              ((!isFetching && noResults && !(bibliographicResults === undefined && authorityResults === undefined))) ?
                <NoResultsMessage {...this.props} /> :
                (isReady) ?
                  <MultiColumnList
                    id="data-test-search-results-table"
                    defaultWidth="fill"
                    columnWidths={columnWidthMapper(false, false)}
                    rowMetadata={['001', 'recordView']}
                    onRowClick={handleDetails}
                    contentData={marcJSONRecords}
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
