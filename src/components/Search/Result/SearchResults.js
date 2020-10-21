/* eslint-disable dot-notation */
// @flow
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import {
  Paneset,
  HotKeys,
  MenuSection,
  Button,
  Icon,
} from '@folio/stripes/components';
import { ACTION } from '../../../redux/actions';
import type { Props } from '../../../flow/types.js.flow';
import {
  NoResultsMessage,
  injectProps,
  remapForAssociatedBibList,
  Localize,
} from '../../../shared';
import { isAuthorityRecord, transitionToParams } from '../Utils/SearchUtils';
import {
  SearchResultPane,
  RecordDetailPane,
  AssociatedRecordPane,
} from './components';
import { EditRecordButton } from '..';
import { emptyRecordAction, emptyRecordAuthAction } from '../../Cataloguing/Actions';
import { searchDetailAction } from '../Actions';
import * as C from '../../../config/constants';
import CheckBox from '../../../shared/lib/Button/CheckBox';

type P = Props & {
  headings: Array<any>,
  inputValue: string,
  getPreviousPage: () => void,
  getNextPage: () => void,
  detail: Object,
  dataLoaded: boolean,
  loading: boolean,
  isPanelOpen: boolean,
};

export class SearchResults extends React.Component<P, {}> {
  constructor(props: P) {
    super(props);
    this.state = {
      checkGroupLabels: [
        { id: 1, value: 'resultView-Record Type', isChecked: true },
        { id: 2, value: '001-id Number', isChecked: true },
        { id: 3, value: '245-Title', isChecked: true },
        { id: 4, value: 'name-Name', isChecked: true },
        { id: 5, value: 'preferredTitle-Uniform Title', isChecked: true },
        { id: 6, value: 'tagHighlighted-Tag', isChecked: true },
        { id: 7, value: 'countDoc-Bibs', isChecked: true },
        { id: 8, value: 'subject-Subject (6xx)', isChecked: true },
        { id: 9, value: 'date1-Date 1', isChecked: true },
        { id: 10, value: 'date2-Date 2', isChecked: true },
        { id: 11, value: 'format-Format', isChecked: true }
      ],
      detailPanelIsVisible: false,
      noResults: false,
      bibsOnly: false,
      autOnly: false,
      loading: false,
      detail: {},
      detailPaneMeta: {
        title: C.EMPTY_STRING,
        subTitle: C.EMPTY_STRING,
      },
    };
    this.handleDetails = this.handleDetails.bind(this);
    this.handleCreateRecord = this.handleCreateRecord.bind(this);
    this.actionMenu = this.actionMenu.bind(this);
  }

  handleCreateRecord = () => {
    const {
      router,
      toggleFilterPane,
      datastore: { emptyRecord, emptyRecordAuth },
      data: { search: { segment } }
    } = this.props;

    const emptyRecordAux =
      segment === C.SEARCH_SEGMENT.BIBLIOGRAPHIC
        ? emptyRecord
        : emptyRecordAuth;

    toggleFilterPane();
    router.push({
      pathname: '/marccat/cataloging',
      search: `?id=${emptyRecordAux.results.id}&mode=new`,
      state: { id: emptyRecordAux.results.id, mode: 'new' },
    });
  };

  openDetailFromCataloguing = () => {
    const {
      dispatch,
      data: { data },
    } = this.props;
    const detail = data.marcRecordDetail;
    if (isAuthorityRecord(detail.meta)) {
      this.setState({
        detail,
        detailPanelIsVisible: true,
        detailPaneMeta: {
          title: 'Auth. • ' + detail.id,
          subTitle: detail.meta['100'],
        },
      });
    } else {
      this.setState({
        detail,
        detailPanelIsVisible: true,
        detailPaneMeta: {
          title: 'Bib. • ' + detail.id,
          subTitle: detail.meta['245'],
        },
      });
    }
    dispatch({ type: ACTION.CLOSE_ASSOCIATED_DETAILS, openPanel: false });
  };

