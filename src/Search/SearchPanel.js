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

class SearchPanel extends React.Component<P, {}> {
  constructor(props:P) {
    super(props);
    this.state = {};
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyboardClick = this.handleKeyboardClick.bind(this);
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const { store } = this.props;
      store.dispatch({ type: ActionTypes.SEARCH, query: e.target.form[2].defaultValue });
    }
  }

  handleKeyboardClick(e) {
    const { store } = this.props;
    store.dispatch({ type: ActionTypes.SEARCH, query: e.target.form[2].defaultValue });
  }

  render() {
    return (
      <div className={styles.search}>
        <AccordionSet>
          <Accordion
            separator={false}
            label={this.props.translate({ id: 'ui-marccat.navigator.search' })}
            header={FilterAccordionHeader}
          >
            <form
              onKeyDown={this.handleKeyDown}
              // onKeyPress={this.handleKeyboardClick}
              // onKeyUp={this.handleKeyboardClick}
            >
              <Row>
                <Col xs={11}>
                  <SearchSelectFields {...this.props} />
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
                    hasClearIcon
                    fullWidth
                    placeholder="What are you searching for?"
                    name="searchTextArea"
                    id="searchTextArea"
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={11}>
                  <SearchConditions {...this.props} />
                </Col>
              </Row>
            </form>
          </Accordion>
          <FiltersContainer {...this.props} />
        </AccordionSet>
      </div>
    );
  }
}
export default (connect(null, null)(SearchPanel));
