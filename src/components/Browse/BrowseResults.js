// @flow
import * as React from 'react';
import { MultiColumnList, Pane, Paneset, Icon, Button } from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes-core';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import type { Props } from '../../flow/types.js.flow';
import BrowseItemDetail from './BrowseItemDetail';
import { ACTION } from '../../redux/actions/Actions';
import { findYourQueryFromBrowse, findYourQuery } from '../Search/Filter/FilterMapper';
import { ToolbarButtonMenu, EmptyMessage, NoResultsMessage } from '../../shared/lib';
import { browseFormatter, browseColMapper } from '../../shared/utils/Formatter';
import BrowseAssociatedItemDetail from './BrowseAssociatedItemDetail';
import * as C from '../../config/constants';
import { generateDropdownMenu, injectProps } from '../../shared';

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

  handleBrowseDetails = (e: any, meta: Object) => {
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

  anchoredRowFormatter = (
    {
      rowClass,
      rowData,
      cells,
      rowProps
    }
  ) => {
    const { store } = this.props;
    if (rowData.crossReferences.length > 0) {
      let refType = '';
      let labelRefType = '';
      let labelCrossRef = '';
      rowData.crossReferences.map((el, idx) => {
        refType = el.refType;
        labelCrossRef = el.stringText;
        switch (refType) {
        case 1:
          labelRefType = 'See: ';
          break;
        case 2:
          labelRefType = 'Seen From: ';
          break;
        case 3:
          labelRefType = 'See Also: ';
          break;
        case 4:
          labelRefType = 'S. A. From: ';
          break;
        case 5:
          labelRefType = 'Equivalent: ';
          break;
        default:
          labelRefType = '';
          break;
        }
        return rowData['cr' + idx] =
          <Button
            buttonStyle="none"
            onClick={(e) => {
              e.stopPropagation();
              const indexFilter = store.getState().form.searchForm.values.selectIndexes;
              const conditionFilter = store.getState().form.searchForm.values.selectCondition;
              const indexForQuery = findYourQuery[indexFilter.concat('-').concat(conditionFilter)];
              store.dispatch({ type: ACTION.BROWSE_FIRST_PAGE, query: indexForQuery + e.currentTarget.attributes[1].nodeValue, from: '1', to: '50' });
              store.dispatch({ type: ACTION.SETTINGS, data: { triggerDetails: 'Y' } });
            }}
            style={{ fontWeight: 'bold' }}
            aria-label={labelCrossRef}
          >
            {labelRefType + labelCrossRef}
          </Button>;
      });
      return (
        <a
          className={rowClass}
          {...rowProps}
          {...this.props}
        >
          {cells}
        </a>
      );
    } else {
      return (
        <a
          className={rowClass}
          {...rowProps}
          {...this.props}
        >
          {cells}
        </a>
      );
    }
  }

  render() {
    const { isFromCrossReferences, store } = this.props;
    const { browseDetailPanelIsVisible, rowClicked } = this.state;
    const { translate, isFetchingBrowse, isReadyBrowse, browseRecords, isPanelOpen, isFetchingBrowseDetails, isReadyBrowseDetails, isLoadingAssociated, isReadyAssociated } = this.props;
    let { noResults, isPadRequired } = this.state;
    const messageNoContent = <FormattedMessage id="ui-marccat.search.initial.message" />;

    if (browseRecords !== undefined && browseRecords.length === 0) {
      noResults = true;
    } else if (browseRecords !== undefined && browseRecords.length > 0) {
      isPadRequired = true;
    }
    if (isFromCrossReferences === 'Y') {
      const containsAuthorities = browseRecords[1].countAuthorities > 0;
      const id = browseRecords[1].headingNumber;
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
      });
    }
    return (
      <Paneset static>
        <Pane
          padContent={isFetchingBrowse || isPadRequired}
          defaultWidth="fill"
          actionMenu={this.getActionMenu}
          paneTitle={translate({ id: 'ui-marccat.browse.results.title' })}
          paneSub={messageNoContent}
          // firstMenu={firstMenu}
          // lastMenu={this.renderButtonMenu}
        >
          {
            (isFetchingBrowse) ?
              <Icon icon="spinner-ellipsis" /> :
              (!isFetchingBrowse && noResults) ?
                <NoResultsMessage {...this.props} /> :
                (isReadyBrowse) ?
                  <MultiColumnList
                    {...this.props}
                    rowFormatter={this.anchoredRowFormatter}
                    contentData={browseRecords}
                    autosize="true"
                    isEmptyMessage={C.EMPTY_STRING}
                    formatter={browseFormatter}
                    onRowClick={this.handleBrowseDetails}
                    rowMetadata={['Access point', 'Authority Records', 'Bibliographic Records']}
                    columnMapping={browseColMapper}
                    columnWidths={
                      {
                        'type': '10%',
                        'stringText': '20%',
                        'cr0': '20%',
                        'cr1': '20%',
                        'cr2': '20%',
                        'countAuthorities': '5%',
                        'countDocuments': '5%',
                      }
                    }
                    visibleColumns={[
                      'type',
                      'stringText',
                      'cr0',
                      'cr1',
                      'cr2',
                      'countAuthorities',
                      'countDocuments'
                    ]}
                  /> : <EmptyMessage {...this.props} />}
        </Pane>
        {browseDetailPanelIsVisible && !rowClicked &&
          <Pane
            dismissible
            defaultWidth="35%"
            paneTitle={translate({ id: 'ui-marccat.browse.results.title' })}
            // paneSub={detailSubtitle}
            // lastMenu={this.renderButtonMenu}
            onClose={this.handleClosePanelDetails}
            actionMenu={this.getActionMenu}
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
            defaultWidth="25%"
            paneTitle={<FormattedMessage id="ui-marccat.search.record.preview" />}
            paneSub={C.EMPTY_STRING}
            appIcon={<AppIcon app={C.META.ICON_TITLE} />}
            actionMenu={this.getActionMenu}
            dismissible
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
