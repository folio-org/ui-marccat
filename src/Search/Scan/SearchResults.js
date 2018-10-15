import React from 'react';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import Button from '@folio/stripes-components/lib/Button';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import { FormattedMessage } from 'react-intl';
import Pane from '@folio/stripes-components/lib/Pane';
import * as C from '../../Utils/Constant';
import { DotLoader } from '../../Lib';
import { ActionTypes } from '../../Redux/actions';
import MARCcat from '../../App';

type SearchResultsProps = {
    headings: Array<any>,
    inputValue: string,
    getPreviousPage: Function,
    getNextPage: Function,
    dataLoaded: boolean,
}

function SearchResults(props: SearchResultsProps) {
  const { store } = props;
  if (!props.headings || props.headings.length === 0) {
    return <DotLoader />;
  } else {
    return (
      <Pane
        defaultWidth="fullWidth"
        paneTitle={<FormattedMessage id="ui-marccat.browsing.title" />}
        paneSub={props.inputValue}
        appIcon={{ app: C.META.ICON_TITLE }}
      >
        <MultiColumnList
          fullWidth
          onRowClick={(e) => store.dispatch({ type: ActionTypes.DETAILS, query: e.currentTarget.lastChild.innerText })}
          contentData={props.headings}
          visibleColumns={[
            'data',
            'recordView'
          ]}
          columnWidths={{
            data: '95%',
            recordView: '5%',
          }}
        />
      </Pane>
    );
  }
}
export default (connect(
  ({ marccat: { search } }) => ({
    headings: search.records
  }),
)(SearchResults));

