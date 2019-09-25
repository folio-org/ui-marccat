/* eslint-disable dot-notation */
// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Paneset, HotKeys, PaneMenu } from '@folio/stripes/components';
import { ACTION } from '../../../redux/actions';
import type { Props } from '../../../flow/types.js.flow';
import { NoResultsMessage, injectProps, remapForAssociatedBibList } from '../../../shared';
import { isAuthorityRecord, transitionToParams } from '../Utils/SearchUtils';
import {
  SearchResultPane,
  RecordDetailPane,
  AssociatedRecordPane,
} from './components';
import { CreateRecordButton, EditRecordButton } from '..';
import { emptyRecordAction } from '../../Cataloguing/Actions';
import { searchDetailAction } from '../Actions';
import * as C from '../../../config/constants';

type P = Props & {
  headings: Array<any>,
  inputValue: string,
  getPreviousPage: () => void,
  getNextPage: () => void,
  detail: Object,
  dataLoaded: boolean,
  loading: boolean,
  isPanelOpen: boolean,
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
      detail: {},
      detailPaneMeta: {
        title: C.EMPTY_STRING,
        subTitle: C.EMPTY_STRING
      }
    };

    this.handleDetails = this.handleDetails.bind(this);
    this.handleCreateRecord = this.handleCreateRecord.bind(this);
    this.renderLastMenu = this.renderLastMenu.bind(this);
  }

  handleCreateRecord = () => {
    const { router, toggleFilterPane, datastore: { emptyRecord } } = this.props;
    toggleFilterPane();
    router.push(`/marccat/cataloging?id=${emptyRecord.results.id}&mode=new`);
  };

  handleOnToggle = () => {
    this.setState(prevState => ({ openDropDownMenu: !prevState.openDropDownMenu }));
  }

  openDetailFromCataloguing = () => {
    const { dispatch, data: { data } } = this.props;
    const detail = data.marcRecordDetail;
    if (isAuthorityRecord(detail.meta)) {
      this.setState({
        detail,
        detailPanelIsVisible: true,
        detailPaneMeta: {
          title: 'Auth. • ' + detail.id,
          subTitle: detail.meta['100']
        }
      });
    } else {
      this.setState({
        detail,
        detailPanelIsVisible: true,
        detailPaneMeta: {
          title: 'Bib. • ' + detail.id,
          subTitle: detail.meta['245']
        }
      });
    }
    dispatch({ type: ACTION.CLOSE_ASSOCIATED_DETAILS, openPanel: false });
  };

  handleDetails = (e, meta) => {
    const { store: { dispatch }, data, router } = this.props;
    const id = meta['001'];
    dispatch(searchDetailAction(id));
    dispatch({ type: ACTION.CLOSE_PANELS, closePanels: false });
    let mergedResults;
    let detailSelected;
    if (data.search.dataOld !== undefined) {
      mergedResults = [
        ...data.search.bibliographicResults,
        ...data.search.oldBibArray,
        ...data.search.authorityResults,
        ...data.search.oldAuthArray];
      detailSelected = mergedResults.filter(item => id === item.data.fields[0]['001']);
    } else {
      detailSelected = data.search.bibliographicResults.filter(item => id === item.data.fields[0]['001']);
    }
    if (detailSelected.length === 0) {
      detailSelected = data.search.authorityResults.filter(item => id === item.data.fields[0]['001']);
    }
    transitionToParams('id', id);

    dispatch({ type: ACTION.DETAILS, query: id, recordType: meta.recordView });
    if (isAuthorityRecord(meta)) {
      dispatch({ type: ACTION.ASSOCIATED_BIB_REC, query: meta.queryForBibs, recordType: meta.recordView, openPanel: true });
      this.setState({
        detail: detailSelected,
        detailPanelIsVisible: true,
        detailPaneMeta: {
          meta,
          title: 'Auth. • ' + id,
          subTitle: meta['100'],
          detail: detailSelected,
        }
      });
    } else {
      this.setState({
        detail: detailSelected,
        detailPanelIsVisible: true,
        detailPaneMeta: {
          meta,
          title: 'Bib. • ' + id,
          subTitle: meta['245'],
          detail: detailSelected
        }
      });
    }
    dispatch({ type: ACTION.CLOSE_ASSOCIATED_DETAILS, openPanel: false });
    router.push(`/marccat/search?id=${id}`);
  };

  renderDropdownLabels = () => {
    const { translate } = this.props;
    return [{
      label: translate({ id: 'ui-marccat.button.new.auth' }),
      shortcut: translate({ id: 'ui-marccat.button.new.short.auth' }),
      onClick: this.handleCreateRecord,
    },
    {
      label: translate({ id: 'ui-marccat.button.new.bib' }),
      shortcut: translate({ id: 'ui-marccat.button.new.short.bib' }),
      onClick: this.handleCreateRecord,
    }];
  };

  renderLastMenu = () => {
    const { openDropDownMenu } = this.state;
    const { activeFilterName, activeFilterChecked, data: { data: { emptyRecord } } } = this.props;
    return (activeFilterName === 'recordType.Bibliographic records' && activeFilterChecked) ?
      (
        <PaneMenu>
          <CreateRecordButton
            {...this.props}
            data-test-clickable-new-record
            label="search.record.new"
            labels={this.renderDropdownLabels()}
            onToggle={this.handleCreateRecord}
            disabled={!emptyRecord}
            withIcon
            noDropdown
          />
        </PaneMenu>
      ) :
      (
        <PaneMenu>
          <CreateRecordButton
            style={{ marginRight: '5px' }}
            {...this.props}
            data-test-clickable-new-record
            label="search.record.new"
            labels={this.renderDropdownLabels()}
            disabled={!emptyRecord}
            withIcon
            onToggle={() => this.setState({
              openDropDownMenu: !openDropDownMenu
            })}
            open={openDropDownMenu}
          />
        </PaneMenu>
      );
  };

  render() {
    let { bibsOnly, autOnly, detailPanelIsVisible, noResults } = this.state;
    const { loading, detailPaneMeta, detail } = this.state;
    const {
      activeFilter,
      totalAuthCount,
      totalBibCount,
      oldBibToIncrement,
      oldAuthToIncrement,
      queryMoreBib,
      queryMoreAuth,
      countMoreData,
      firstMenu,
      isFetching,
      isReady,
      isPanelBibAssOpen,
      isReadyDetail,
      isFetchingDetail,
      isLoadingAssociatedRecord,
      isReadyAssociatedRecord,
      closePanels,
      totalAuth,
      totalBib,
      store
    } = this.props;
    let { bibliographicResults, authorityResults } = this.props;
    const customColumn = [];
    if (store.getState().form.checkboxForm && store.getState().form.checkboxForm.values) {
      const columns = store.getState().form.checkboxForm.values;
      Object.keys(columns).map((e) => {
        if (e !== 'checkboxForm' && columns[e] === true) {
          customColumn.push(e.split('-')[0]);
        }
        return customColumn;
      });
    }

    if (activeFilter) {
      const filterArray = [];
      Object.keys(activeFilter).forEach((key) => filterArray.push(key + ':' + activeFilter[key]));
      filterArray.map(filterEl => (filterEl === 'recordType.Bibliographic records:true' ? bibsOnly = true : filterEl === 'recordType.Bibliographic records:false' ? bibsOnly = false : filterEl === 'recordType.Authority records:true' ? autOnly = true : filterEl === 'recordType.Authority records:false' ? autOnly = false : null));
    }
    if (!(oldBibToIncrement === undefined) && oldBibToIncrement.length > 0 && bibliographicResults.length > 0) {
      bibliographicResults = [...oldBibToIncrement, ...bibliographicResults];
    }
    if (!(oldBibToIncrement === undefined) && oldBibToIncrement.length > 0 && bibliographicResults.length === 0) {
      bibliographicResults = oldBibToIncrement;
    }
    if (!(oldAuthToIncrement === undefined) && oldAuthToIncrement.length > 0 && authorityResults.length > 0) {
      authorityResults = [...oldAuthToIncrement, ...authorityResults];
    }
    if (!(oldAuthToIncrement === undefined) && oldAuthToIncrement.length > 0 && authorityResults.length === 0) {
      authorityResults = oldAuthToIncrement;
    }
    if ((bibliographicResults === undefined && authorityResults === undefined)
      || (bibliographicResults && (bibliographicResults.length === undefined
        || bibliographicResults.length === 0)
        && (authorityResults && (authorityResults.length === undefined || authorityResults.length === 0)))) {
      noResults = true;
      detailPanelIsVisible = false;
    } else {
      noResults = false;
    }
    let mergedRecord = [];
    if (bibsOnly === false && autOnly === true) {
      if (authorityResults && authorityResults.length > 0) {
        mergedRecord = [...mergedRecord, ...authorityResults];
      } else if (authorityResults && authorityResults.length === 0) {
        return <NoResultsMessage {...this.props} />;
      }
    }
    if ((bibsOnly === true && autOnly === true) || (bibsOnly === false && autOnly === false)) {
      if (bibliographicResults && bibliographicResults.length > 0) {
        mergedRecord = [...authorityResults, ...bibliographicResults];
      }
    }
    if (autOnly === false && bibsOnly === true) {
      if (bibliographicResults && bibliographicResults.length > 0) {
        mergedRecord = [...mergedRecord, ...bibliographicResults];
      } else if (bibliographicResults && bibliographicResults.length === 0) {
        return <NoResultsMessage {...this.props} />;
      }
    }

    const containerMarcJSONRecords = (mergedRecord && mergedRecord.length > 0) ? remapForAssociatedBibList(mergedRecord) : [];
    const messageAuth = (totalAuthCount !== undefined && totalAuth > 0) ? authorityResults.length + ' of ' + totalAuth + ' Authority records ' : ' No Authority records found ';
    const messageBib = (totalBibCount !== undefined && totalBib > 0) ? bibliographicResults.length + ' of ' + totalBib + ' Bibliographic records ' : ' No Bibliographic records found ';
    let message = C.EMPTY_STRING;
    if (autOnly) {
      message = messageAuth;
    }
    if (bibsOnly) {
      message = messageBib;
    }
    if (bibsOnly && autOnly) {
      message = messageAuth.concat('/').concat(messageBib);
    } else if (!bibsOnly && !autOnly) {
      message = messageAuth.concat('/').concat(messageBib);
    }
    const messageNoContent = <FormattedMessage id="ui-marccat.search.initial.message" />;
    return (
      <HotKeys keyMap={this.keys} handlers={this.handlers} style={{ width: 100 + '%' }}>
        <Paneset static>
          <SearchResultPane
            customColumn={customColumn}
            containerMarcJSONRecords={containerMarcJSONRecords}
            isFetching={isFetching}
            queryMoreAuth={queryMoreAuth}
            queryMoreBib={queryMoreBib}
            countMoreData={countMoreData}
            firstMenu={firstMenu}
            lastMenu={this.renderLastMenu()}
            mergedRecord={containerMarcJSONRecords}
            message={message}
            noResults={noResults}
            bibliographicResults={bibliographicResults}
            authorityResults={authorityResults}
            handleDetails={this.handleDetails}
            isReady={isReady}
            autOnly={autOnly}
            bibsOnly={bibsOnly}
            loading={loading}
            messageNoContent={messageNoContent}
          />
          {detailPanelIsVisible && (closePanels === false) &&
            <RecordDetailPane
              {...this.props}
              detailPaneMeta={detailPaneMeta}
              detail={detail}
              isFetchingDetail={isFetchingDetail}
              isReadyDetail={isReadyDetail}
              onClose={() => this.setState({ detailPanelIsVisible: false })}
              rightMenuEdit={<EditRecordButton {...this.props} />
              }
            />
          }
          {isPanelBibAssOpen && !noResults &&
            <AssociatedRecordPane
              onClose={() => {
                const { dispatch } = this.props;
                dispatch({ type: ACTION.CLOSE_ASSOCIATED_DETAILS, openPanel: false });
              }}
              isLoadingAssociatedRecord={isLoadingAssociatedRecord}
              isReadyAssociatedRecord={isReadyAssociatedRecord}
              renderRightMenuEdit={<EditRecordButton {...this.props} />}
            />
          }
        </Paneset>
      </HotKeys>
    );
  }
}

