import React from 'react';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import AppIcon from '@folio/stripes-components/lib/AppIcon';
import Pane from '@folio/stripes-components/lib/Pane';
import Paneset from '@folio/stripes-components/lib/Paneset';
import * as C from '../../Utils/Constant';
import { ActionTypes } from '../../Redux/actions';
import type { Props } from '../../Core';
import { actionMenuItem, ToolbarButtonMenu, EmptyMessage, DotLoader } from '../../Lib';
import css from '../../Search/Search.css';
import { remapForResultList } from '../../Utils/Mapper';

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
    this.setState({
      detailPanelIsVisible: true,
    });
  };

  render() {
    const rightButton = {
      marginRight: '10px',
      float: 'right',
    };
    const { detailPanelIsVisible } = this.state;
    if (!this.props.headings || this.props.headings.length === 0) return <EmptyMessage {...this.props} />;

    const actionMenuItems = actionMenuItem(['ui-marccat.indexes.title', 'ui-marccat.diacritic.title']);
    const rightMenu = <ToolbarButtonMenu create {...this.props} label="+ New" style={rightButton} />;
    const rightMenuEdit = <ToolbarButtonMenu create {...this.props} label="Edit" style={rightButton} />;

    let marcJSONRecords = [];
    if (this.props.headings.length === 10) {
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
      <div className={css.search} id="search-result">
        <Paneset static>
          <Pane
            paneTitle={<FormattedMessage id="ui-marccat.search.record" />}
            paneSub={(this.props.fetching) ? 'Searching....' : (this.props.headings) ? this.props.headings.length + ' Results Found' : 'No Result found'}
            appIcon={{ app: C.META.ICON_TITLE }}
            actionMenuItems={actionMenuItems}
            lastMenu={rightMenu}
          >
            {(this.props.fetching) ?
              <DotLoader {...this.props} /> :
              <MultiColumnList
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
            paneTitle="Record id 123"
            paneSub={(this.props.headings) ? this.props.headings.length : 'No results'}
            appIcon={{ app: C.META.ICON_TITLE }}
            onClose={() => this.setState({ detailPanelIsVisible: false })}
            actionMenuItems={actionMenuItems}
            lastMenu={rightMenuEdit}
          >
            {(this.props.fetching) ? <DotLoader {...this.props} /> : <div />}
          </Pane>}
        </Paneset>
      </div>
    );
  }
}
export default (connect(
  ({ marccat: { search } }) => ({
    headings: search.records,
    fetching: search.isLoading
  }),
)(SearchResults));

