/* eslint-disable no-useless-escape */
/* eslint-disable dot-notation */
/**
 * @format
 * @flow
 */
import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Pane, Paneset, Icon, MultiColumnList, HotKeys } from '@folio/stripes/components';
import * as C from '../../../utils/Constant';
import { ActionTypes } from '../../../redux/actions';
import type { Props } from '../../../core';
import { EmptyMessage, NoResultsMessage } from '../../../lib/components/Message';
import { ToolbarButtonMenu, ActionMenu, ActionMenuDetail, CreateButtonMenu } from '../../../lib';
import { remapForAssociatedBibList } from '../../../utils/Mapper';
import { resultsFormatter, columnMapper } from '../../../utils/Formatter';
import { isAuthorityRecord } from '../../../utils/SearchUtils';
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
      layerOpen: false,
      openDropDownMenu: false,
      detail: {},
      detailPaneMeta: {
        title: '',
        subTitle: ''
      }
    };
    this.handleDetails = this.handleDetails.bind(this);
    this.onNeedMoreData = this.onNeedMoreData.bind(this);
    this.handleCreateRecord = this.handleCreateRecord.bind(this);
    this.renderRightMenuEdit = this.renderRightMenuEdit.bind(this);
    this.renderLastMenu = this.renderLastMenu.bind(this);
    this.transitionToParams = this.transitionToParams.bind(this);
    this.renderTemplateRoute = this.renderTemplateRoute.bind(this);
    this.keys = {
      'new' : ['backspace'],
    };

    this.handlers = {
      'new': this.renderTemplateRoute,
    };
  }

  renderTemplateRoute = () => {
    const { dispatch, router, settings, toggleFilterPane } = this.props;
    toggleFilterPane();
    const defaultTemplate = settings.defaultTemplate.id;
    dispatch({ type: ActionTypes.TEMPLATE_GET_BY_ID, query: defaultTemplate });
    router.push(`/marccat/template?templateId=${defaultTemplate}`);
  };

  handleClickEdit = () => {
    const { dispatch, router } = this.props;
    dispatch({ type: ActionTypes.VIEW_TEMPLATE, query: '000' });
    router.push('/marccat/template');
  }

  handleCreateRecord = () => {
    const { router, toggleFilterPane } = this.props;
    toggleFilterPane();
    this.setState(prevState => ({ layerOpen: !prevState.layerOpen }));
    router.push('/marccat/template?templateId=123');
  };

  handleOnToggle = () => {
    this.setState(prevState => ({ openDropDownMenu: !prevState.openDropDownMenu }));
  }

  addUrlParam(key, value) {
    const { location, router } = this.props;
    const url = location.pathname;
    const newParam = key + '=' + value;
    let result = url.replace(new RegExp('(&|\\?)' + key + '=[^\&|#]*'), '$1' + newParam);
    if (result === url) {
      result = (url.indexOf('?') !== -1 ? url.split('?')[0] + '?' + newParam + '&' + url.split('?')[1]
        : (url.indexOf('#') !== -1 ? url.split('#')[0] + '?' + newParam + '#' + url.split('#')[1]
          : url + '?' + newParam));
    }
    router.push(result);
  }

  transitionToParams = (key, value) => {
    const { location, router } = this.props;
    const url = location.pathname;
    router.push((url.match(/[\?]/g) ? '&' : '?') + `${key}=${value}`);
  };

  handleDetails = (e, meta) => {
    const { dispatch, data } = this.props;
    const id = meta['001'];
    const detailSelected = data.search.bibliographicResults.filter(item => id === item.data.fields[0]['001']) || {};
    this.transitionToParams('idNumber', id);
    dispatch({ type: ActionTypes.DETAILS, query: id, recordType: meta.recordView });
    if (isAuthorityRecord(meta)) {
      dispatch({ type: ActionTypes.ASSOCIATED_BIB_REC, query: meta.queryForBibs, recordType: meta.recordView });
      this.setState({
        detail: detailSelected,
        detailPaneMeta: {
          title: 'Auth. • ' + id,
          subTitle: meta['uniformTitle'] + ' / ' + meta['name']
        }
      });
    } else {
      this.setState({
        detail: detailSelected,
        detailPanelIsVisible: true,
        detailPaneMeta: {
          title: 'Bib. • ' + id,
          subTitle: meta['uniformTitle'] + ' / ' + meta['name']
        }
      });
    }
    dispatch({ type: ActionTypes.CLOSE_ASSOCIATED_DETAILS, openPanel: false });
  };

  onNeedMoreData = (initialData: Array<any>) => {
    return initialData.slice(10, 20);
  };

  renderRightMenuEdit = props => {
    return (
      <ToolbarButtonMenu
        create
        {...props}
        onClick={this.handleClickEdit}
        label={<FormattedMessage id="ui-marccat.search.record.edit" />}
      />
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
        onToggle={this.handleOnToggle}
        open={openDropDownMenu}
      />);
  };

  renderCreateTemplateButton = () => {
    const { translate } = this.props;
    return (
      <CreateButtonMenu
        {...this.props}
        label={translate({ id: 'ui-marccat.template.record.create' })}
        labels={this.renderDropdownLabels()}
        onToggle={this.renderTemplateRoute}
        noDropdown
      />);
  };

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
    let { bibsOnly, autOnly, detailPanelIsVisible, noResults } = this.state;
    const { loading, detailPaneMeta, detail } = this.state;
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
      isReadyAssociatedRecord,
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
    let message = '';

    if (autOnly) {
      message = messageAuth;
    } else if (bibsOnly) {
      message = messageBib;
    } else {
      message = messageAuth + ' / ' + messageBib;
    }

    const messageNoContent = <FormattedMessage id="ui-marccat.search.initial.message" />;
    return (
      <HotKeys keyMap={this.keys} handlers={this.handlers} style={{ width: 100 + '%' }}>
        <Paneset static>
          <Pane
            padContent={(marcJSONRecords.length > 0) || isFetching}
            defaultWidth="fill"
            actionMenu={ActionMenu}
            paneTitle={<FormattedMessage id="ui-marccat.search.record" />}
            paneSub={(mergedRecord && mergedRecord.length > 0) ? message : messageNoContent}
            appIcon={{ app: C.META.ICON_TITLE }}
            firstMenu={firstMenu}
            lastMenu={this.renderLastMenu()}
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
                      formatter={resultsFormatter(bibsOnly, false)}
                      columnMapping={columnMapper(bibsOnly)}
                      onNeedMoreData={() => this.onNeedMoreData(marcJSONRecords)}
                      virtualize
                      loading={loading}
                      visibleColumns={this.renderVisibleColumns()}
                    /> :
                    <EmptyMessage {...this.props} />
            }
          </Pane>
          {detailPanelIsVisible &&
          <Pane
            id="pane-details"
            defaultWidth="30%"
            paneTitle={detailPaneMeta.title}
            paneSub={detailPaneMeta.subTitle}
            appIcon={{ app: C.META.ICON_TITLE }}
            actionMenu={ActionMenuDetail}
            dismissible
            onClose={() => this.setState({ detailPanelIsVisible: false })}
            lastMenu={this.renderRightMenuEdit()}
          >
            {(isFetchingDetail) ?
              <Icon icon="spinner-ellipsis" /> :
              (isReadyDetail) ?
                <RecordDetails {...this.props} detail={detail} /> : null
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
            actionMenu={ActionMenu}
            dismissible
            onClose={() => {
              const { dispatch } = this.props;
              dispatch({ type: ActionTypes.CLOSE_ASSOCIATED_DETAILS, openPanel: false });
            }}
            lastMenu={this.renderRightMenuEdit}
          >
            {(isLoadingAssociatedRecord) ?
              <Icon icon="spinner-ellipsis" /> :
              (isReadyAssociatedRecord) ?
                <AssociatedBibDetails {...this.props} /> : null
            }
          </Pane>
          }
        </Paneset>
      </HotKeys>
    );
  }
}


export default (connect(
  ({ marccat: { search, details, countDoc, filter, associatedBibDetails, template, settings } }) => ({
    bibliographicResults: search.bibliographicResults,
    totalBibCount: search.bibCounter,
    totalAuthCount: search.authCounter,
    authorityResults: search.authorityResults,
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
    isPanelBibAssOpen: associatedBibDetails.mustOpenPanel
  }),
)(injectCommonProp(SearchResults)));
