import React from 'react';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Pane from '@folio/stripes-components/lib/Pane';
import * as C from '../../Utils/Constant';
import { ActionTypes } from '../../Redux/actions';
import type { Props } from '../../Core';
import { actionMenuItem, ToolbarButtonMenu, EmptyMessage } from '../../Lib';
import css from '../Search.css';

type P = Props & {
    headings: Array<any>,
    inputValue: string,
    getPreviousPage: Function,
    getNextPage: Function,
    dataLoaded: boolean,
}

function SearchResults(props: P) {
  const { store } = props;
  if (!props.headings || props.headings.length === 0) return <EmptyMessage {...props} />;
  const actionMenuItems = actionMenuItem(['ui-marccat.indexes.title', 'ui-marccat.diacritic.title']);
  const rightMenu = <ToolbarButtonMenu create {...props} label="+ New" className={css.mr} />;
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
        visibleColumns={[
          'Title',
          'Main Entry',
          'Subject',
          'Tag',
          'Bibs',
          'Headings'
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

