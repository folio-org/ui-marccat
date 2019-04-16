/**
 * @format
 * @flow
 */
import React from 'react';
import { MultiColumnList, Pane, Paneset, Icon } from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes-core';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Props, injectCommonProp } from '../../shared';
import BrowseItemDetail from './BrowseItemDetail';
import { ActionTypes } from '../../redux/actions/Actions';
import { findYourQueryFromBrowse } from '../Search/Filter/FilterMapper';
import { ToolbarButtonMenu, EmptyMessage, NoResultsMessage } from '../../shared/lib';
import { browseFormatter, browseColMapper } from '../../utils/Formatter';
import BrowseAssociatedItemDetail from './BrowseAssociatedItemDetail';
import * as C from '../../config/constants';
import { generateDropdownMenu } from '../../shared/lib/components/ActionMenu/ActionMenu';

type S = {
  browseDetailPanelIsVisible: bool,
  rowClicked: bool,
  noResults: bool,
  isPadRequired: bool,
  detailSubtitle: Object,
};

export class BrowseResults extends React.Component<Props, S> {
  constructor(props: Props) {
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
  }

  handleClosePanelDetails = () => {
    this.setState({
      browseDetailPanelIsVisible: false,
      rowClicked: true,
    });
  };

  handleBrowseDetails = (e:any, meta: Object) => {
    const { dispatch, store } = this.props;
    const id = meta.headingNumber;
    const containsAuthorities = meta.countAuthorities > 0;
    const indexFilter = store.getState().form.searchForm.values.selectIndexes;
    const conditionFilter = store.getState().form.searchForm.values.selectCondition;
    const indexForQuery =
    findYourQueryFromBrowse[indexFilter + '-' + conditionFilter];
    const baseQuery = indexForQuery.concat(id);
    if (containsAuthorities) {
      dispatch({ type: ActionTypes.AUTH_DETAILS_BROWSE, query: baseQuery, isAuthority: true });
      dispatch({ type: ActionTypes.DETAILS_BROWSE, query: baseQuery, isAuthority: true });
    } else {
      dispatch({ type: ActionTypes.DETAILS_BROWSE, query: baseQuery, isAuthority: false });
    }
    this.setState({
      browseDetailPanelIsVisible: true,
      rowClicked: false,
      detailSubtitle: meta.stringText,
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
    const { translate, firstMenu, isFetchingBrowse, isReadyBrowse, browseRecords, isPanelOpen, isFetchingBrowseDetails, isReadyBrowseDetails, isLoadingAssociated, isReadyAssociated } = this.props;
    let { noResults, isPadRequired } = this.state;
    const messageNoContent = <FormattedMessage id="ui-marccat.search.initial.message" />;

    if (browseRecords !== undefined && browseRecords.length === 0) {
      noResults = true;
    } else if (browseRecords !== undefined && browseRecords.length > 0) {
      isPadRequired = true;
    }
    return (
      <Paneset static>
        <Pane
          padContent={isFetchingBrowse || isPadRequired}
          defaultWidth="fill"
          actionMenu={this.getActionMenu}
          paneTitle={translate({ id: 'ui-marccat.browse.results.title' })}
          paneSub={messageNoContent}
          firstMenu={firstMenu}
          lastMenu={this.renderButtonMenu()}
        >
          {
            (isFetchingBrowse) ?
              <Icon icon="spinner-ellipsis" /> :
              (!isFetchingBrowse && noResults) ?
                <NoResultsMessage {...this.props} /> :
                (isReadyBrowse) ?
                  <MultiColumnList
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
                        'headingNumber': '15%',
                        'stringText': '25%',
                        'countAuthorities': '25%',
                        'countDocuments': '25%',
                      }
                    }
                    visibleColumns={[
                      'type',
                      'headingNumber',
                      'stringText',
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
            paneSub={detailSubtitle}
            lastMenu={this.renderButtonMenu()}
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
            dispatch({ type: ActionTypes.CLOSE_BROWSE_ASSOCIATED_DETAILS, openPanel: false });
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
  ({ marccat: { browse, browseDetails, browseDetailsAssociated } }) => ({
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
)(injectCommonProp(BrowseResults)));
