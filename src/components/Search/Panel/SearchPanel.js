/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// @flow
import React, { Fragment } from 'react';
import {
  TextField,
  Row,
  Col,
  ButtonGroup,
  Button,
} from '@folio/stripes/components';
import { reduxForm, Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';


import ResetButton from '../Filter/ResetButton';
import type { Props } from '../../../flow/types.js.flow';
import {
  SearchIndexes,
  SearchConditions,
  FiltersContainer,
  getLanguageFilterQuery,
  getFormatFilterQuery,
  transitionToParams
} from '..';

import { ACTION } from '../../../redux/actions/Actions';
import { findYourQuery } from '../Filter';
import { remapFilters, findParam } from '../../../shared';
import { EMPTY_STRING, SEARCH_SEGMENT } from '../../../config/constants';
import { resetFilterSearch, segmentActive, historySearchAction, searchDetailAction } from '../Actions';
import styles from '../Style/index.css';

type P = Props & {
  inputErrorCheck: string,
  translate: Function,
}

class SearchPanel extends React.Component<P, {}> {
  constructor(props: P) {
    super(props);

    this.segment = findParam('segment');
    if (this.segment == null) {
      this.segment = SEARCH_SEGMENT.BIBLIOGRAPHIC;
    }
    this.state = {
      isBrowseRequested: false,
      searchForm: [EMPTY_STRING],
      filterEnable: true,
      counter: [{}],
      segment: this.segment,
      btnSubmitEnabled: false
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleAddSearchForm = this.handleAddSearchForm.bind(this);
    this.handleRemoveSearchForm = this.handleRemoveSearchForm.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleResetAllButton = this.handleResetAllButton.bind(this);
  }


  componentDidMount() {
    const id = findParam('id') || findParam('savedId') || findParam('recordid');
    if (id) this.handleSearchFromCataloging(id);
  }

  handleSearchFromCataloging = (id) => {
    const { dispatch } = this.props;
    dispatch({ type: ACTION.SEARCH, isFromCat: 'Y', moreData: 'N', queryBib: `AN "${id}"`, queryAuth: `AN "${id}"`, from: '1', to: '30' });
    dispatch(searchDetailAction(id));
    // this.handleSearchHistory({ recordType: 'all', query: `AN "${id}"`, index: 'AN', found: 1, num:1 });
    // const inputValue = '"' + e.target.form[2].defaultValue + '"';
    // indexFilter = form.values.selectIndexes;
    // conditionFilter = form.values.selectCondition;
  };

  handleKeyDown(e) {
    let { isBrowseRequested } = this.state;
    const { segment } = this.state;
    const { store, store: { getState }, dispatch, router } = this.props;

    if (e.charCode === 13 || e.key === 'Enter' || e.type === 'click') {
      e.preventDefault();
      store.dispatch({ type: ACTION.CLOSE_PANELS, closePanels: true });
      store.dispatch({ type: ACTION.CLOSE_ASSOCIATED_DETAILS, openPanel: false });

      const form = getState().form.searchForm;
      const inputValue = '"' + form.values.searchTextArea + '"';

      isBrowseRequested = false;
      let baseQuery;
      let indexForQuery;
      let conditionFilter;
      let indexFilter;

      const state = getState();
      if (form.values && typeof (form.values.selectIndexes) !== 'undefined' && typeof (form.values.selectCondition) !== 'undefined') {
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
        // } else {
        //   baseQuery = inputValue;
        //   return null;
        // }
        let bibQuery = baseQuery;
        const authQuery = baseQuery;
        transitionToParams('q', bibQuery);

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
          store.dispatch({ type: ACTION.SETTINGS, data: { newBrowse: 'Y' } });
          store.dispatch({ type: ACTION.BROWSE_FIRST_PAGE, query: bibQuery });
          this.handleSearchHistory({ recordType: 'browse', query: bibQuery, index: indexForQuery + conditionFilter, found: 0 });
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
          || indexForQuery === 'PP '
          || indexForQuery === 'PW ') {
            dispatch({ type: ACTION.SEARCH, isFromCat: 'N', moreData: 'N', queryBib: bibQuery, queryAuth: EMPTY_STRING, from: '1', to: '30' });
            this.handleSearchHistory({ recordType: 'biblio', query: bibQuery, index: indexForQuery, found: 0, sortStrategy: state.marccat.settings.sortType });
            transitionToParams('q', bibQuery);
            dispatch({ type: ACTION.TOTAL_BIB_COUNT, query: bibQuery });
          } else {
            router.push('/marccat/search');
            if (segment === SEARCH_SEGMENT.BIBLIOGRAPHIC) {
              dispatch({ type: ACTION.SEARCHBIB, isFromCat: 'N', moreData: 'N', queryBib: bibQuery, queryAuth: authQuery, from: '1', to: '30' });
            } else {
              dispatch({ type: ACTION.SEARCHAUTH, isFromCat: 'N', moreData: 'N', queryBib: bibQuery, queryAuth: authQuery, from: '1', to: '30' });
            }
            transitionToParams('q', authQuery);
            dispatch({ type: ACTION.TOTAL_BIB_COUNT, query: bibQuery });
            dispatch({ type: ACTION.TOTAL_AUTH_COUNT, query: authQuery });
            this.handleSearchHistory({ recordType: 'all', query: bibQuery, index: indexForQuery, found: 0, sortStrategy: state.marccat.settings.sortType, record: {} });
          }
        }
      }
    }
  }

  handleComplexQuery = () => {};

  handleSearchHistory = (payload) => {
    const { dispatch } = this.props;
    dispatch(historySearchAction(payload));
  };

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

  handleOnChange = () => {
    const { searchForm } = this.state;
    const { store: { getState } } = this.props;
    const form = getState().form.searchForm;

    let bntEnabled = false;
    if (typeof (form.values) !== 'undefined' && typeof (form.values.searchTextArea) !== 'undefined') {
      if (form.values.searchTextArea.length > 0) {
        bntEnabled = true;
      }
    }

    this.setState({
      searchForm,
      btnSubmitEnabled: bntEnabled
    });
  };

  handleResetAllButton = () => {
    const { dispatch, reset } = this.props;
    dispatch({ type: ACTION.FILTERS, payload: {}, filterName: '', isChecked: false });
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

  changeSegment = (segmentactive) => {
    const { dispatch, reset } = this.props;
    dispatch(reset('searchForm'));
    dispatch(resetFilterSearch(segmentactive));
    dispatch({ type: ACTION.CLOSE_PANELS, closePanels: true });
    this.setState({
      segment: segmentactive,
      btnSubmitEnabled: false
    });
  };

  handleBtnResetAll = () => {
    const { segment } = this.state;
    this.changeSegment(segment);
  };

  renderBtnResetAll = () => {
    const { btnSubmitEnabled } = this.state;
    return (
      <ResetButton
        className={styles['mb-5']}
        visible={btnSubmitEnabled}
        onClick={this.handleBtnResetAll}
        id="clickable-reset-all"
        label={<FormattedMessage id="ui-marccat.button.resetAll" />}
        data-test-btn-reset-all
      />
    );
  }

  getFilterContainer = (segment, filterEnable) => {
    const { dispatch } = this.props;
    dispatch(segmentActive(segment));
    if (segment === SEARCH_SEGMENT.BIBLIOGRAPHIC) {
      return (
        <FiltersContainer data-test-filters-container {...this.props} filterEnable={!!(filterEnable)} segment={segment} />
      );
    } else {
      return null;
    }
  }

  capitalize = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  render() {
    const { translate, store: { getState } } = this.props;
    const { filterEnable, segment, btnSubmitEnabled } = this.state;
    const bibTxtLower = SEARCH_SEGMENT.BIBLIOGRAPHIC.toLowerCase();
    const authTxtLower = SEARCH_SEGMENT.AUTHORITY.toLowerCase();

    if (!btnSubmitEnabled) {
      const form = getState().form.searchForm;
      if (typeof (form) !== 'undefined' && typeof (form.values) !== 'undefined' && typeof (form.values.searchTextArea) !== 'undefined') {
        if (form.values.searchTextArea.length > 0) {
          this.setState({
            btnSubmitEnabled: true
          });
        }
      }
    }

    return (
      <Fragment>

        <div data-test-inventory-instances>
          <ButtonGroup
            fullWidth
            data-test-filters-navigation
          >
            <Button
              key={`${this.capitalize(SEARCH_SEGMENT.BIBLIOGRAPHIC)}`}
              to={`/marccat/search?segment=${bibTxtLower}`}
              buttonStyle={`${segment === bibTxtLower ? 'primary' : 'default'}`}
              id={`segment-navigation-${this.capitalize(SEARCH_SEGMENT.BIBLIOGRAPHIC)}`}
              onClick={() => this.changeSegment(bibTxtLower)}
              data-test-btn-segment-bib
            >
              <FormattedMessage id={this.capitalize(SEARCH_SEGMENT.BIBLIOGRAPHIC)} />
            </Button>
            <Button
              key={`${this.capitalize(SEARCH_SEGMENT.AUTHORITY)}`}
              to={`/marccat/search?segment=${authTxtLower}`}
              buttonStyle={`${segment === authTxtLower ? 'primary' : 'default'}`}
              id={`segment-navigation-${this.capitalize(SEARCH_SEGMENT.AUTHORITY)}`}
              onClick={() => this.changeSegment(authTxtLower)}
              data-test-btn-segment-auth
            >
              <FormattedMessage id={this.capitalize(SEARCH_SEGMENT.AUTHORITY)} />
            </Button>
          </ButtonGroup>
        </div>

        <form name="searchForm" onKeyDown={this.handleKeyDown} onChange={this.handleOnChange}>
          <Row>
            <Col xs={12} className={styles.forwardBracket}>
              <Row>
                <Col xs={12}>
                  <div>
                    <SearchIndexes
                      {...this.props}
                      id="selectIndexes"
                      name="selectIndexes"
                      segment={segment}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <SearchConditions
                    {...this.props}
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
                      data-test-search-text-area
                      fullWidth
                      component={TextField}
                      placeholder="Search..."
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <Button
                    id="search-panel-btn-search"
                    buttonStyle={btnSubmitEnabled ? 'primary' : 'default'}
                    onClick={this.handleKeyDown}
                    type="submit"
                    disabled={!btnSubmitEnabled}
                    fullWidth
                    data-test-btn-search
                  >
                    {translate({ id: 'ui-marccat.search.searchButton' })}
                  </Button>
                  {this.renderBtnResetAll()}
                </Col>
              </Row>
            </Col>
          </Row>
        </form>
        {this.getFilterContainer(segment, filterEnable)}
      </Fragment>
    );
  }
}

export default reduxForm({
  form: 'searchForm',
  navigationCheck: true,
  enableReinitialize: true,
  destroyOnUnmount: false,
})(SearchPanel);
