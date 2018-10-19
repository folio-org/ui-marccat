import React from 'react';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Pane from '@folio/stripes-components/lib/Pane';
import Paneset from '@folio/stripes-components/lib/Paneset';
import * as C from '../../../utils/Constant';
import { ActionTypes } from '../../../redux/actions';
import { Props } from '../../../core';
import { actionMenuItem, ToolbarButtonMenu, EmptyMessage, DotLoader } from '../../lib';
import { remapForResultList, getFieldPosition, getFormat } from '../../../utils/Mapper';
import RecordDetails from './RecordDetails';

import style from '../Search.css';

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
    store.dispatch({ type: ActionTypes.DETAILS, query: e.currentTarget.children[1].innerText });
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
    const rightMenuEdit = <ToolbarButtonMenu create {...this.props} label="ui-marccat.search.record.edit" style={rightButton} />;

    let marcJSONRecords = [];
    if (this.props.headings && this.props.headings.length > 0) {
      marcJSONRecords = remapForResultList(this.props.headings);
    }

    const columnMapper = {
      'resultView': '',
      '001': 'Id. Number (001)',
      '245': 'Title (245)',
      'uniformTitle': 'Uniform Title (130, 240)',
      'subject': 'Subject (6xx)',
      'date1': 'Date 1',
      'date2': 'Date 2',
      'format': 'Format',
    };

    const resultsFormatter = {
      resultView: x => (
        <span className={x.recordView === 1 ? style.bibliographic : style.authority} />
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
      ),
      date1: x => (
        <div>
          {getFieldPosition(x['008'], 7, 11)}
        </div>
      ),
      date2: x => (
        <div>
          {getFieldPosition(x['008'], 11, 14)}
        </div>
      ),
      format: x => (
        <div>
          {getFormat(x.leader)}
        </div>
      ),
      subject: x => (
        <div>
          { x['600'] && x['600'] }
          { x['610'] && x['610'] }
          { x['611'] && x['611'] }
          { x['630'] && x['630'] }
          { x['647'] && x['647'] }
          { x['648'] && x['648'] }
          { x['650'] && x['650'] }
          { x['651'] && x['651'] }
          { x['653'] && x['653'] }
          { x['654'] && x['654'] }
          { x['655'] && x['655'] }
          { x['651'] && x['651'] }
          { x['653'] && x['653'] }
          { x['654'] && x['654'] }
          { x['655'] && x['655'] }
          { x['656'] && x['656'] }
          { x['657'] && x['657'] }
          { x['658'] && x['658'] }
          { x['662'] && x['662'] }
        </div>
      )
    };

    return (
      <Paneset static>
        <Pane
          paneTitle={<FormattedMessage id="ui-marccat.search.record" />}
          paneSub={(this.props.fetching) ? 'Searching....' : (this.props.headings) ? this.props.headings.length + ' Results Found' : 'No Result found'}
          appIcon={{ app: C.META.ICON_TITLE }}
          actionMenuItems={actionMenuItems}
        >
          {!this.props.headings && !this.props.fetching &&
          <EmptyMessage {...this.props} />
          }
          {(this.props.fetching) ?
            <DotLoader {...this.props} /> :
            <MultiColumnList
              defaultWidth="fill"
              isEmptyMessage=""
              columnWidths={{ 'resultView': '6%', '001': '10%', '245': '25%', 'name': '15%', 'uniformTitle': '10%', 'subject': '15%', 'date1': '5%', 'date2': '5%', 'format': '10%' }}
              onRowClick={this.handleDeatils}
              contentData={marcJSONRecords}
              formatter={resultsFormatter}
              columnMapping={columnMapper}
              visibleColumns={[
                'resultView',
                '001',
                '245',
                'name',
                'uniformTitle',
                'subject',
                'date1',
                'date2',
                'format'
              ]}
            />}
        </Pane>
        {detailPanelIsVisible &&
          <Pane
            id="pane-details"
            defaultWidth="30%"
            paneTitle={<FormattedMessage id="ui-marccat.search.record.preview" />}
            paneSub={(this.props.headings) ? this.props.headings.length : 'No results'}
            appIcon={{ app: C.META.ICON_TITLE }}
            dismissible
            onClose={() => this.setState({ detailPanelIsVisible: false })}
            actionMenuItems={actionMenuItems}
            lastMenu={rightMenuEdit}
          >
            {(this.props.fetchingDetail) ?
              <DotLoader {...this.props} /> :
              <RecordDetails {...this.props} />}
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

