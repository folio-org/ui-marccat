/* eslint-disable dot-notation */
/**
 * @format
 * @flow
 */
import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Paneset, HotKeys, PaneMenu, Icon, Button } from '@folio/stripes/components';
import { ActionTypes } from '../../../redux/actions';
import type { Props } from '../../../core';
import { ToolbarButtonMenu, DropdownButtonMenu as CreateButtonMenu, NoResultsMessage } from '../../../lib';
import { remapForAssociatedBibList } from '../../../utils/Mapper';
import { isAuthorityRecord, transitionToParams } from '../Utils/SearchUtils';
import { injectCommonProp } from '../../../core';
import {
  SearchResultPane,
  RecordDetailPane,
  AssociatedRecordPane,
} from './components';
import { emptyRecordAction, searchDetailAction } from '../Actions/ActionCreator';
import * as C from '../../../shared/Constants';


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
        title: C.EMPTY_STRING,
        subTitle: C.EMPTY_STRING
      }
    };

    this.handleDetails = this.handleDetails.bind(this);
    this.handleCreateRecord = this.handleCreateRecord.bind(this);
    this.renderRightMenuEdit = this.renderRightMenuEdit.bind(this);
    this.renderLastMenu = this.renderLastMenu.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
    this.keys = {
      'new': ['backspace'],
    };
    this.handlers = {
      'new': this.handleCreateRecord,
    };
  }

  componentDidMount() {
    const { store: { getState } } = this.props;
    // const editRecord = findParam('edited');
    if (getState().marccat.settings && getState().marccat.settings.fromCataloginge) {
      // this.openDetailFromCataloguing();
      const formValues = getState().form.searchForm.values;
      const searchFieldValue = formValues.searchTextArea;
      document.getElementsByName('searchTextArea')[0].value = searchFieldValue;
      // dispatch(change('searchTextArea', searchFieldValue));
    }
  }

  handleClickEdit = () => {
    const { router, toggleFilterPane } = this.props;
    const { detail } = this.state;
    const id = detail['001'];
    toggleFilterPane();
    router.push(`/marccat/record/view?id=${id}&mode=edit`);
  }

  handleCreateRecord = () => {
    const { router, toggleFilterPane } = this.props;
    toggleFilterPane();
    this.setState(prevState => ({ layerOpen: !prevState.layerOpen }));
    router.push(`/marccat/record/template?templateId=${408}&mode=new`);
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
    dispatch({ type: ActionTypes.CLOSE_ASSOCIATED_DETAILS, openPanel: false });
  };

  handleDetails = (e, meta) => {
    const { store: { dispatch }, data } = this.props;
    dispatch({ type: ActionTypes.CLOSE_PANELS, closePanels: false });
    const id = meta['001'];
    const detailMeta = meta;
    const detailSelected = data.search.bibliographicResults.filter(item => id === item.data.fields[0]['001']) || {};
    transitionToParams('id', id);
    dispatch(searchDetailAction(id));
    dispatch({ type: ActionTypes.DETAILS, query: id, recordType: meta.recordView });
    if (isAuthorityRecord(meta)) {
      dispatch({ type: ActionTypes.ASSOCIATED_BIB_REC, query: meta.queryForBibs, recordType: meta.recordView, openPanel: true });
      this.setState({
        detail: detailSelected,
        detailPanelIsVisible: true,
        detailPaneMeta: {
          meta,
          title: 'Auth. • ' + id,
          subTitle: meta['100']
        }
      });
    } else {
      this.setState({
        detail: detailMeta,
        detailPanelIsVisible: true,
        detailPaneMeta: {
          meta,
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
      onClick: this.handleCreateRecord,
    },
    {
      label: translate({ id: 'ui-marccat.button.new.bib' }),
      shortcut: translate({ id: 'ui-marccat.button.new.short.bib' }),
      onClick: this.handleCreateRecord,
    }];
  };

  renderRightMenuEdit = () => {
    const rightButton = {
      marginRight: '10px',
      float: 'right',
    };
    return (
      <PaneMenu>
        <Button
          {...this.props}
          style={rightButton}
          buttonStyle="primary"
          type="button"
          marginBottom0
          onClick={this.handleClickEdit}
        >
          <FormattedMessage id="ui-marccat.search.record.edit" />
        </Button>
      </PaneMenu>
    );
  };

  renderLastMenu = () => {
    const { openDropDownMenu } = this.state;
    const { translate, activeFilterName, activeFilterChecked, data: { data: { emptyRecord } } } = this.props;
    return (activeFilterName === 'recordType.Bibliographic records' && activeFilterChecked) ?
      (<CreateButtonMenu
        {...this.props}
        label={translate({ id: 'ui-marccat.search.record.new.from.template' })}
        labels={this.renderDropdownLabels()}
        onToggle={this.handleCreateRecord}
        disabled={!emptyRecord}
        noDropdown
      />) : (<CreateButtonMenu
        {...this.props}
        label={translate({ id: 'ui-marccat.search.record.new' })}
        labels={this.renderDropdownLabels()}
        disabled={!emptyRecord}
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
        onToggle={this.handleCreateRecord}
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
    } = this.props;
    let { bibliographicResults, authorityResults } = this.props;
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
    const messageAuth = (totalAuthCount && totalAuthCount > 0) ? totalAuthCount + ' Authority records ' : ' No Authority records found ';
    const messageBib = (totalBibCount && totalBibCount > 0) ? totalBibCount + ' Bibliographic records ' : ' No Bibliographic records found ';
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
  (dispatcher) => dispatcher(emptyRecordAction())
)(injectCommonProp(SearchResults)));