export default (connect(
  ({ marccat: { search, details, countDoc, filter, totalBibRecords, totalAuthRecords, associatedBibDetails, settings, panels } }) => ({
    bibliographicResults: search.bibliographicResults,
    oldDataToIncrement: search.dataOld,
    oldBibToIncrement: search.oldBibArray,
    oldAuthToIncrement: search.oldAuthArray,
    queryMoreBib: search.queryBib,
    queryMoreAuth: search.queryAuth,
    countMoreData: search.to,
    totalBibCount: search.bibCounter,
    totalAuthCount: search.authCounter,
    authorityResults: search.authorityResults || [],
    isFetching: search.isLoading,
    isReady: search.isReady,
    isFetchingDetail: details.isLoading,
    isReadyDetail: details.isReady,
    activeFilter: filter.filters,
    activeFilterName: filter.name,
    activeFilterChecked: filter.checked,
    countRecord: countDoc.records,
    settings: settings.data,
    isLoadingAssociatedRecord: associatedBibDetails.isLoading,
    isReadyAssociatedRecord: associatedBibDetails.isReady,
    associatedRecordDetails: associatedBibDetails.records,
    isPanelBibAssOpen: associatedBibDetails.mustOpenPanel,
    closePanels: panels.closePanels,
    totalBib: totalBibRecords.totalBibDoc,
    totalAuth: totalAuthRecords.totalAuthDoc
  }),
  (dispatch) => dispatch(emptyRecordAction()),
)(injectProps(SearchResults)));
