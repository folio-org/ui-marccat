import React from 'react';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Icon from '@folio/stripes-components/lib/Icon';
import Pane from '@folio/stripes-components/lib/Pane';
import Paneset from '@folio/stripes-components/lib/Paneset';
import * as C from '../../../utils/Constant';
import { ActionTypes } from '../../../redux/actions';
import type { Props } from '../../../core';
import { actionMenuItem, ToolbarButtonMenu, ToolbarMenu, EmptyMessage } from '../../Lib';
import { remapForAssociatedBibList } from '../Utils/Mapper';
import { resultsFormatter, columnMapper } from '../Utils/Formatter';
import { isAuthorityRecord } from '../Utils/SearchUtils';
import RecordDetails from './RecordDetails';
import { injectCommonProp } from '../../../core';
import AssociatedBibDetails from './AssociatedBibDetails';

type P = Props & {
  headings: Array<any>;
  inputValue: string;
  getPreviousPage: Function;
  getNextPage: Function;
  detail: Object;
  dataLoaded: boolean;
  loading: boolean;
  isPanelOpen: boolean;
}

export class SearchResults extends React.Component<P, {}> {
  constructor(props: P) {
    super(props);
    this.state = {
      detailPanelIsVisible: false,
      noResults: false,
      bibsOnly: false,
      autOnly: false,
      loading: false,
    };
    this.handleDeatils = this.handleDeatils.bind(this);
    this.onNeedMoreData = this.onNeedMoreData.bind(this);
  }

  handleDeatils = (e, meta) => {
    const { dispatch } = this.props;
    const id = meta['001'];
    dispatch({ type: ActionTypes.DETAILS, query: id, recordType: meta.recordView });
    if (isAuthorityRecord(meta)) {
      dispatch({ type: ActionTypes.ASSOCIATED_BIB_REC, query: meta.queryForBibs, recordType: meta.recordView });
    }
    dispatch({ type: ActionTypes.CLOSE_ASSOCIATED_DETAILS, openPanel: false });
    this.setState({ detailPanelIsVisible: true });
  };

  onNeedMoreData = (initialData: Array<any>) => {
    return initialData.slice(10, 20);
  };

