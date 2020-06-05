// @flow
import React, { Fragment } from 'react';
import { last } from 'lodash';
import {
  MultiColumnList,
  Pane,
  Paneset,
  Icon,
  Button,
  PaneMenu,
  MenuSection,
} from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes-core';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import type { Props } from '../../flow/types.js.flow';
import BrowseItemDetail from './BrowseItemDetail';
import { ACTION } from '../../redux/actions/Actions';
import {
  findYourQueryFromBrowse,
  findYourQuery,
} from '../Search/Filter/FilterMapper';
import {
  EmptyMessage,
  NoResultsMessage,
} from '../../shared/lib';
import { browseColMapper } from '../../shared/utils/Formatter';
import BrowseAssociatedItemDetail from './BrowseAssociatedItemDetail';
import * as C from '../../config/constants';
import style from '../Search/Style/index.css';
import { injectProps, Localize } from '../../shared';
import { continueFetchingBrowse } from '../Cataloguing/Actions';
import { EditRecordButton } from '../Search';
import DuplicateRecord from '../Search/Button/DuplicateRecord';

type S = {
  browseDetailPanelIsVisible: boolean,
  rowClicked: boolean,
  noResults: boolean,
  isPadRequired: boolean,
  detailSubtitle: Object,
};

export class BrowseResults extends React.Component<Props, S> {
  constructor(props: Props) {
    super(props);
    this.state = {
      detailSubtitle: {},
      moreBrowseRecords: [],
      browseDetailPanelIsVisible: false,
      rowClicked: false,
      noResults: false,
      isPadRequired: false,
    };
    this.handleClosePanelDetails = this.handleClosePanelDetails.bind(this);
    this.handleBrowseDetails = this.handleBrowseDetails.bind(this);
    this.handleCreateRecord = this.handleCreateRecord.bind(this);
  }

  handleCreateRecord = () => {
    const {
      router,
      toggleFilterPane,
      datastore: { emptyRecord },
    } = this.props;
    toggleFilterPane();
    router.push(`/marccat/cataloging?id=${emptyRecord.results.id}&mode=new`);
  };

  handleClosePanelDetails = () => {
    this.setState({
      browseDetailPanelIsVisible: false,
      rowClicked: true,
    });
  };


  getActionMenu = (detail, items, { onToggle } = this.props) => (
    <Fragment>
      <MenuSection>
        <EditRecordButton {...this.props} />
        <DuplicateRecord {...this.props} />
      </MenuSection>
    </Fragment>
  );

  handleClickCrossReference = e => {
    const { store } = this.props;
    e.stopPropagation();
    const indexFilter = store.getState().form.searchForm.values.selectIndexes;
    const conditionFilter = store.getState().form.searchForm.values
      .selectCondition;
    const indexForQuery =
      findYourQuery[indexFilter.concat('-').concat(conditionFilter)];
    store.dispatch({
      type: ACTION.BROWSE_FIRST_PAGE,
      query: indexForQuery + e.currentTarget.attributes[1].nodeValue,
      from: '1',
      to: '50',
    });
    store.dispatch({ type: ACTION.SETTINGS, data: { triggerDetails: 'Y' } });
  };

  handleBrowseDetails = (e: any, meta: Object) => {
    const { dispatch, store } = this.props;
    store.dispatch({ type: ACTION.SETTINGS, data: { newBrowse: 'N' } });
    const id = meta.headingNumber;
    const containsAuthorities = meta.countAuthorities > 0;
    const indexFilter = store.getState().form.searchForm.values.selectIndexes;
    const conditionFilter = store.getState().form.searchForm.values
      .selectCondition;
    const indexForQuery =
      findYourQueryFromBrowse[indexFilter + '-' + conditionFilter];
    const baseQuery = indexForQuery.concat(id);
    if (containsAuthorities) {
      dispatch({
        type: ACTION.AUTH_DETAILS_BROWSE,
        query: baseQuery,
        isAuthority: true,
      });
      dispatch({
        type: ACTION.DETAILS_BROWSE,
        query: baseQuery,
        isAuthority: true,
      });
      dispatch({ type: ACTION.SETTINGS, data:{ mustOpenPanel: false } });
    } else {
      dispatch({
        type: ACTION.DETAILS_BROWSE,
        query: baseQuery,
        isAuthority: false,
      });
      dispatch({ type: ACTION.SETTINGS, data:{ mustOpenPanel: false } });
    }
    this.setState({
      browseDetailPanelIsVisible: true,
      rowClicked: false,
      detailSubtitle: meta.stringText,
    });
  };

