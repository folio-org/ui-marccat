import React from 'react';
import SearchField from '@folio/stripes-components/lib/SearchField';
import { AccordionSet, Accordion, FilterAccordionHeader } from '@folio/stripes-components';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import InfoPopover from '@folio/stripes-components/lib/InfoPopover';
import type { Props } from '../Core/type/props';
import SearchSelectFields from '../Mock/SearchSelectFields';
import SearchConditions from '../Mock/SearchConditions';
import FiltersContainer from '../Lib/Filter/FiltersContainer';

import styles from './Search.css';

type P = Props & {
  inputValue: string,
  translate: Function
}

function SearchEngine(props: P) {
  return (
    <div className={styles['search-filters']}>
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
          </form>
        </Accordion>
        <FiltersContainer />
      </AccordionSet>
    </div>
  );
}
export default (connect(null, null)(SearchEngine));