  render() {
    let { bibsOnly, autOnly, detailPanelIsVisible, noResults } = this.state;
    const { activeFilter, activeFilterName, activeFilterChecked, totalAuthCount, totalBibCount, bibliographicResults, authorityResults, isFetchingBibliographic, isReadyBibliographic, isReadyAuthority, isFetchingAuthority, isPanelBibAssOpen, isReadyDetail, isFetchingDetail, isLoadingAssociatedRecord, isReadyAssociatedRecord } = this.props;
    if (activeFilter) {
      if (activeFilterName === 'recordType.Bibliographic records' && activeFilterChecked) {
        bibsOnly = true;
      } else if (activeFilterName === 'recordType.Bibliographic records' && !activeFilterChecked) {
        bibsOnly = false;
      }
      if (activeFilterName === 'recordType.Authority records' && activeFilterChecked) {
        autOnly = true;
      } else if (activeFilterName === 'recordType.Authority records' && !activeFilterChecked) {
        autOnly = false;
      }
    }
    if ((bibliographicResults && (bibliographicResults.length === undefined || bibliographicResults.length === 0)) && ((authorityResults && (authorityResults.length === undefined || authorityResults.length === 0)))) {
      noResults = true;
      detailPanelIsVisible = false;
    } else {
      noResults = false;
    }
    let mergedRecord = [];
    if (!bibsOnly) {
      if (authorityResults && authorityResults.length > 0) {
        mergedRecord = [...mergedRecord, ...authorityResults];
      }
    }
    if (!autOnly) {
      if (bibliographicResults && bibliographicResults.length > 0) {
        mergedRecord = [...mergedRecord, ...bibliographicResults];
      }
    }
    const marcJSONRecords = (mergedRecord && mergedRecord.length > 0) ? remapForAssociatedBibList(mergedRecord) : [];
    const messageAuth = (totalAuthCount && totalAuthCount > 0) ? totalAuthCount + ' Authority records ' : ' NO Authority records found ';
    const messageBib = (totalBibCount && totalBibCount > 0) ? totalBibCount + ' Bibliographic records ' : ' NO Bibliographic records found ';

    const message = messageAuth + ' / ' + messageBib;
    const messageNoContent = '';
    const actionMenuItems = actionMenuItem(['ui-marccat.indexes.title', 'ui-marccat.diacritic.title']);
    const rightMenu = <ToolbarButtonMenu create {...this.props} label="ui-marccat.search.record.new.keyboard" />;
    const rightMenuEdit = <ToolbarButtonMenu create {...this.props} label="ui-marccat.search.record.edit" />;
    const leftMenu = <ToolbarMenu icon={['search']} />;
    return (
      <Paneset static>
        <Pane
          defaultWidth="fill"
          paneTitle={<FormattedMessage id="ui-marccat.search.record" />}
          paneSub={(mergedRecord && mergedRecord.length > 0) ? message : messageNoContent}
          appIcon={{ app: C.META.ICON_TITLE }}
          actionMenu={actionMenuItems}
          firstMenu={leftMenu}
          lastMenu={rightMenu}
        >
          {
            (isFetchingAuthority || isFetchingBibliographic) && (!isReadyBibliographic || !isReadyAuthority) &&
            <Icon icon="spinner-ellipsis" />
          }
          {
            (noResults) ?
              <EmptyMessage {...this.props} /> :
              (isReadyBibliographic || isReadyAuthority) ?
                <MultiColumnList
                  autosize
                  id="tabella"
                  defaultWidth="fill"
                  isEmptyMessage=""
                  columnWidths={
                    {
                      'resultView': '5%',
                      '001': '10%',
                      '245': '25%',
                      'name': '15%',
                      'uniformTitle': '10%',
                      'subject': '10%',
                      'date1': '5%',
                      'date2': '5%',
                      'format': '10%',
                      'countDoc': '5%'
                    }
                  }
                  rowMetadata={['001', 'recordView']}
                  onRowClick={this.handleDeatils}
                  contentData={marcJSONRecords}
                  formatter={resultsFormatter}
                  columnMapping={columnMapper}
                  onNeedMoreData={() => this.onNeedMoreData(marcJSONRecords)}
                  virtualize
                  loading={this.state.loading}
                  visibleColumns={[
                    'resultView',
                    '001',
                    '245',
                    'name',
                    'uniformTitle',
                    'subject',
                    'date1',
                    'date2',
                    'format',
                    'countDoc'
                  ]}
                /> : <EmptyMessage {...this.props} />}
        </Pane>

        {detailPanelIsVisible &&
        <Pane
          id="pane-details"
          defaultWidth="25%"
          paneTitle={<FormattedMessage id="ui-marccat.search.record.preview" />}
          paneSub={C.EMPTY_MESSAGE}
          appIcon={{ app: C.META.ICON_TITLE }}
          dismissible
          onClose={() => this.setState({ detailPanelIsVisible: false })}
          lastMenu={rightMenuEdit}
        >
          {(isFetchingDetail) ?
            <Icon icon="spinner-ellipsis" /> :
            (isReadyDetail) ?
              <RecordDetails {...this.props} /> : null
          }
        </Pane>
        }

        {isPanelBibAssOpen && !noResults &&
        <Pane
          id="pane-details"
          defaultWidth="25%"
          paneTitle={<FormattedMessage id="ui-marccat.search.record.preview" />}
          paneSub={C.EMPTY_MESSAGE}
          appIcon={{ app: C.META.ICON_TITLE }}
          dismissible
          onClose={() => {
            const { dispatch } = this.props;
            dispatch({ type: ActionTypes.CLOSE_ASSOCIATED_DETAILS, openPanel: false });
          }}
          lastMenu={rightMenuEdit}
        >
          {(isLoadingAssociatedRecord) ?
            <Icon icon="spinner-ellipsis" /> :
            (isReadyAssociatedRecord) ?
              <AssociatedBibDetails {...this.props} /> : null
          }
        </Pane>
        }
      </Paneset>
    );
  }
}

export default (connect(
  ({ marccat: { search, details, authSearch, countDoc, filter, associatedBibDetails } }) => ({
    bibliographicResults: search.records,
    totalBibCount: search.count,
    totalAuthCount: authSearch.count,
    authorityResults: authSearch.records,
    isFetchingBibliographic: search.isLoading,
    isFetchingAuthority: authSearch.isLoading,
    isReadyBibliographic: search.isReady,
    isReadyAuthority: authSearch.isReady,
    isFetchingDetail: details.isLoading,
    isReadyDetail: details.isReady,

    activeFilter: filter.filters,
    activeFilterName: filter.name,
    activeFilterChecked: filter.checked,
    countRecord: countDoc.records,

    isLoadingAssociatedRecord: associatedBibDetails.isLoading,
    isReadyAssociatedRecord: associatedBibDetails.isReady,
    associatedRecordDetails: associatedBibDetails.records,
    isPanelBibAssOpen: associatedBibDetails.mustOpenPanel,
  }),
)(injectCommonProp(SearchResults)));

