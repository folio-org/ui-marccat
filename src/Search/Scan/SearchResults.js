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
import { actionMenuItem, ToolbarButtonMenu, EmptyMessage } from '../../Lib';
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

    const marcJSONRecords = [];
    this.props.headings.forEach(r => marcJSONRecords.push(JSON.parse(r.data)));

    const actionMenuItems = actionMenuItem(['ui-marccat.indexes.title', 'ui-marccat.diacritic.title']);
    const rightMenu = <ToolbarButtonMenu create {...this.props} label="+ New" style={rightButton} />;
    const rightMenuEdit = <ToolbarButtonMenu create {...this.props} label="Edit" style={rightButton} />;

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
      <Paneset static>
        <Pane
          defaultWidth="fullWidth"
          paneTitle={<FormattedMessage id="ui-marccat.search.record" />}
          paneSub={this.props.headings.length + ' results'}
          appIcon={{ app: C.META.ICON_TITLE }}
          actionMenuItems={actionMenuItems}
          lastMenu={rightMenu}
        >
          <MultiColumnList
            loading
            fullWidth
            onRowClick={this.handleDeatils}
            contentData={this.props.headings}
            formatter={resultsFormatter}
            visibleColumns={[
              'resultView',
              'data'
            ]}
          />
        </Pane>
        {detailPanelIsVisible &&
        <Pane
          id="pane-details"
          dismissible
          paneTitle="efeww"
          onClose={() => this.setState({ detailPanelIsVisible: false })}
          actionMenuItems={actionMenuItems}
          lastMenu={rightMenuEdit}
        >feew
        </Pane>}
      </Paneset>
    );
  }
}
export default (connect(
  ({ marccat: { search } }) => ({
    headings: search.records
  }),
)(SearchResults));

