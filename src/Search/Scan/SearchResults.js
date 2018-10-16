/* eslint-disable no-unused-vars*/
import React from 'react';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
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


  const fields001to009 = marcJSONRecords.fields.filter((field) => (Object.keys(field)[0]).startsWith('00'));
  const fields010andUp = marcJSONRecords.fields.filter((field) => !(Object.keys(field)[0]).startsWith('00'));
  const formattedFields001to009 = fields001to009.map((field) => {
    const key = Object.keys(field)[0];
    return (
      <tr key={'00field' + key} id={'00field' + key}>
        <td key={'cell' + key} id={'cell' + key} colSpan="3">
          {key}
          {' '}
          {field[key].replace(/\\/g, ' ')}
        </td>
      </tr>
    );
  });
  const formattedFields010andUp = fields010andUp.map((field, index) => {
    const key = Object.keys(field)[0];
    const subFields = (field[key].subfields).map((subField) => {
      const subKey = Object.keys(subField)[0];
      return [<span key={'span' + subKey}>&#8225;</span>, subKey, ' ', subField[subKey], ' '];
    });
    return (
      <tr key={'field-' + key + '-' + index}>
        <td key={'cell1-' + key + '-' + index} style={{ 'verticalAlign': 'top' }}>
          {key}
          {' '}
          {field[key].ind1.replace(/\\/g, ' ')}
          {' '}
          {field[key].ind2.replace(/\\/g, ' ')}
        </td>
        <td key={'cell2-' + key + '-' + index} style={{ 'whiteSpace': 'pre-wrap' }}><div>{subFields}</div></td>
      </tr>
    );
  });
  const actionMenuItems = actionMenuItem(['ui-marccat.indexes.title', 'ui-marccat.diacritic.title']);
  const rightMenu = <ToolbarButtonMenu create {...props} label="+ New" style={rightButton} />;
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

