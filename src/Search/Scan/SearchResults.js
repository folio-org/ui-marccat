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

    const marcJSONRecords = [];
    if (this.props.headings.length) {
      this.props.headings.map(e => marcJSONRecords.push(e));
    }

    const resultsFormatter = {
      resultView: x => (
        <AppIcon
          className={x.recordView === 1 ? css.bibliographic : css.authority}
          size="small"
        >
          {x.recordView === 1 ? 'Bib' : 'Auth'}
        </AppIcon>
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
                autosize
                columnWidths={{ 'resultView': '10%', 'data': '90%' }}
                onRowClick={this.handleDeatils}
                contentData={this.props.headings}
                formatter={resultsFormatter}
                visibleColumns={[
                  'resultView',
                  'data'
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

