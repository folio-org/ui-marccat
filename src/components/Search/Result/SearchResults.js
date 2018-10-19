import React from 'react';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import AppIcon from '@folio/stripes-components/lib/AppIcon';
import Pane from '@folio/stripes-components/lib/Pane';
import Paneset from '@folio/stripes-components/lib/Paneset';
import * as C from '../../../utils/Constant';
import { ActionTypes } from '../../../redux/actions';
import { Props } from '../../../core';
import { actionMenuItem, ToolbarButtonMenu, ToolbarMenu, EmptyMessage, DotLoader } from '../../lib';
import css from '../../Search/Search.css';
import { remapForResultList } from '../../../utils/Mapper';

type P = Props & {
    headings: Array<any>,
    inputValue: string,
    getPreviousPage: Function,
    getNextPage: Function,
    dataLoaded: boolean,
}


export class SearchResults extends React.Component<P, {}> {
  constructor(props:P) {
    super(props);
    this.state = {
      detailPanelIsVisible: false,
    };
    this.handleDeatils = this.handleDeatils.bind(this);
  }


  handleDeatils = (e) => {
    const { store } = this.props;
    store.dispatch({ type: ActionTypes.DETAILS, query: e.currentTarget.lastChild.innerText });
    this.setState(prevState => {
      const detailPanelIsVisible = Object.assign({}, prevState.detailPanelIsVisible);
      return { detailPanelIsVisible };
    });
  };

  render() {
    const rightButton = {
      marginRight: '10px',
      float: 'right',
    };
    const { detailPanelIsVisible } = this.state;

    const actionMenuItems = actionMenuItem(['ui-marccat.indexes.title', 'ui-marccat.diacritic.title']);
    const rightMenu = <ToolbarButtonMenu create {...this.props} label="ui-marccat.search.record.new.keyboard" style={rightButton} />;
    const rightMenuEdit = <ToolbarButtonMenu create {...this.props} label="ui-marccat.search.record.edit" style={rightButton} />;
    const search = <ToolbarMenu icon={['search']}{...this.props} />;

    let marcJSONRecords = [];
    if (this.props.headings && this.props.headings.length > 0) {
      marcJSONRecords = remapForResultList(this.props.headings);
    }

    const columnMapper = {
      'resultView': '',
      '001': 'Id. Number (001)',
      '245': 'Title (245)',
      'uniformTitle': 'Uniform Title (130, 240)'

    };

    const resultsFormatter = {
      resultView: x => (
        <AppIcon
          className={x.recordView === 1 ? css.bibliographic : css.authority}
          size="small"
        />
      ),
      name: x => (
        <div>
          { x['100'] && x['100'] }
          { x['110'] && x['110'] }
          { x['111'] && x['111'] }
        </div>
      ),
      uniformTitle: x => (
        <div>
          { x['130'] && x['130'] }
          { x['240'] && x['240'] }
        </div>
      )
    };
    return (
      <Paneset static>
        <Pane
          paneTitle={<FormattedMessage id="ui-marccat.search.record" />}
          paneSub={(this.props.fetching) ? 'Searching....' : (this.props.headings) ? this.props.headings.length + ' Results Found' : 'No Result found'}
          appIcon={{ app: C.META.ICON_TITLE }}
          firstMenu={search}
          lastMenu={rightMenu}
          actionMenuItems={actionMenuItems}
        >
          {!this.props.headings && !this.props.fetching &&
            <EmptyMessage {...this.props} />
          }
          {(this.props.fetching) ?
            <DotLoader {...this.props} /> :
            <MultiColumnList
              isEmptyMessage=""
              columnWidths={{ 'resultView': '5%', '001': '10%', '245': '40%', 'name': '20%', 'uniformTitle': '10%' }}
              onRowClick={this.handleDeatils}
              contentData={marcJSONRecords}
              formatter={resultsFormatter}
              columnMapping={columnMapper}
              visibleColumns={[
                'resultView',
                '001',
                '245',
                'name',
                'uniformTitle'
              ]}
            />}
        </Pane>
        {detailPanelIsVisible &&
          <Pane
            id="pane-details"
            paneTitle={<FormattedMessage id="ui-marccat.search.record.preview" />}
            paneSub={(this.props.headings) ? this.props.headings.length : 'No results'}
            appIcon={{ app: C.META.ICON_TITLE }}
            dismissible
            onClose={() => this.setState({ detailPanelIsVisible: false })}
            actionMenuItems={actionMenuItems}
            lastMenu={rightMenuEdit}
          >
            {(this.props.fetchingDetail) ? <DotLoader {...this.props} /> : <div />}
          </Pane>}
      </Paneset>
    );
  }
}
export default (connect(
  ({ marccat: { search, details } }) => ({
    headings: search.records,
    fetching: search.isLoading,
    fetchingDetail: details.isLoadingDetail
  }),
)(SearchResults));

