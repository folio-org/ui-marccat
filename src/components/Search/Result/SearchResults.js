/* eslint-disable no-useless-escape */
/* eslint-disable dot-notation */
/**
 * @format
 * @flow
 */
import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Paneset, HotKeys, PaneMenu, Icon } from '@folio/stripes/components';
import * as C from '../../../utils/Constant';
import { ActionTypes } from '../../../redux/actions';
import type { Props } from '../../../core';
import { ToolbarButtonMenu, DropdownButtonMenu as CreateButtonMenu, NoResultsMessage } from '../../../lib';
import { remapForAssociatedBibList } from '../../../utils/Mapper';
import { isAuthorityRecord } from '../../../utils/SearchUtils';
import { injectCommonProp } from '../../../core';
import {
  SearchResultPane,
  RecordDetailPane,
  AssociatedRecordPane,
} from './components';


type P = Props & {
  headings: Array<any>,
  inputValue: string,
  getPreviousPage: () => void,
  getNextPage:() => void,
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
      layerOpen: false,
      openDropDownMenu: false,
      detail: {},
      detailPaneMeta: {
        title: '',
        subTitle: ''
      }
    };

    this.handleDetails = this.handleDetails.bind(this);
    // this.onNeedMoreData = this.onNeedMoreData.bind(this);
    this.handleCreateRecord = this.handleCreateRecord.bind(this);
    this.renderRightMenuEdit = this.renderRightMenuEdit.bind(this);
    this.renderLastMenu = this.renderLastMenu.bind(this);
    this.transitionToParams = this.transitionToParams.bind(this);
    this.renderTemplateRoute = this.renderTemplateRoute.bind(this);
    this.keys = {
      'new': ['backspace'],
    };
    this.handlers = {
      'new': this.renderTemplateRoute,
    };
  }

  renderTemplateRoute = () => {
    const { dispatch, router } = this.props;
    dispatch({ type: ActionTypes.TEMPLATE_GET_BY_ID, query: 408 });
    router.push(`/marccat/record/template?templateId=${408}`);
  };

  handleClickEdit = () => {
    const { dispatch, router, toggleFilterPane } = this.props;
    const { detail } = this.state;
    dispatch({ type: ActionTypes.VIEW_TEMPLATE, query: '000' });
    const id = detail[0].data.fields[0]['001'];
    toggleFilterPane();
    router.push(`/marccat/records/view?id=${id}`);
  }

  handleCreateRecord = () => {
    const { router, toggleFilterPane } = this.props;
    toggleFilterPane();
    this.setState(prevState => ({ layerOpen: !prevState.layerOpen }));
    router.push('/marccat/record?templateId=123');
  };

  handleOnToggle = () => {
    this.setState(prevState => ({ openDropDownMenu: !prevState.openDropDownMenu }));
  }

  transitionToParams = (key, value) => {
    const { location, router } = this.props;
    const url = location.pathname;
    router.push((url.match(/[\?]/g) ? '&' : '?') + `${key}=${value}`);
  };

  handleDetails = (e, meta) => {
    const { dispatch, data } = this.props;
    dispatch({ type: ActionTypes.CLOSE_PANELS, closePanels: false });
    const id = meta['001'];
    const detailSelected = data.search.bibliographicResults.filter(item => id === item.data.fields[0]['001']) || {};
    this.transitionToParams('id', id);
    dispatch({
      type: '@@ui-marccat/QUERY',
      data: {
        path: C.ENDPOINT.BIBLIOGRAPHIC_RECORD + '/' + id,
        id,
        type: 'marcRecordDetail',
        params: 'type=B&lang=ita&view=1',
      } });
    dispatch({ type: ActionTypes.DETAILS, query: id, recordType: meta.recordView });
    if (isAuthorityRecord(meta)) {
      dispatch({ type: ActionTypes.ASSOCIATED_BIB_REC, query: meta.queryForBibs, recordType: meta.recordView, openPanel: true });
      this.setState({
        detail: detailSelected,
        detailPanelIsVisible: true,
        detailPaneMeta: {
          title: 'Auth. • ' + id,
          subTitle: meta['100']
        }
      });
    } else {
      this.setState({
        detail: detailSelected,
        detailPanelIsVisible: true,
        detailPaneMeta: {
          title: 'Bib. • ' + id,
          subTitle: meta['245']
        }
      });
    }
    dispatch({ type: ActionTypes.CLOSE_ASSOCIATED_DETAILS, openPanel: false });
  };

  renderRightMenuEdit = props => {
    return (
      <PaneMenu>
        <ToolbarButtonMenu
          create
          {...props}
          onClick={this.handleClickEdit}
          label={<FormattedMessage id="ui-marccat.search.record.edit" />}
        />
        <Icon icon="bookmark" />
        <Icon icon="tag" />
      </PaneMenu>
    );
  };

  renderDropdownLabels = () => {
    const { translate } = this.props;
    return [{
      label: translate({ id: 'ui-marccat.button.new.auth' }),
      shortcut: translate({ id: 'ui-marccat.button.new.short.auth' }),
      onClick: this.renderTemplateRoute,
    },
    {
      label: translate({ id: 'ui-marccat.button.new.bib' }),
      shortcut: translate({ id: 'ui-marccat.button.new.short.bib' }),
      onClick: this.renderTemplateRoute,
    }];
  };

  renderLastMenu = () => {
    const { openDropDownMenu } = this.state;
    const { translate, activeFilterName, activeFilterChecked } = this.props;
    return (activeFilterName === 'recordType.Bibliographic records' && activeFilterChecked) ?
      (<CreateButtonMenu
        {...this.props}
        label={translate({ id: 'ui-marccat.search.record.new.from.template' })}
        labels={this.renderDropdownLabels()}
        onToggle={this.renderTemplateRoute}
        noDropdown
      />) : (<CreateButtonMenu
        {...this.props}
        label={translate({ id: 'ui-marccat.search.record.new' })}
        labels={this.renderDropdownLabels()}
        onToggle={() => this.setState({
          openDropDownMenu: !openDropDownMenu
        })}
        open={openDropDownMenu}
      />);
  };

  renderCreateTemplateButton = () => {
    const { translate } = this.props;
    return (
      <CreateButtonMenu
        data-test-clickable-new-record
        {...this.props}
        label={translate({ id: 'ui-marccat.template.record.create' })}
        labels={this.renderDropdownLabels()}
        onToggle={this.renderTemplateRoute}
        noDropdown
      />);
  };

  render() {
    let { bibsOnly, autOnly, detailPanelIsVisible, noResults } = this.state;
    const { loading, detailPaneMeta, detail } = this.state;
    const {
      activeFilter,
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
      isReadyAssociatedRecord,
      closePanels
    } = this.props;
    if (activeFilter) {
      const filterArray = [];
      Object.keys(activeFilter).forEach((key) => filterArray.push(key + ':' + activeFilter[key]));
      filterArray.map(filterEl => (filterEl === 'recordType.Bibliographic records:true' ? bibsOnly = true : filterEl === 'recordType.Bibliographic records:false' ? bibsOnly = false : filterEl === 'recordType.Authority records:true' ? autOnly = true : filterEl === 'recordType.Authority records:false' ? autOnly = false : null));
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
    const marcJSONRecords = (mergedRecord && mergedRecord.length > 0) ? remapForAssociatedBibList(mergedRecord) : [];
    const messageAuth = (totalAuthCount && totalAuthCount > 0) ? totalAuthCount + ' Authority records ' : ' No Authority records found ';
    const messageBib = (totalBibCount && totalBibCount > 0) ? totalBibCount + ' Bibliographic records ' : ' No Bibliographic records found ';
    let message = C.EMPTY_MESSAGE;

    if (autOnly) {
      message = messageAuth;
    } else if (bibsOnly) {
      message = messageBib;
    } else {
      message = messageAuth.concat('/').concat(messageBib);
    }

    const messageNoContent = <FormattedMessage id="ui-marccat.search.initial.message" />;
    return (
      <HotKeys keyMap={this.keys} handlers={this.handlers} style={{ width: 100 + '%' }}>
        <Paneset static>
          <SearchResultPane
            marcJSONRecords={marcJSONRecords}
            isFetching={isFetching}
            firstMenu={firstMenu}
            lastMenu={this.renderLastMenu()}
            mergedRecord={mergedRecord}
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
              detailPaneMeta={detailPaneMeta}
              detail={detail}
              isFetchingDetail={isFetchingDetail}
              isReadyDetail={isReadyDetail}
              onClose={() => this.setState({ detailPanelIsVisible: false })}
              rightMenuEdit={this.renderRightMenuEdit()}
            />
          }
          {isPanelBibAssOpen && !noResults &&
            <AssociatedRecordPane
              onClose={() => {
                const { dispatch } = this.props;
                dispatch({ type: ActionTypes.CLOSE_ASSOCIATED_DETAILS, openPanel: false });
              }}
              isLoadingAssociatedRecord={isLoadingAssociatedRecord}
              isReadyAssociatedRecord={isReadyAssociatedRecord}
              renderRightMenuEdit={this.renderRightMenuEdit}
            />
          }
        </Paneset>
      </HotKeys>
    );
  }
}

export default (connect(
  ({ marccat: { search, details, countDoc, filter, associatedBibDetails, template, settings, panels } }) => ({
    bibliographicResults: search.bibliographicResults,
    totalBibCount: search.bibCounter,
    totalAuthCount: search.authCounter,
    authorityResults: search.authorityResults || [],
    isFetching: search.isLoading,
    isReady: search.isReady,
    isFetchingDetail: details.isLoading,
    isReadyDetail: details.isReady,
    defaultTemplate: template.default,
    activeFilter: filter.filters,
    activeFilterName: filter.name,
    activeFilterChecked: filter.checked,
    countRecord: countDoc.records,
    settings: settings.data,
    isLoadingAssociatedRecord: associatedBibDetails.isLoading,
    isReadyAssociatedRecord: associatedBibDetails.isReady,
    associatedRecordDetails: associatedBibDetails.records,
    isPanelBibAssOpen: associatedBibDetails.mustOpenPanel,
    closePanels: panels.closePanels
  }),
)(injectCommonProp(SearchResults)));
