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
  Callout,
} from '@folio/stripes/components';
import { reduxForm, Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { IfPermission } from '@folio/stripes-core';
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
import { showValidationMessage } from '../../Cataloguing/Utils/MarcApiUtils';

type P = Props & {
  inputErrorCheck: string,
  translate: Function,
}

class SearchPanel extends React.Component<P, {callout: React.RefObject<Callout> }> {
  constructor(props: P) {
    super(props);

    const { data: { search: { segment } } } = props;
    const paramSegment = findParam('segment');

    this.state = {
      isBrowseRequested: false,
      searchForm: [EMPTY_STRING],
      filterEnable: true,
      segment: segment === undefined
        ? paramSegment === null ? SEARCH_SEGMENT.BIBLIOGRAPHIC : paramSegment
        : segment,
      btnSubmitEnabled: false
    };

    this.callout = React.createRef();
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }


  componentDidMount() {
    const { store: { getState } } = this.props;
    const { btnSubmitEnabled } = this.state;
    const id = findParam('id') || findParam('savedId') || findParam('recordid');
    const action = findParam('action');
    if (!btnSubmitEnabled) {
      const form = getState().form.searchForm;
      if (form?.values?.searchTextArea?.length) {
        this.setState({
          btnSubmitEnabled: true
        });
      }
    }
    if (id) this.handleSearchFromCataloging(id);
    if (action === 'delete') { this.executeSearch(); }
  }

  handleSearchFromCataloging = (id) => {
    const { dispatch } = this.props;
    const { segment } = this.state;
    dispatch({ type: ACTION.SEARCH, isFromCat: 'Y', moreData: 'N', queryBib: `AN "${id}"`, queryAuth: `AN "${id}"`, from: '1', to: '30' });
    dispatch(searchDetailAction(id, segment));
  };

  handleKeyDown(e) {
    if (e.charCode === 13 || e.key === 'Enter' || e.type === 'click') {
      e.preventDefault();
      this.executeSearch();
    }
  }

  executeSearch() {
    let { isBrowseRequested } = this.state;
    const { segment } = this.state;
    const { store, store: { getState }, dispatch, router, translate } = this.props;

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
        router.push(`/marccat/search?segment=${segment}`);
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
          router.push(`/marccat/search?segment=${segment}`);
          if (segment === SEARCH_SEGMENT.BIBLIOGRAPHIC) {
            dispatch({ type: ACTION.SEARCHBIB, isFromCat: 'N', moreData: 'N', queryBib: bibQuery, queryAuth: authQuery, from: '1', to: '30' });
          } else {
            if (indexForQuery === 'AN ') {
              if (this.isNumeric(form.values.searchTextArea) === false) {
                showValidationMessage(
                  this.callout,
                  translate({ id: 'ui-marccat.search.invaliddata' }),
                  'error'
                );
              } else {
                dispatch({ type: ACTION.SEARCHAUTH, isFromCat: 'N', moreData: 'N', queryBib: bibQuery, queryAuth: authQuery, from: '1', to: '30' });
                transitionToParams('q', authQuery);
                dispatch({ type: ACTION.TOTAL_BIB_COUNT, query: bibQuery });
                dispatch({ type: ACTION.TOTAL_AUTH_COUNT, query: authQuery });
              }
            } else {
              dispatch({ type: ACTION.SEARCHAUTH, isFromCat: 'N', moreData: 'N', queryBib: bibQuery, queryAuth: authQuery, from: '1', to: '30' });
              transitionToParams('q', authQuery);
              dispatch({ type: ACTION.TOTAL_BIB_COUNT, query: bibQuery });
              dispatch({ type: ACTION.TOTAL_AUTH_COUNT, query: authQuery });
            }
            this.handleSearchHistory({ recordType: 'all', query: bibQuery, index: indexForQuery, found: 0, sortStrategy: state.marccat.settings.sortType, record: {} });
          }
        }
      }
    }
  }

  isNumeric = (string) => {
    return !Number.isNaN(Number(string));
  }

  handleComplexQuery = () => {};

  handleSearchHistory = (payload) => {
    const { dispatch } = this.props;
    dispatch(historySearchAction(payload));
  };

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
    const { translate } = this.props;
    const { filterEnable, segment, btnSubmitEnabled } = this.state;
    const bibTxtLower = SEARCH_SEGMENT.BIBLIOGRAPHIC.toLowerCase();
    const authTxtLower = SEARCH_SEGMENT.AUTHORITY.toLowerCase();

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
        <IfPermission perm="ui-marccat.search-and-browse-records.view">
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
                        placeholder={translate({ id: 'ui-marccat.search.searchLabel' })}
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
        </IfPermission>
        {this.getFilterContainer(segment, filterEnable)}
        <Callout ref={this.callout} />
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
