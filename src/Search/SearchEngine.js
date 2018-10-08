import React from 'react';
import Button from '@folio/stripes-components/lib/Button';
import SearchField from '@folio/stripes-components/lib/SearchField';
import { AccordionSet, Accordion, FilterAccordionHeader } from '@folio/stripes-components';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import InfoPopover from '@folio/stripes-components/lib/InfoPopover';
import type { Props } from '../Core/type/props';
import { fetchScan } from '../Redux/actions/ActionCreator';
import SearchSelectFields from '../Mock/SearchSelectFields';
import SearchConditions from '../Mock/SearchConditions';
import FiltersContainer from '../Lib/Filter/FiltersContainer';
import { ActionTypes } from '../Redux/actions';

type P = Props & {
  inputValue: string,
  translate: Function
}

function SearchEngine(props: P) {
  const { store } = props;
  return (
    <AccordionSet>
      <Accordion
        label={props.translate({ id: 'ui-marccat.navigator.search' })}
        header={FilterAccordionHeader}
      >
        <form >
          <Row>
            <Col xs={11}>
              <SearchSelectFields />
            </Col>
            <Col xs={1}>
              <InfoPopover
                content="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                buttonLabel="Read more"
                buttonHref="https://wiki.folio.org/"
                buttonTarget="_blank"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={11}>
              <SearchField
                fullWidth
                placeholder="What are you searching for?"
                name="searchTextArea"
                id="searchTextArea"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={11}>
              <SearchConditions />
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Button
                fullWidth
                buttonStyle="primary"
                onClick={(e) => store.dispatch({ type: ActionTypes.SEARCH, query: e.target.form[2].defaultValue })}
              >Search
              </Button>
            </Col>
            <Col xs={6}>
              <Button
                fullWidth
                buttonStyle="primary"
                onClick={(e) => store.dispatch({ type: ActionTypes.SCAN, query: e.target.form[2].defaultValue })}
              >Scan
              </Button>
            </Col>
          </Row>
        </form>
      </Accordion>
      <FiltersContainer />
    </AccordionSet>
  );
}
export default (connect(null, null)(SearchEngine));