  actionMenu = (
    { onToggle },
    {
      data: {
        data: { emptyRecord },
      },
    } = this.props
  ) => (
    <Fragment>
      <MenuSection label="Actions">
        <Button
          buttonStyle="primary"
          disabled={!emptyRecord}
          onClick={this.handleCreateRecord}
        >
          <Icon icon="plus-sign" size="small">
            {Localize({ key: 'search.record.new' })}
          </Icon>
        </Button>
      </MenuSection>
    </Fragment>
  );

  render() {
    const {
      browseDetailPanelIsVisible,
      rowClicked,
      detailSubtitle,
    } = this.state;
    const {
      isFromCrossReferences,
      isNewSearch,
      store,
      translate,
      isFetchingBrowse,
      firstMenu,
      isReadyBrowse,
      isPanelOpen,
      isFetchingBrowseDetails,
      isReadyBrowseDetails,
      isLoadingAssociated,
      isReadyAssociated,
    } = this.props;
    let { noResults, isPadRequired, moreBrowseRecords } = this.state;
    let { browseRecords } = this.props;
    if (isNewSearch === 'N') {
      if (moreBrowseRecords) {
        moreBrowseRecords = Object.values(moreBrowseRecords);
      }
      if (moreBrowseRecords && moreBrowseRecords.length > 0) {
        browseRecords = [...browseRecords, ...moreBrowseRecords];
      } else {
        browseRecords = [...browseRecords];
      }
    } else {
      moreBrowseRecords = [];
    }
    const browseFormatter = {
      countAuthorities: el => (
        <span
          className={
            el.countAuthorities && el.countDocuments !== undefined
              ? style.countDocs
              : style.countDocs
          }
        >
          {el.countAuthorities}
        </span>
      ),
      type: x => (x.countAuthorities === 0 && x.countDocuments === 0 ? (
        <span className={style.noRef} />
      ) : x.countAuthorities === 0 ? (
        <AppIcon size="small" app="marccat" iconKey="marc-bib" />
      ) : (
        <AppIcon size="small" app="marccat" iconKey="marc-authority" />
      )),
      cr0: item => (
        <div>
          {item.crossReferences.length > 0 &&
            item.crossReferences.map(element => {
              if (element.refType === 1) {
                return (
                  <div>
                    <Button
                      buttonStyle="none"
                      onClick={this.handleClickCrossReference}
                      style={{ margin: 0, padding: 0 }}
                      aria-label={element.stringText}
                    >
                      <span
                        id="refType1"
                        style={{ fontWeight: 'bold', margin: 0, padding: 0 }}
                      >
                        {'See: '}
                      </span>
                      {element.stringText}
                    </Button>
                    <br />
                  </div>
                );
              } else if (element.refType === 2) {
                return (
                  <div>
                    <Button
                      buttonStyle="none"
                      onClick={this.handleClickCrossReference}
                      style={{ margin: 0, padding: 0 }}
                      aria-label={element.stringText}
                    >
                      <span
                        id="textSpanRefType2"
                        style={{ fontWeight: 'bold', margin: 0, padding: 0 }}
                      >
                        {'Seen From: '}
                      </span>
                      {element.stringText}
                    </Button>
                    <br />
                  </div>
                );
              } else return null;
            })}
        </div>
      ),
    };
    if (browseRecords !== undefined && browseRecords.length === 0) {
      noResults = true;
    } else if (browseRecords !== undefined && browseRecords.length > 0) {
      isPadRequired = true;
    }
    if (isFromCrossReferences === 'Y') {
      const containsAuthorities = browseRecords[1].countAuthorities > 0;
      const id = browseRecords[1].headingNumber;
      const stringText = browseRecords[1].stringText;
      const indexFilter = store.getState().form.searchForm.values.selectIndexes;
      const conditionFilter = store.getState().form.searchForm.values
        .selectCondition;
      const indexForQuery =
        findYourQueryFromBrowse[indexFilter + '-' + conditionFilter];
      const baseQuery = indexForQuery.concat(id);
      if (containsAuthorities) {
        store.dispatch({
          type: ACTION.AUTH_DETAILS_BROWSE,
          query: baseQuery,
          isAuthority: true,
        });
        store.dispatch({
          type: ACTION.DETAILS_BROWSE,
          query: baseQuery,
          isAuthority: true,
        });
        store.dispatch({
          type: ACTION.SETTINGS,
          data: { triggerDetails: 'N' },
        });
      } else {
        store.dispatch({
          type: ACTION.DETAILS_BROWSE,
          query: baseQuery,
          isAuthority: false,
        });
        store.dispatch({
          type: ACTION.SETTINGS,
          data: { triggerDetails: 'N' },
        });
      }
      this.setState({
        browseDetailPanelIsVisible: true,
        rowClicked: false,
        detailSubtitle: stringText,
      });
    }
    return (
      <Paneset static>
        <Pane
          padContent={isFetchingBrowse || isPadRequired}
          defaultWidth="fill"
          actionMenu={this.actionMenu}
          paneTitle={translate({ id: 'ui-marccat.browse.results.title' })}
          firstMenu={firstMenu}
          onScroll={e => {
            e.preventDefault();
            const bottom =
              e.target.scrollHeight - e.target.scrollTop ===
              e.target.clientHeight;
            if (bottom) {
              if (store.getState().form.searchForm.values.selectIndexes.substring(0, 2) === store.getState().marccat.browse.query.split(' ')[0]) {
                const cb = payload => {
                  this.setState({
                    moreBrowseRecords:  moreBrowseRecords.concat(...payload.headings)
                  });
                };
                const lastRecord = last(browseRecords).stringText;
                const query = store
                  .getState()
                  .marccat.browse.query.split(' ')[0]
                  .concat(' ')
                  .concat(lastRecord);
                store.dispatch({
                  type: ACTION.SETTINGS,
                  data: { newBrowse: 'N' },
                });
                store.dispatch(continueFetchingBrowse(query, cb));
              }
            }
          }}
        >
          {isFetchingBrowse ? (
            <Icon icon="spinner-ellipsis" />
          ) : !isFetchingBrowse && noResults ? (
            <NoResultsMessage {...this.props} />
          ) : isReadyBrowse ? (
            <MultiColumnList
              {...this.props}
              contentData={browseRecords}
              isEmptyMessage={C.EMPTY_STRING}
              formatter={browseFormatter}
              onRowClick={this.handleBrowseDetails}
              rowMetadata={['Access point', 'Auths', 'Bibs']}
              columnMapping={browseColMapper}
              columnWidths={{
                type: '8%',
                stringText: '20%',
                cr0: '60%',
                countAuthorities: '6%',
                countDocuments: '6%',
              }}
              visibleColumns={[
                'type',
                'stringText',
                'cr0',
                'countAuthorities',
                'countDocuments',
              ]}
            />
          ) : (
            <EmptyMessage {...this.props} />
          )}
        </Pane>
        {isNewSearch === 'N' && browseDetailPanelIsVisible && !rowClicked && (
          <Pane
            dismissible
            defaultWidth="30%"
            paneTitle={translate({ id: 'ui-marccat.browse.results.title' })}
            paneSub={detailSubtitle}
            onClose={this.handleClosePanelDetails}
            actionMenu={this.actionMenu}
            onScroll={() => {}} // TODO: scroll for more results
          >
            {isFetchingBrowseDetails ? (
              <Icon icon="spinner-ellipsis" />
            ) : isReadyBrowseDetails ? (
              <BrowseItemDetail {...this.props} />
            ) : null}
          </Pane>
        )}
        {isNewSearch === 'N' && browseDetailPanelIsVisible && isPanelOpen && (
          <Pane
            id="pane-details"
            defaultWidth="20%"
            paneTitle={
              <FormattedMessage id="ui-marccat.search.record.preview" />
            }
            paneSub={C.EMPTY_STRING}
            appIcon={<AppIcon app={C.META.ICON_TITLE} />}
            onScroll={() => {}}
            onClose={() => {
              const { dispatch } = this.props;
              dispatch({ type: ACTION.SETTINGS, data:{ mustOpenPanel: false } });
            }}
          >
            {(isLoadingAssociated && isPanelOpen) ? (
              <Icon icon="spinner-ellipsis" />
            ) : (isReadyAssociated && isPanelOpen) ? (
              <BrowseAssociatedItemDetail {...this.props} />
            ) : null}
          </Pane>
        )}
      </Paneset>
    );
  }
}
export default connect(
  ({
    marccat: { browse, browseDetails, browseDetailsAssociated, settings },
  }) => ({
    searchIndexForCrossRef: browse.query,
    isFromCrossReferences: settings.triggerDetails,
    isNewSearch: settings.newBrowse,
    isPanelOpen: settings.mustOpenPanel,
    browseRecords: browse.records,
    isFetchingBrowse: browse.isLoading,
    isReadyBrowse: browse.isReady,
    browseDetailRecords: browseDetails.results,
    isFetchingBrowseDetails: browseDetails.isLoading,
    isReadyBrowseDetails: browseDetails.isReady,
    authorityBrowseDetails: browseDetails.records,
    isLoadingForAuthority: browseDetails.isLoading,
    isReadyForAuthority: browseDetails.isReady,
    isLoadingAssociated: browseDetailsAssociated.isLoading,
    isReadyAssociated: browseDetailsAssociated.isReady,
    items: browseDetailsAssociated.records,
    // isPanelOpen: browseDetailsAssociated.mustOpenPanel,
  })
)(injectProps(BrowseResults));
