import React from 'react';
import { MultiColumnList, Pane, Paneset, Icon } from '@folio/stripes-components';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Row } from 'react-flexbox-grid';
import { injectCommonProp } from '../../../core';
import { Props } from '../../../core/type/props';
import BrowseItemDetail from './BrowseItemDetail';
import { ActionTypes } from '../../../redux/actions/Actions';
import { findYourQueryFromBrowse } from '../../Search/Select/FilterMapper';
import { EMPTY_MESSAGE } from '../../../utils/Constant';
import { ToolbarButtonMenu, EmptyMessage } from '../../../lib';
import { browseFormatter, browseColMapper } from '../../../utils/Formatter';

type P = Props & {};
type S = {
  browseDetailPanelIsVisible: bool;
  rowClicked: bool;
};

export class BrowseResults extends React.Component<P, S> {
  constructor(props: P) {
    super(props);
    this.state = {
      browseDetailPanelIsVisible: false,
      rowClicked: false,
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

  handleBrowseDetails = (e, meta) => {
    const { dispatch, store } = this.props;
    const id = meta.headingNumber;
    const containsAuthorities = meta.countAuthorities > 0;
    const indexFilter = store.getState().form.searchForm.values.selectIndexes;
    const conditionFilter = store.getState().form.searchForm.values.selectCondition;
    const indexForQuery = findYourQueryFromBrowse[indexFilter.concat('-').concat(conditionFilter)];
    const baseQuery = indexForQuery + id;
    if (containsAuthorities) {
      dispatch({ type: ActionTypes.AUTH_DETAILS_BROWSE, query: baseQuery, isAuthority: true });
      dispatch({ type: ActionTypes.DETAILS_BROWSE, query: baseQuery, isAuthority: true });
    } else {
      dispatch({ type: ActionTypes.DETAILS_BROWSE, query: baseQuery, isAuthority: false });
    }
    this.setState({
      browseDetailPanelIsVisible: true,
      rowClicked: false
    });
  };

  myActionMenu = () => {
    return (
      <div>
        <Row>
          <FormattedMessage id="ui-marccat.browse.actionmenu.export.mrc" />
        </Row>
        <br />
        <Row>
          <FormattedMessage id="ui-marccat.browse.actionmenu.export.csv" />
        </Row>
        <br />
        <Row>
          <FormattedMessage id="ui-marccat.browse.actionmenu.export.dat" />
        </Row>
        <br />
        <Row>
          <FormattedMessage id="ui-marccat.browse.actionmenu.printall" />
        </Row>
        <br />
        <Row>
          <FormattedMessage id="ui-marccat.browse.actionmenu.merge" />
        </Row>
      </div>
    );
  };

  renderButtonMenu = () => {
    return (<ToolbarButtonMenu create {...this.props} label="ui-marccat.search.record.new.keyboard" />);
  };

  render() {
    const { browseDetailPanelIsVisible, rowClicked } = this.state;
    const { translate, firstMenu, isFetchingBrowse, isReadyBrowse, browseRecords, isFetchingBrowseDetails, isReadyBrowseDetails } = this.props;
    const messageNoContent = <FormattedMessage id="ui-marccat.search.initial.message" />;
    return (
      <Paneset static>
        <Pane
          padContent={(browseRecords) || isFetchingBrowse}
          defaultWidth="fill"
          actionMenu={this.myActionMenu}
          paneTitle={translate({ id: 'ui-marccat.browse.results.title' })}
          paneSub={messageNoContent}
          firstMenu={firstMenu}
          lastMenu={this.renderButtonMenu()}
        >
          {
            (isFetchingBrowse) ?
              <Icon icon="spinner-ellipsis" /> :
              (isReadyBrowse) ?
                <MultiColumnList
                  contentData={browseRecords}
                  autosize
                  isEmptyMessage={EMPTY_MESSAGE}
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
            paneSub={EMPTY_MESSAGE}
            lastMenu={this.renderButtonMenu()}
            onClose={this.handleClosePanelDetails}
          >
            {
              (isFetchingBrowseDetails) ?
                <Icon icon="spinner-ellipsis" /> :
                (isReadyBrowseDetails) ?
                  <BrowseItemDetail {...this.props} /> : null
            }
          </Pane>
        }
      </Paneset>
    );
  }
}
export default (connect(
  ({ marccat: { browse, browseDetails } }) => ({
    browseRecords: browse.records,
    isFetchingBrowse: browse.isLoading,
    isReadyBrowse: browse.isReady,
    browseDetailRecords: browseDetails.results,
    isFetchingBrowseDetails: browseDetails.isLoading,
    isReadyBrowseDetails: browseDetails.isReady,
    authorityBrowseDetails: browseDetails.records,
    isLoadingForAuthority: browseDetails.isLoading,
    isReadyForAuthority: browseDetails.isReady
  }),
)(injectCommonProp(BrowseResults)));
