//
import * as React from 'react';
import { last } from 'lodash';
import { MultiColumnList, Pane, Paneset, Icon, Button } from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes-core';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import BrowseItemDetail from './BrowseItemDetail';
import { ACTION } from '../../redux/actions/Actions';
import { findYourQueryFromBrowse, findYourQuery } from '../Search/Filter/FilterMapper';
import { ToolbarButtonMenu, EmptyMessage, NoResultsMessage } from '../../shared/lib';
import { browseColMapper } from '../../shared/utils/Formatter';
import BrowseAssociatedItemDetail from './BrowseAssociatedItemDetail';
import * as C from '../../config/constants';
import style from '../Search/Style/index.css';
import { generateDropdownMenu, injectProps } from '../../shared';


export class BrowseResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailSubtitle: {},
      browseDetailPanelIsVisible: false,
      rowClicked: false,
      noResults: false,
      isPadRequired: false
    };
    this.handleClosePanelDetails = this.handleClosePanelDetails.bind(this);
    this.handleBrowseDetails = this.handleBrowseDetails.bind(this);
    this.getActionMenu = this.getActionMenu.bind(this);
  }

  handleClosePanelDetails = () => {
    this.setState({
      browseDetailPanelIsVisible: false,
      rowClicked: true,
    });
  };

  handleClickCrossReference = (e) => {
    const { store } = this.props;
    e.stopPropagation();
    const indexFilter = store.getState().form.searchForm.values.selectIndexes;
    const conditionFilter = store.getState().form.searchForm.values.selectCondition;
    const indexForQuery = findYourQuery[indexFilter.concat('-').concat(conditionFilter)];
    store.dispatch({ type: ACTION.BROWSE_FIRST_PAGE, query: indexForQuery + e.currentTarget.attributes[1].nodeValue, from: '1', to: '50' });
    store.dispatch({ type: ACTION.SETTINGS, data: { triggerDetails: 'Y' } });
  }

  handleBrowseDetails = (e, meta) => {
    const { dispatch, store } = this.props;
    const id = meta.headingNumber;
    const containsAuthorities = meta.countAuthorities > 0;
    const indexFilter = store.getState().form.searchForm.values.selectIndexes;
    const conditionFilter = store.getState().form.searchForm.values.selectCondition;
    const indexForQuery = findYourQueryFromBrowse[indexFilter + '-' + conditionFilter];
    const baseQuery = indexForQuery.concat(id);
    if (containsAuthorities) {
      dispatch({ type: ACTION.AUTH_DETAILS_BROWSE, query: baseQuery, isAuthority: true });
      dispatch({ type: ACTION.DETAILS_BROWSE, query: baseQuery, isAuthority: true });
    } else {
      dispatch({ type: ACTION.DETAILS_BROWSE, query: baseQuery, isAuthority: false });
    }
    this.setState({
      browseDetailPanelIsVisible: true,
      rowClicked: false,
      detailSubtitle: meta.stringText
    });
  };

  getActionMenu = () => {
    const labels = [
      'ui-marccat.browse.actionmenu.export.mrc',
      'ui-marccat.browse.actionmenu.export.csv',
      'ui-marccat.browse.actionmenu.export.dat',
      'ui-marccat.browse.actionmenu.printall',
      'ui-marccat.browse.actionmenu.merge'
    ];
    return generateDropdownMenu(labels);
  };

  renderButtonMenu = () => {
    return (
      <ToolbarButtonMenu
        create
        {...this.props}
        label={
          <Icon icon="plus-sign">
            <FormattedMessage id="ui-marccat.browse.record.create" />
          </Icon>
        }
      />
    );
  };

  render() {
    const { browseDetailPanelIsVisible, rowClicked, detailSubtitle } = this.state;
    const { browseRecordsNextPage, oldRecordFromBrowse, isFromCrossReferences, isNewSearch, store, translate, isFetchingBrowse, firstMenu, isReadyBrowse, isPanelOpen, isFetchingBrowseDetails, isReadyBrowseDetails, isLoadingAssociated, isReadyAssociated } = this.props;
    let { noResults, isPadRequired } = this.state;
    let { browseRecords } = this.props;
    console.log(oldRecordFromBrowse, browseRecordsNextPage);
    if (isNewSearch === 'N' && oldRecordFromBrowse && browseRecordsNextPage) {
      browseRecords = [...oldRecordFromBrowse, ...browseRecordsNextPage];
    }
    const browseFormatter = {
      countAuthorities: el => (
        <span className={el.countAuthorities && el.countDocuments !== undefined ? style.countDocs : style.countDocs}>{el.countAuthorities}</span>
      ),
      type: x => (
        x.countAuthorities === 0 && x.countDocuments === 0 ? <span className={style.noRef} /> : x.countAuthorities === 0 ? <AppIcon size="small" app="marccat" iconKey="marc-bib" /> : <AppIcon size="small" app="marccat" iconKey="marc-authority" />
      ),
      cr0: item => (
        <div>
          {item.crossReferences.length > 0 &&
        item.crossReferences.map(
          element => {
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
                      { 'See: ' }
                    </span>
                    { element.stringText }
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
                      { 'Seen From: ' }
                    </span>
                    { element.stringText }
                  </Button>
                  <br />
                </div>
              );
            } else return null;
          }
        )}
        </div>
      )
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
      const conditionFilter = store.getState().form.searchForm.values.selectCondition;
      const indexForQuery = findYourQueryFromBrowse[indexFilter + '-' + conditionFilter];
      const baseQuery = indexForQuery.concat(id);
      if (containsAuthorities) {
        store.dispatch({ type: ACTION.AUTH_DETAILS_BROWSE, query: baseQuery, isAuthority: true });
        store.dispatch({ type: ACTION.DETAILS_BROWSE, query: baseQuery, isAuthority: true });
        store.dispatch({ type: ACTION.SETTINGS, data: { triggerDetails: 'N' } });
      } else {
        store.dispatch({ type: ACTION.DETAILS_BROWSE, query: baseQuery, isAuthority: false });
        store.dispatch({ type: ACTION.SETTINGS, data: { triggerDetails: 'N' } });
      }
      this.setState({
        browseDetailPanelIsVisible: true,
        rowClicked: false,
        detailSubtitle: stringText
      });
    }
    return (
      <Paneset static>
        <Pane
          padContent={isFetchingBrowse || isPadRequired}
          defaultWidth="fill"
          actionMenu={this.getActionMenu}
          paneTitle={translate({ id: 'ui-marccat.browse.results.title' })}
          firstMenu={firstMenu}
          lastMenu={this.renderButtonMenu}
          onScroll={(e) => {
            e.preventDefault();
            const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
            if (bottom) {
              store.dispatch({ type: ACTION.SETTINGS, data: { newBrowse: 'N' } });
              const lastRecord = last(browseRecords).stringText;
              const queryNextPage = store.getState().marccat.browse.query.split(' ')[0].concat(' ').concat(lastRecord);
              store.dispatch({ type: ACTION.BROWSE_NEXT_PAGE, query: queryNextPage, oldResults: browseRecords });
            }
          }
          }
        >
          {
            (isFetchingBrowse) ?
              <Icon icon="spinner-ellipsis" /> :
              (!isFetchingBrowse && noResults) ?
                <NoResultsMessage {...this.props} /> :
                (isReadyBrowse) ?
                  <MultiColumnList
                    {...this.props}
                    contentData={browseRecords}
                    isEmptyMessage={C.EMPTY_STRING}
                    formatter={browseFormatter}
                    onRowClick={this.handleBrowseDetails}
                    rowMetadata={['Access point', 'Auths', 'Bibs']}
                    columnMapping={browseColMapper}
                    columnWidths={
                      {
                        'type': '8%',
                        'stringText': '20%',
                        'cr0': '60%',
                        'countAuthorities':'6%',
                        'countDocuments': '6%',
                      }
                    }
                    visibleColumns={[
                      'type',
                      'stringText',
                      'cr0',
                      'countAuthorities',
                      'countDocuments'
                    ]}
                  /> : <EmptyMessage {...this.props} />}
        </Pane>
        {browseDetailPanelIsVisible && !rowClicked &&
          <Pane
            dismissible
            defaultWidth="30%"
            paneTitle={translate({ id: 'ui-marccat.browse.results.title' })}
            paneSub={detailSubtitle}
            lastMenu={this.renderButtonMenu}
            onClose={this.handleClosePanelDetails}
            actionMenu={this.getActionMenu}
            onScroll={(e) => {
              const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
              if (bottom) {
                store.dispatch({ type: ACTION.SEARCH, payload: '' });
              }
            }
            }
          >
            {
              (isFetchingBrowseDetails) ?
                <Icon icon="spinner-ellipsis" /> :
                (isReadyBrowseDetails) ?
                  <BrowseItemDetail {...this.props} /> : null
            }
          </Pane>
        }
        {browseDetailPanelIsVisible && isPanelOpen &&
          <Pane
            id="pane-details"
            defaultWidth="20%"
            paneTitle={<FormattedMessage id="ui-marccat.search.record.preview" />}
            paneSub={C.EMPTY_STRING}
            appIcon={<AppIcon app={C.META.ICON_TITLE} />}
            actionMenu={this.getActionMenu}
            dismissible
            onScroll={(e) => {
              const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
              if (bottom) {
                store.dispatch({ type: ACTION.SEARCH, payload: '' });
              }
            }
            }
            onClose={() => {
              const { dispatch } = this.props;
              dispatch({ type: ACTION.CLOSE_BROWSE_ASSOCIATED_DETAILS, openPanel: false });
            }}
          >
            {(isLoadingAssociated) ?
              <Icon icon="spinner-ellipsis" /> :
              (isReadyAssociated) ?
                <BrowseAssociatedItemDetail {...this.props} /> : null
            }
          </Pane>
        }
      </Paneset>
    );
  }
}
export default (connect(
  ({ marccat: { browse, moreResultsBrowse, browseDetails, browseDetailsAssociated, settings } }) => ({
    searchIndexForCrossRef: browse.query,
    isFromCrossReferences: settings.triggerDetails,
    isNewSearch: settings.newBrowse,
    browseRecords: browse.records,
    browseRecordsNextPage: moreResultsBrowse.records,
    oldRecordFromBrowse: moreResultsBrowse.oldResults,
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
    isPanelOpen: browseDetailsAssociated.mustOpenPanel
  }),
)(injectProps(BrowseResults)));
