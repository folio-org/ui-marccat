/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import SearchField from '@folio/stripes-components/lib/SearchField';
import { AccordionSet, Accordion, FilterAccordionHeader } from '@folio/stripes-components';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import InfoPopover from '@folio/stripes-components/lib/InfoPopover';
import type { Props } from '../Core/type/props';
import SearchSelectFields from '../Mock/SearchSelectFields';
import SearchConditions from '../Mock/SearchConditions';
import FiltersContainer from './Filter/FiltersContainer';
import { ActionTypes } from '../Redux/actions/Actions';

import styles from './Search.css';

type P = Props & {
  inputValue: string,
  translate: Function
}

function SearchEngine(props: P) {
  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const { store } = props;
      store.dispatch({ type: ActionTypes.SEARCH, query: e.target.form[2].defaultValue });
    }
  }

  return (
    <div className={styles['search-filters']}>
      <AccordionSet>
        <Accordion
          separator={false}
          label={props.translate({ id: 'ui-marccat.navigator.search' })}
          header={FilterAccordionHeader}
        >
          <form onKeyDown={handleKeyDown}>
            <Row>
              <Col xs={11}>
                <SearchSelectFields {...props} />
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
                <SearchConditions {...props} />
              </Col>
            </Row>
          </form>
        </Accordion>
        <FiltersContainer {...props} />
      </AccordionSet>
    </div>
  );
}
export default (connect(null, null)(SearchEngine));
