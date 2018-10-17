/* eslint-disable no-unused-vars*/
import React from 'react';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import AppIcon from '@folio/stripes-components/lib/AppIcon';
import Pane from '@folio/stripes-components/lib/Pane';
import * as C from '../../../utils/Constant';
import { ActionTypes } from '../../../redux/actions';
import type { Props } from '../../../core';
import { actionMenuItem, ToolbarButtonMenu, EmptyMessage } from '../../lib';
import css from '../../Search/Search.css';

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
  const marcRecords = [];
  props.headings.forEach(r => marcJSONRecords.push(JSON.parse(r.data)));
  marcJSONRecords.map(r => marcRecords.push(r.fields));
  const fields001to009 = [];
  marcRecords.forEach(f => fields001to009.push(f.filter((field) => (Object.keys(field)[0]).startsWith('00'))));
  const fields010andUp = [];

  const actionMenuItems = actionMenuItem(['ui-marccat.indexes.title', 'ui-marccat.diacritic.title']);
  const rightMenu = <ToolbarButtonMenu create {...props} label="+ New" style={rightButton} />;

  const resultsFormatter = {
    resultView: x => (
      <AppIcon
        className={x.recordView === 1 ? css.bibliographic : css.authority}
        size="medium"
      >
        {x.recordView === 1 ? 'Bib' : 'Auth'}
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
          'resultView',
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

