import React from 'react';
import Button from '@folio/stripes-components/lib/Button';
import SearchField from '@folio/stripes-components/lib/SearchField';
import { AccordionSet, Accordion, FilterAccordionHeader } from '@folio/stripes-components';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import type { Props } from '../Core/type/props';
import { fetchRecords, fetchScan } from '../Redux/actions/ActionCreator';
import SearchSelectFields from '../Mock/SearchSelectFields';
import SearchConditions from '../Mock/SearchConditions';
import FiltersContainer from '../Lib/Filter/FiltersContainer';

type P = Props & {
  inputValue: string,
  translate: Function
}

function SearchEngine(props: P) {
  return (
    <AccordionSet>
      <Accordion
        label={props.translate({ id: 'ui-marccat.navigator.search' })}
        header={FilterAccordionHeader}
      >
        <form >
          <Row>
            <Col xs={12}>
              <SearchSelectFields />
            </Col>
          </Row>
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
            <Col xs={12}>
              <SearchConditions />
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
      </Accordion>
      <FiltersContainer />
    </AccordionSet>
  );
}
export default (connect(null,
  (dispatch /* ownProps*/) => ({
    performSearch: () => dispatch((_ /* getState*/) => {
      dispatch(fetchRecords());
    }),
    performScan: () => dispatch((_ /* getState*/) => {
      dispatch(fetchScan());
    }),
  }))(SearchEngine));
