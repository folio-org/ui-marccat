import React from 'react';
import Button from '@folio/stripes-components/lib/Button';
import SearchField from '@folio/stripes-components/lib/SearchField';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import type { Props } from '../Core/type/props';
import { fetchRecords } from '../Redux/actions/ActionCreator';

type P = Props & {
  inputValue: string,
}

function SearchEngine(props: P) {
  return (
    <form>
      <Row>
        <Col xs={12}>
          <SearchField
            fullWidth
            placeholder="What are you searching for?"
            name="searchTextArea"
            id="searchTextArea"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Button fullWidth buttonStyle="primary" onClick={props.performSearch}>Search</Button>
        </Col>
        <Col xs={6}>
          <Button fullWidth buttonStyle="primary" onClick={props.performScan}>Scan</Button>
        </Col>
      </Row>
    </form>
  );
}

export default (connect(
  ({ marccat: { search } }) => ({
    fields: search.records
  }),
  (dispatch /* ownProps*/) => ({
    performSearch: () => dispatch((_ /* getState*/) => {
      dispatch(fetchRecords());
    }),
    performScan: () => dispatch((_ /* getState*/) => {
      dispatch(fetchRecords());
    }),
  })
)(SearchEngine));
