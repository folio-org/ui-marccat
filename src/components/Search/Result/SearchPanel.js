/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 * @format
 * @flow
 */
import React from 'react';
import {
  SearchField,
  AccordionSet,
  Accordion,
  FilterAccordionHeader,
  Row, Col,
} from '@folio/stripes/components';
import { reduxForm, Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import ResetButton from '../Filter/ResetButton';
import { Props } from '../../../core';
import {
  SearchIndexes,
  SearchConditions,
  FiltersContainer,
  getLanguageFilterQuery,
  getFormatFilterQuery,
  transitionToParams
} from '..';
import { ActionTypes } from '../../../redux/actions/Actions';
import { findYourQuery } from '../Filter';
import { remapFilters } from '../../../utils/Mapper';
import { EMPTY_MESSAGE } from '../../../utils';

import styles from '../index.css';
import { findParam } from '../../../redux';

type P = Props & {
  inputErrorCheck: string,
  translate: Function,
}

class SearchPanel extends React.Component<P, {}> {
  constructor(props: P) {
    super(props);
    this.state = {
      isBrowseRequested: false,
      searchForm: [EMPTY_MESSAGE],
      filterEnable: true,
      counter: [{}],
      leftBracketEnable: false,
      rightBracketEnable: false,
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleAddSearchForm = this.handleAddSearchForm.bind(this);
    this.handleRemoveSearchForm = this.handleRemoveSearchForm.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleResetAllButton = this.handleResetAllButton.bind(this);
  }


  // componentDidMount() {
  //   const id = findParam('id');
  //   if (findParam('id') !== null) {
  //     this.handleSearchFromCataloging();
  //   }
  // }

  handleSearchFromCataloging = () => {
    const { dispatch } = this.props;
    const conditionFilter = 'START';
    const indexForQuery = 'NUMID';
    let baseQuery = indexForQuery + findParam('id');
    baseQuery = (conditionFilter === 'MATCH') ? baseQuery + '!' : baseQuery;
    dispatch({ type: ActionTypes.SEARCH, queryBib: baseQuery, queryAuth: '' });
  };

  handleKeyDown(e) {
    let { isBrowseRequested } = this.state;
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
      const form = getState().form.searchForm;
      const state = getState();
      if (form.values) {
        if (form.values.selectIndexes) {
          indexFilter = form.values.selectIndexes;
        }
        if (form.values.selectCondition) {
          conditionFilter = form.values.selectCondition;
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
      transitionToParams('q', bibQuery);

      if (state.marccat.filter && state.marccat.filter.filters) {
        const { languageFilter, formatType } = remapFilters(state.marccat.filter.filters);
        if (languageFilter && languageFilter.length) {
          bibQuery += ' AND ( ' + getLanguageFilterQuery(languageFilter).toUpperCase() + ' ) ';
        }
        if (formatType && formatType.length) {
          bibQuery += ' AND ( ' + getFormatFilterQuery(formatType).toUpperCase() + ' ) ';
        }
      }
      if (conditionFilter === 'BROWSE') {
        isBrowseRequested = true;
        dispatch({ type: ActionTypes.BROWSE_FIRST_PAGE, query: bibQuery, from: '1', to: '100' });
        router.push('/marccat/browse');
        transitionToParams('q', bibQuery);
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
          dispatch({ type: ActionTypes.SEARCH, queryBib: bibQuery, queryAuth: '', from: '1', to: '100' });
          transitionToParams('q', bibQuery);
        } else {
          dispatch({ type: ActionTypes.SEARCH, queryBib: bibQuery, queryAuth: authQuery, from: '1', to: '100' });
          transitionToParams('q', authQuery);
        }
      }
    }
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
    transitionToParams('filter', 'false');
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
    const { filterEnable, leftBracketEnable, rightBracketEnable } = this.state;
    return (
      <React.Fragment>
        <AccordionSet>
          <Accordion
            {...rest}
            separator={false}
            label={translate({ id: 'ui-marccat.navigator.search' })}
            header={FilterAccordionHeader}
          >
            <form name="searchForm" onKeyDown={this.handleKeyDown} onChange={this.handleOnChange}>
              <Row>
                <Col xs={1}>
                  <div
                    className={(leftBracketEnable) ? styles.leftBracket : styles.leftBracketDisabled}
                    onClick={() => this.setState({
                      leftBracketEnable: !leftBracketEnable
                    })}
                  />
                </Col>
                <Col xs={10} className={styles.forwardBracket}>
                  <Row>
                    <Col xs={12}>
                      <div>
                        <SearchIndexes
                          id="selectIndexes"
                          name="selectIndexes"
                          {...this.props}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <SearchConditions
                        id="selectCondition"
                        name="selectCondition"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <div>
                        <Field
                          id="searchTextArea"
                          name="searchTextArea"
                          fullWidth
                          // onChange={(e) => { this.setState({ fieldValue: e.target.value }); }}
                          // onChangeIndex={(e) => { this.setState({ fieldValue: e.target.value }); }}
                          component={SearchField}
                          onBlur={() => 'tttt'}
                          placeholder="Search..."
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col xs={1}>
                  <div
                    className={(rightBracketEnable) ? styles.rightBracket : styles.rightBracketDisabled}
                    onClick={() => this.setState({
                      rightBracketEnable: !rightBracketEnable
                    })}
                  />
                </Col>
              </Row>
            </form>
          </Accordion>
          <FiltersContainer {...this.props} filterEnable={!!(filterEnable)} />
        </AccordionSet>
      </React.Fragment>
    );
  }
}

export default reduxForm({
  form: 'searchForm',
  navigationCheck: true,
  enableReinitialize: true,
  destroyOnUnmount: false,
})(SearchPanel);
