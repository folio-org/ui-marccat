/**
 * @format
 * @flow
 */
import React from 'react';
import { Pane, Icon, MultiColumnList } from '@folio/stripes/components';
import { ActionMenu } from '../../../../lib';
import { Props, injectCommonProp } from '../../../../core';
import { resultsFormatter, columnMapper, columnWidthMapper } from '../../../../utils/Formatter';
import { EmptyMessage, NoResultsMessage } from '../../../../lib/components/Message';
import * as C from '../../../../utils/Constant';

class SearchResultPane extends React.Component<Props, {}> {
    renderVisibleColumns = () => {
      const { store: { getState } } = this.props;
      const form = getState().form.checkboxForm;
      const visibleColumns = [
        'resultView',
        '001',
        '245',
        'name',
        'preferredTitle',
        'tagHighlighted',
        'countDoc'
      ];

      if (form && form.values) {
        Object.keys(form.values).filter(k => k !== 'checkboxForm')
          .forEach((z, i) => {
            if (!form[z]) delete visibleColumns[i];
          });
      }
      return visibleColumns;
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
        messageNoContent,
      } = this.props;
      return (
        <Pane
          padContent={(marcJSONRecords.length > 0) || isFetching}
          defaultWidth="fill"
          actionMenu={ActionMenu}
          paneTitle={translate({ id:'ui-marccat.search.record' })}
          paneSub={(mergedRecord && mergedRecord.length > 0) ? message : messageNoContent}
          appIcon={{ app: C.META.ICON_TITLE }}
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
                    autosize
                    id="data-test-search-results-table"
                    defaultWidth="fill"
                    columnWidths={columnWidthMapper(false, false)}
                    rowMetadata={['001', 'recordView']}
                    onRowClick={handleDetails}
                    contentData={marcJSONRecords}
                    formatter={resultsFormatter(bibsOnly, true)}
                    columnMapping={columnMapper(bibsOnly, false)}
                    visibleColumns={this.renderVisibleColumns()}
                  /> : <EmptyMessage {...this.props} />
          }
        </Pane>
      );
    }
}
export default (injectCommonProp(SearchResultPane));