  handleDetails = (e, meta) => {
    e.stopPropagation();
    const {
      store: { dispatch },
      data,
      router,
    } = this.props;
    const id = meta['001'];
    dispatch(searchDetailAction(id));
    dispatch({ type: ACTION.CLOSE_PANELS, closePanels: false });
    let mergedResults;
    let detailSelected;
    if (data.search.dataOld !== undefined) {
      if (
        data.search.bibliographicResults &&
        data.search.bibliographicResults.length > 0
      ) {
        mergedResults = [...data.search.bibliographicResults];
      }
      if (data.search.oldBibArray && data.search.oldBibArray.length > 0) {
        mergedResults = [...data.search.oldBibArray];
      }
      if (
        data.search.authorityResults &&
        data.search.authorityResults.length > 0
      ) {
        mergedResults = [...data.search.authorityResults];
      }
      if (data.search.oldAuthArray && data.search.oldAuthArray.length > 0) {
        mergedResults = [...data.search.oldAuthArray];
      }
      detailSelected = mergedResults.filter(
        item => id === item.data.fields[0]['001']
      );
    } else {
      detailSelected = data.search.bibliographicResults.filter(
        item => id === item.data.fields[0]['001']
      );
    }
    if (detailSelected.length === 0) {
      detailSelected = data.search.authorityResults.filter(
        item => id === item.data.fields[0]['001']
      );
    }
    transitionToParams('id', id);

    dispatch({ type: ACTION.DETAILS, query: id, recordType: meta.recordView });
    if (isAuthorityRecord(meta)) {
      dispatch({
        type: ACTION.ASSOCIATED_BIB_REC,
        query: meta.queryForBibs,
        recordType: meta.recordView,
        openPanel: true,
      });
      this.setState({
        detail: detailSelected,
        detailPanelIsVisible: true,
        detailPaneMeta: {
          meta,
          title: 'Auth. • ' + id,
          subTitle: meta['100'],
          detail: detailSelected,
        },
      });
    } else {
      this.setState({
        detail: detailSelected,
        detailPanelIsVisible: true,
        detailPaneMeta: {
          meta,
          title: 'Bib. • ' + id,
          subTitle: meta['245'],
          detail: detailSelected,
        },
      });
    }
    dispatch({ type: ACTION.CLOSE_ASSOCIATED_DETAILS, openPanel: false });
    router.push(`/marccat/search?id=${id}`);
  };

  handleCheckChieldElement = event => {
    const { dispatch } = this.props;
    const { checkGroupLabels } = this.state;
    checkGroupLabels.forEach(check => {
      if (check.value === event.target.value) check.isChecked = event.target.checked;
    });
    this.setState({ checkGroupLabels });
    dispatch({ type: ACTION.CUSTOM_COLUMN_VIEW, payload: checkGroupLabels });
  };

  actionMenu = (
    { checkGroupLabels } = this.state,
    {
      data: { filter: { name, checked },
        data: { emptyRecord },
      },
    } = this.props
  ) => (
    <Fragment>
      {(name === 'recordType.Bibliographic records' && checked === true) ?
        <MenuSection label="Custom Columns ">
          {checkGroupLabels.map(check => {
            return (
              <CheckBox
                handleCheckChieldElement={this.handleCheckChieldElement}
                {...check}
              />
            );
          })}
        </MenuSection>
        : null}
      <MenuSection
        data-test-action-button
        label="Actions"
      >
        <Button
          data-test-new-record-button
          buttonStyle="primary"
          disabled={!emptyRecord}
          onClick={this.handleCreateRecord}
          id="clickable-dropdown-new-record"
        >
          <Icon icon="plus-sign" size="small">
            {Localize({ key: 'search.record.new' })}
          </Icon>
        </Button>
      </MenuSection>
    </Fragment>
  );

  render() {
    let { bibsOnly, autOnly, detailPanelIsVisible, noResults } = this.state;
    const { loading, detailPaneMeta, detail, checkGroupLabels } = this.state;
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
      bibsOnlyFilter,
      autOnlyFilter,
    } = this.props;
    let { bibliographicResults, authorityResults } = this.props;

    if (bibsOnlyFilter) {
      bibsOnly = bibsOnlyFilter;
    }
    if (autOnlyFilter) {
      autOnly = autOnlyFilter;
    }

