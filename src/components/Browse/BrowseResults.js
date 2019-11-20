// @flow
import * as React from 'react';
import { last } from 'lodash';
import { MultiColumnList, Pane, Paneset, Icon, Button, PaneMenu } from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes-core';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import type { Props } from '../../flow/types.js.flow';
import BrowseItemDetail from './BrowseItemDetail';
import { CreateRecordButton } from '../Search';
import { ACTION } from '../../redux/actions/Actions';
import { findYourQueryFromBrowse, findYourQuery } from '../Search/Filter/FilterMapper';
import { ToolbarButtonMenu, EmptyMessage, NoResultsMessage } from '../../shared/lib';
import { browseColMapper } from '../../shared/utils/Formatter';
import BrowseAssociatedItemDetail from './BrowseAssociatedItemDetail';
import * as C from '../../config/constants';
import style from '../Search/Style/index.css';
import { generateDropdownMenu, injectProps } from '../../shared';
import { continueFetchingBrowse } from '../Cataloguing/Actions';

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
      moreBrowseRecords: {},
      browseDetailPanelIsVisible: false,
      rowClicked: false,
      noResults: false,
      isPadRequired: false
    };
    this.handleClosePanelDetails = this.handleClosePanelDetails.bind(this);
    this.handleBrowseDetails = this.handleBrowseDetails.bind(this);
    this.getActionMenu = this.getActionMenu.bind(this);
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

  handleBrowseDetails = (e: any, meta: Object) => {
    const { dispatch, store } = this.props;
    store.dispatch({ type: ACTION.SETTINGS, data: { newBrowse: 'N' } });
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

  // renderButtonMenu = () => {
  //   return (
  //     <ToolbarButtonMenu
  //       create
  //       {...this.props}
  //       label={
  //         <Icon icon="plus-sign">
  //           <FormattedMessage id="ui-marccat.browse.record.create" />
  //         </Icon>
  //       }
  //     />
  //   );
  // };

  render() {
    const { browseDetailPanelIsVisible, rowClicked, detailSubtitle } = this.state;
    const { isFromCrossReferences, isNewSearch, store, translate, isFetchingBrowse, firstMenu, isReadyBrowse, isPanelOpen, isFetchingBrowseDetails, isReadyBrowseDetails, isLoadingAssociated, isReadyAssociated } = this.props;
    let { noResults, isPadRequired, moreBrowseRecords } = this.state;
    let { browseRecords } = this.props;
    if (isNewSearch === 'N') {
      browseRecords = [...browseRecords, ...moreBrowseRecords];
    } else {
      moreBrowseRecords = {};
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
          lastMenu={this.renderLastMenu()}
          onScroll={(e) => {
            e.preventDefault();
            const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
            if (bottom) {
              store.dispatch({ type: ACTION.SETTINGS, data: { newBrowse: 'N' } });
              const cb = (payload) => {
                this.setState({ moreBrowseRecords: [...payload.headings, ...moreBrowseRecords] });
              };
              const lastRecord = last(browseRecords).stringText;
              const query = store.getState().marccat.browse.query.split(' ')[0].concat(' ').concat(lastRecord);
              store.dispatch(continueFetchingBrowse(query, cb));
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
        {isNewSearch === 'N' && browseDetailPanelIsVisible && !rowClicked &&
          <Pane
            dismissible
            defaultWidth="30%"
            paneTitle={translate({ id: 'ui-marccat.browse.results.title' })}
            paneSub={detailSubtitle}
            onClose={this.handleClosePanelDetails}
            actionMenu={this.getActionMenu}
            onScroll={() => { }}  // TODO: scroll for more results
          >
            {
              (isFetchingBrowseDetails) ?
                <Icon icon="spinner-ellipsis" /> :
                (isReadyBrowseDetails) ?
                  <BrowseItemDetail {...this.props} /> : null
            }
          </Pane>
        }
        {isNewSearch === 'N' && browseDetailPanelIsVisible && isPanelOpen &&
          <Pane
            id="pane-details"
            defaultWidth="20%"
            paneTitle={<FormattedMessage id="ui-marccat.search.record.preview" />}
            paneSub={C.EMPTY_STRING}
            appIcon={<AppIcon app={C.META.ICON_TITLE} />}
            lastMenu={this.renderLastMenu()}
            actionMenu={this.getActionMenu}
            dismissible
            onScroll={() => {}}
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
  ({ marccat: { browse, browseDetails, browseDetailsAssociated, settings } }) => ({
    searchIndexForCrossRef: browse.query,
    isFromCrossReferences: settings.triggerDetails,
    isNewSearch: settings.newBrowse,
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
    isPanelOpen: browseDetailsAssociated.mustOpenPanel
  }),
)(injectProps(BrowseResults)));
