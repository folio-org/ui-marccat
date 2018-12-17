import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Pane, Paneset, Icon, MultiColumnList } from '@folio/stripes-components';
import * as C from '../../../utils/Constant';
import { ActionTypes } from '../../../redux/actions';
import type { Props } from '../../../core';
import { EmptyMessage, NoResultsMessage } from '../../../lib/Message';
import { ToolbarButtonMenu } from '../../../lib';
import { remapForAssociatedBibList } from '../../../utils/Mapper';
import { resultsFormatter, columnMapper } from '../../../utils/Formatter';
import { isAuthorityRecord } from '../../../utils/SearchUtils';
import RecordDetails from './RecordDetails';
import { injectCommonProp } from '../../../core';
import AssociatedBibDetails from './AssociatedBibDetails';
import MyActionMenu from '../../MyActionMenus/MyActionMenu';
import MyNewButtonMenu from '../../MyActionMenus/MyNewButtonMenu';


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
      openDropDownMenu: false,
    };
    this.handleDetails = this.handleDetails.bind(this);
    this.onNeedMoreData = this.onNeedMoreData.bind(this);
  }

  handleClickEdit = () => {
    const { dispatch, history } = this.props;
    dispatch({ type: ActionTypes.VIEW_TEMPLATE, query: '000' });
    history.push('/marccat/template');
  }

  handleOnToggle = () => {
    this.setState(prevState => ({ openDropDownMenu: !prevState.openDropDownMenu }));
  }

  handleDetails = (e, meta) => {
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
    /* eslint-disable-next-line prefer-const */
    let { bibsOnly, autOnly, detailPanelIsVisible, noResults, loading, openDropDownMenu } = this.state;
    const {
      activeFilter,
      activeFilterName,
      activeFilterChecked,
      totalAuthCount,
      totalBibCount,
      bibliographicResults,
      authorityResults,
      firstMenu,
      isFetching,
      isReady,
      isPanelBibAssOpen,
      isReadyDetail,
      isFetchingDetail,
      isLoadingAssociatedRecord,
      isReadyAssociatedRecord
    } = this.props;
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
    if ((bibliographicResults === undefined && authorityResults === undefined) || (bibliographicResults && (bibliographicResults.length === undefined || bibliographicResults.length === 0) && (authorityResults && (authorityResults.length === undefined || authorityResults.length === 0)))) {
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
    const messageAuth = (totalAuthCount && totalAuthCount > 0) ? totalAuthCount + ' Authority records ' : ' No Authority records found ';
    const messageBib = (totalBibCount && totalBibCount > 0) ? totalBibCount + ' Bibliographic records ' : ' No Bibliographic records found ';

    const message = messageAuth + ' / ' + messageBib;
    const messageNoContent = <FormattedMessage id="ui-marccat.search.initial.message" />;
    const rightMenuEdit = <ToolbarButtonMenu create {...this.props} onClick={this.handleClickEdit} label="ui-marccat.search.record.edit" />;
    return (
      <Paneset static>
        <Pane
          padContent={(marcJSONRecords.length > 0) || isFetching}
          defaultWidth="fill"
          paneTitle={<FormattedMessage id="ui-marccat.search.record" />}
          paneSub={(mergedRecord && mergedRecord.length > 0) ? message : messageNoContent}
          appIcon={{ app: C.META.ICON_TITLE }}
          firstMenu={firstMenu}
          lastMenu={<MyNewButtonMenu open={openDropDownMenu} onToggle={this.handleOnToggle} />}
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
                    onRowClick={this.handleDetails}
                    contentData={marcJSONRecords}
                    formatter={resultsFormatter}
                    columnMapping={columnMapper}
                    onNeedMoreData={() => this.onNeedMoreData(marcJSONRecords)}
                    virtualize
                    loading={loading}
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
                      'tagHighlighted',
                      'countDoc'
                    ]}
                  /> : <EmptyMessage {...this.props} />
          }
        </Pane>

        {detailPanelIsVisible &&
          <Pane
            id="pane-details"
            defaultWidth="30%"
            paneTitle={<FormattedMessage id="ui-marccat.search.record.preview" />}
            paneSub={C.EMPTY_MESSAGE}
            appIcon={{ app: C.META.ICON_TITLE }}
            actionMenu={MyActionMenu}
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
            actionMenu={MyActionMenu}
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
  ({ marccat: { search, details, countDoc, filter, associatedBibDetails } }) => ({
    bibliographicResults: search.bibliographicResults,
    totalBibCount: search.bibCounter,
    totalAuthCount: search.authCounter,
    authorityResults: search.authorityResults,
    isFetching: search.isLoading,
    isReady: search.isReady,
    isFetchingDetail: details.isLoading,
    isReadyDetail: details.isReady,

    activeFilter: filter.filters,
    activeFilterName: filter.name,
    activeFilterChecked: filter.checked,
    countRecord: countDoc.records,

    isLoadingAssociatedRecord: associatedBibDetails.isLoading,
    isReadyAssociatedRecord: associatedBibDetails.isReady,
    associatedRecordDetails: associatedBibDetails.records,
    isPanelBibAssOpen: associatedBibDetails.mustOpenPanel
  }),
)(injectCommonProp(SearchResults)));