    if (activeFilter) {
      const filterArray = [];
      Object.keys(activeFilter).forEach(key => filterArray.push(key + ':' + activeFilter[key]));
      filterArray.map(filterEl => (filterEl === 'recordType.Bibliographic records:true'
        ? (bibsOnly = true)
        : filterEl === 'recordType.Bibliographic records:false'
          ? (bibsOnly = false)
          : filterEl === 'recordType.Authority records:true'
            ? (autOnly = true)
            : filterEl === 'recordType.Authority records:false'
              ? (autOnly = false)
              : null));
    }
    if (
      !(oldBibToIncrement === undefined) &&
      oldBibToIncrement.length > 0 &&
      bibliographicResults.length > 0
    ) {
      bibliographicResults = [...oldBibToIncrement, ...bibliographicResults];
    }
    if (
      !(oldBibToIncrement === undefined) &&
      oldBibToIncrement.length > 0 &&
      bibliographicResults.length === 0
    ) {
      bibliographicResults = oldBibToIncrement;
    }
    if (
      !(oldAuthToIncrement === undefined) &&
      oldAuthToIncrement.length > 0 &&
      authorityResults.length > 0
    ) {
      authorityResults = [...oldAuthToIncrement, ...authorityResults];
    }
    if (
      !(oldAuthToIncrement === undefined) &&
      oldAuthToIncrement.length > 0 &&
      authorityResults.length === 0
    ) {
      authorityResults = oldAuthToIncrement;
    }
    if (
      (bibliographicResults === undefined && authorityResults === undefined) ||
      (bibliographicResults &&
        (bibliographicResults.length === undefined ||
          bibliographicResults.length === 0) &&
        authorityResults &&
        (authorityResults.length === undefined ||
          authorityResults.length === 0))
    ) {
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
    if (
      (bibsOnly === true && autOnly === true) ||
      (bibsOnly === false && autOnly === false)
    ) {
      if ((bibliographicResults && bibliographicResults.length > 0) || (authorityResults && authorityResults.length > 0)) {
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

    const containerMarcJSONRecords =
      mergedRecord && mergedRecord.length > 0
        ? remapForAssociatedBibList(mergedRecord)
        : [];
    const messageAuth =
      totalAuthCount !== undefined && totalAuth > 0
        ? authorityResults.length + ' of ' + totalAuth + ' Authority records '
        : ' No Authority records found ';
    const messageBib =
      totalBibCount !== undefined && totalBib > 0
        ? bibliographicResults.length +
          ' of ' +
          totalBib +
          ' Bibliographic records '
        : ' No Bibliographic records found ';
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

    const messageNoContent = (
      <FormattedMessage id="ui-marccat.search.initial.message" />
    );
    return (
      <HotKeys
        keyMap={this.keys}
        handlers={this.handlers}
        style={{ width: 100 + '%' }}
      >
        <Paneset static>
          <SearchResultPane
            containerMarcJSONRecords={containerMarcJSONRecords}
            isFetching={isFetching}
            queryMoreAuth={queryMoreAuth}
            queryMoreBib={queryMoreBib}
            countMoreData={countMoreData}
            firstMenu={firstMenu}
            checkCustomColumns={checkGroupLabels}
            mergedRecord={containerMarcJSONRecords}
            message={message}
            noResults={noResults}
            actionMenu={this.actionMenu}
            bibliographicResults={bibliographicResults}
            authorityResults={authorityResults}
            handleDetails={this.handleDetails}
            isReady={isReady}
            bibsOnly={bibsOnly}
            autOnly={autOnly}
            loading={loading}
            messageNoContent={messageNoContent}
          />
          {detailPanelIsVisible && closePanels === false && (
            <RecordDetailPane
              {...this.props}
              firstMenu={firstMenu}
              detailPaneMeta={detailPaneMeta}
              detail={detail}
              isFetchingDetail={isFetchingDetail}
              isReadyDetail={isReadyDetail}
              bibsOnly={bibsOnly}
              autOnly={autOnly}
              onClose={() => this.setState({ detailPanelIsVisible: false })}
              rightMenuEdit={<EditRecordButton {...this.props} />}
            />
          )}
          {isPanelBibAssOpen && !noResults && (
            <AssociatedRecordPane
              onClose={() => {
                const { dispatch } = this.props;
                dispatch({
                  type: ACTION.CLOSE_ASSOCIATED_DETAILS,
                  openPanel: false,
                });
              }}
              isLoadingAssociatedRecord={isLoadingAssociatedRecord}
              isReadyAssociatedRecord={isReadyAssociatedRecord}
              renderRightMenuEdit={<EditRecordButton {...this.props} />}
            />
          )}
        </Paneset>
      </HotKeys>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch(emptyRecordAction()),
    dispatchAuth: dispatch(emptyRecordAuthAction()),
  };
};

export default connect(
  ({
    marccat: {
      search,
      details,
      countDoc,
      filter,
      totalBibRecords,
      totalAuthRecords,
      associatedBibDetails,
      settings,
      panels,
    },
  }) => ({
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
    totalAuth: totalAuthRecords.totalAuthDoc,
    bibsOnlyFilter: search.bibsOnlyFilter,
    autOnlyFilter: search.autOnlyFilter,
  }),
  mapDispatchToProps
)(injectProps(SearchResults));
