/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 * @format
 * @flow
 */
import React from 'react';
import {
  SearchField,
  Button,
  AccordionSet,
  Accordion,
  FilterAccordionHeader,
  Row, Col,
  Icon,
  IconButton,
} from '@folio/stripes/components';
import { reduxForm, Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { includes } from 'lodash';
import ResetButton from '../Filter/ResetButton';
import type { Props } from '../../../core';
import { SearchIndexes, SearchConditions, FiltersContainer } from '..';
import { ActionTypes } from '../../../redux/actions/Actions';
import { findYourQuery } from '../Filter';
import { remapFilters } from '../../../utils/Mapper';
import {
  getLanguageFilterQuery,
  getFormatFilterQuery,
} from '../../../utils/SearchUtils';
import { EMPTY_MESSAGE } from '../../../utils/Constant';
import OperatorSelect from '../Select/OperatorSelect';

import styles from '../index.css';

type P = Props & {
  inputErrorCheck: string,
  translate: Function,
}

class SearchPanel extends React.Component<P, {}> {
  constructor(props: P) {
    super(props);
    this.state = {
      isBrowseRequested: false,
      searchForm: [''],
      filterEnable: true,
      counter: [{}],
      leftBracketEnable: true,
      rightBracketEnable: true,
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleAddSearchForm = this.handleAddSearchForm.bind(this);
    this.handleRemoveSearchForm = this.handleRemoveSearchForm.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleResetAllButton = this.handleResetAllButton.bind(this);
  }

  transitionToParams = (key, value) => {
    const { location } = this.props;
    const url = location.pathname;
    return includes(url, `${key}=${value}`);
  };

  handleKeyDown(e) {
    let { isBrowseRequested } = this.state;
    const { searchForm } = this.state;
    const { store, store: { getState }, dispatch, router } = this.props;
    if (e.charCode === 13 || e.key === 'Enter') {
      e.preventDefault();
      store.dispatch({ type: ActionTypes.CLOSE_PANELS, closePanels: true });
      store.dispatch({ type: ActionTypes.CLOSE_ASSOCIATED_DETAILS, openPanel: false });
      const inputValue = '"' + e.target.form[2].defaultValue + '"';
      isBrowseRequested = false;
      let baseQuery;
      let indexForQuery;
      let conditionFilter;
      let indexFilter;
      // const values = FormReducer.resolve(store, 'searchForm');
      const form = getState().form.searchForm;
      const state = getState();
      if (searchForm.length > 1) {
        this.buildComplexQuery();
      } else {
        if (form.values) {
          if (form.values['selectIndexes-0']) {
            indexFilter = form.values['selectIndexes-0'];
          }
          if (form.values['selectCondition-0']) {
            conditionFilter = form.values['selectCondition-0'];
            indexForQuery = findYourQuery[indexFilter.concat('-').concat(conditionFilter)];
            baseQuery = indexForQuery + inputValue;
            baseQuery = (conditionFilter === 'MATCH') ? baseQuery + '!' : baseQuery;
          } else {
            baseQuery = inputValue;
          }
        } else {
          baseQuery = inputValue;
        }

        let bibQuery = baseQuery;
        const authQuery = baseQuery;
        this.transitionToParams('q', bibQuery);

        if (state.marccat.filter && state.marccat.filter.filters) {
          const { languageFilter, formatType } = remapFilters(state.marccat.filter.filters);
          if (languageFilter && languageFilter.length) {
            bibQuery += ' AND ( ' + getLanguageFilterQuery(languageFilter) + ' ) ';
          }
          if (formatType && formatType.length) {
            bibQuery += ' AND ( ' + getFormatFilterQuery(formatType) + ' ) ';
          }
        }
        if (conditionFilter === 'BROWSE') {
          isBrowseRequested = true;
          dispatch({ type: ActionTypes.BROWSE_FIRST_PAGE, query: bibQuery });
          router.push('/marccat/browse');
          this.transitionToParams('q', bibQuery);
          this.setState({
            filterEnable: false
          });
        } else if (!isBrowseRequested) {
          router.push('/marccat/search');
          this.setState({
            filterEnable: true
          });
          if (indexForQuery === 'BN '
          || indexForQuery === 'SN '
          || indexForQuery === 'PU '
          || indexForQuery === 'LL '
          || indexForQuery === 'BC '
          || indexForQuery === 'CP '
          || indexForQuery === 'PW ') {
            dispatch({ type: ActionTypes.SEARCH, queryBib: bibQuery, queryAuth: '' });
            this.transitionToParams('q', bibQuery);
          } else {
            dispatch({ type: ActionTypes.SEARCH, queryBib: bibQuery, queryAuth: authQuery });
            this.transitionToParams('q', authQuery);
          }
        }
      }
    }
  }


  buildComplexQuery = () => {
    const { dispatch, store: { getState } } = this.props;
    const { counter } = this.state;
    let complex = EMPTY_MESSAGE;
    for (let count = 0; count < counter.length; count++) {
      const form = getState().form.searchForm;
      const selectIndexes = form.values[`selectIndexes-${count}`];
      const selectCondition = form.values[`selectCondition-${count}`];
      const operatorSelect = form.values[`operatorSelect-${count}`];
      const searchTextArea = '"' + form.values[`searchTextArea-${count}`] + '"';
      const indexForQuery = findYourQuery[selectIndexes.concat('-').concat(selectCondition)];
      let baseQuery = indexForQuery + searchTextArea;
      baseQuery = (selectCondition === 'MATCH') ? baseQuery + '!' : baseQuery;
      complex += ' ( ' + baseQuery + ' ) ' + operatorSelect;
    }
  
    let query = complex.split('undefined')[0].trim();
    const state = getState();
    if (state.marccat.filter && state.marccat.filter.filters) {
      const { languageFilter, formatType } = remapFilters(state.marccat.filter.filters);
      if (languageFilter && languageFilter.length) {
        query += ' AND ( ' + getLanguageFilterQuery(languageFilter) + ' ) ';
      }
      if (formatType && formatType.length) {
        query += ' AND ( ' + getFormatFilterQuery(formatType) + ' ) ';
      }
    }
    dispatch({ type: ActionTypes.SEARCH, queryBib: query, queryAuth: '' });
  }

  handleAddSearchForm = () => {
    const { searchForm, counter } = this.state;
    this.setState({
      searchForm: searchForm.concat([{ name: counter.length }]),
      counter: counter.concat([{}]),
    });
  }

  handleRemoveSearchForm = (e, idx) => {
    const { searchForm } = this.state;
    delete searchForm[idx];
    this.setState({
      searchForm,
    });
  }

  handleOnChange = () => { };

  handleResetAllButton = () => {
    const { dispatch, reset } = this.props;
    dispatch({ type: ActionTypes.FILTERS, payload: {}, filterName: '', filterChecked: false });
    dispatch(reset('searchForm'));
    this.transitionToParams('filter', 'false');
  };

  renderResetButton = () => {
    return (
      <ResetButton
        className={styles['mb-5']}
        visible
        onClick={this.handleResetAllButton}
        id="clickable-reset-all"
        label={<FormattedMessage id="ui-marccat.button.resetAll" />}
      />
    );
  }

  render() {
    const { translate, ...rest } = this.props;
    const { searchForm, filterEnable, counter, leftBracketEnable, rightBracketEnable } = this.state;
    return (
      <React.Fragment>
        {this.renderResetButton()}
        <AccordionSet>
          <Accordion
            {...rest}
            separator={false}
            label={translate({ id: 'ui-marccat.navigator.search' })}
            header={FilterAccordionHeader}
          >
            {searchForm.map((form, idx) => (
              <form name={`searchForm${idx}`} key={idx} onKeyDown={this.handleKeyDown} onChange={this.handleOnChange}>
                <Row>
                  <Col xs={1}>
                    <div
                      className={(leftBracketEnable) ? styles.leftBracket : styles.leftBracketDisabled}
                      key={idx}
                      onClick={() => this.setState({
                        leftBracketEnable: !leftBracketEnable
                      })}
                    />
                  </Col>
                  <Col xs={10} className={styles.forwardBracket}>
                    <Row>
                      <Col xs={12}>
                        <div className={styles.select_margin}>
                          <SearchIndexes
                            id={`selectIndexes-${idx}`}
                            name={`selectIndexes-${idx}`}
                            marginBottom0
                            {...this.props}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row style={{ height: '30px' }}>
                      <Col xs={12}>
                        <SearchConditions
                          id={`selectCondition-${idx}`}
                          name={`selectCondition-${idx}`}
                          {...this.props}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12}>
                        <div className={styles.select_margin}>
                          <Field
                            id={`searchTextArea-${idx}`}
                            name={`searchTextArea-${idx}`}
                            fullWidth
                            component={SearchField}
                            placeholder="Search..."
                          />
                        </div>
                      </Col>
                    </Row>
                    {idx !== (counter.length - 1) &&
                      <Row>
                        <Col xs={10}>
                          <OperatorSelect
                            {...this.props}
                            id={`operatorSelect-${idx}`}
                            name={`operatorSelect-${idx}`}
                          />
                        </Col>
                        <Col xs={2} style={{ display: 'flex', marginTop: '14px' }}>
                          <IconButton
                            icon="trash"
                            size="small"
                            onClick={(e) => this.handleRemoveSearchForm(e, idx)}
                          />
                        </Col>
                      </Row>
                    }
                    <Row>
                      <Col xs={12}>
                        <Button
                          buttonClass={styles.rightPosition}
                          onClick={() => this.handleAddSearchForm()}
                        >
                          <Icon icon="plus-sign">
                            {translate({ id: 'ui-marccat.button.add.search.form' })}
                          </Icon>
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={1}>
                    <div
                      className={(rightBracketEnable) ? styles.rightBracket : styles.rightBracketDisabled}
                      key={idx}
                      onClick={() => this.setState({
                        rightBracketEnable: !rightBracketEnable
                      })}
                    />
                  </Col>
                </Row>
              </form>
            ))
            }
          </Accordion>
          <FiltersContainer {...this.props} filterEnable={!!(filterEnable)} />
        </AccordionSet>
      </React.Fragment>
    );
  }
}

export default reduxForm({
  form: 'searchForm',
  destroyOnUnmount: false
})(SearchPanel);
