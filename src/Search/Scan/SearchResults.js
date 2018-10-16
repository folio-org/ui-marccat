import React from 'react';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import AppIcon from '@folio/stripes-components/lib/AppIcon';
import Pane from '@folio/stripes-components/lib/Pane';
import * as C from '../../Utils/Constant';
import { ActionTypes } from '../../Redux/actions';
import type { Props } from '../../Core';
import { actionMenuItem, ToolbarButtonMenu, EmptyMessage } from '../../Lib';

type P = Props & {
    headings: Array<any>,
    inputValue: string,
    getPreviousPage: Function,
    getNextPage: Function,
    dataLoaded: boolean,
}


function SearchResults(props: P) {
  const rightButton = {
    marginRight: '10px',
    float: 'right',
  };
  const { store } = props;
  if (!props.headings || props.headings.length === 0) return <EmptyMessage {...props} />;

  const marcJSONRecords = [];
  props.headings.forEach(r => marcJSONRecords.push(JSON.parse(r.data)));
  const fields001to009 = [];
  const fields010andUp = [];

  const actionMenuItems = actionMenuItem(['ui-marccat.indexes.title', 'ui-marccat.diacritic.title']);
  const rightMenu = <ToolbarButtonMenu create {...props} label="+ New" style={rightButton} />;

  // icona da utilizzare per record di authority
  const icon = {
    src: '../../../icons/authority.png',
    alt: 'authority',
    title: 'authority record',
  };

  const resultsFormatter = {
    source: x => (
      <AppIcon
        app={x.source ? 'marccat' : 'marccat'}
        iconKey={x.source ? 'instance' : 'app'}
        size="small"
      >
        {x.source ? 'Authority' : 'Bibliographic'}
      </AppIcon>
    )
  };
  return (
    <Pane
      defaultWidth="fullWidth"
      paneTitle={<FormattedMessage id="ui-marccat.search.record" />}
      paneSub={props.headings.length + ' results'}
      appIcon={{ app: C.META.ICON_TITLE }}
      actionMenuItems={actionMenuItems}
      lastMenu={rightMenu}
    >
      <MultiColumnList
        loading
        fullWidth
        onRowClick={(e) => store.dispatch({ type: ActionTypes.DETAILS, query: e.currentTarget.lastChild.innerText })}
        contentData={props.headings}
        formatter={resultsFormatter}
        visibleColumns={[
          'source',
          'data'
        ]}
      />
    </Pane>
  );
}
export default (connect(
  ({ marccat: { search } }) => ({
    headings: search.records
  }),
)(SearchResults));

