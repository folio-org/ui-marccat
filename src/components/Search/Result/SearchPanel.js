/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-alert */
import React from 'react';
import SearchField from '@folio/stripes-components/lib/SearchField';
import { AccordionSet, Accordion, FilterAccordionHeader } from '@folio/stripes-components';
import { Row, Col } from 'react-flexbox-grid';
import { reduxForm, Field } from 'redux-form';
import InfoPopover from '@folio/stripes-components/lib/InfoPopover';
import { Props, injectCommonProp } from '../../../core';
import SearchSelectFields from '../Select/SearchIndexes';
import SearchConditions from '../Select/SearchConditions';
import FiltersContainer from '../Filter/FiltersContainer';
import { ActionTypes } from '../../../redux/actions/Actions';
import styles from '../Style/Search.css';
import { findYourQuery } from '../../Search/Select/FilterMapper';
import { remapFilters } from '../Utils/Mapper';
import { getLanguageFilterQuery, getFormatFilterQuery } from '../Utils/SearchUtils';

type P = Props & {
  inputErrorCheck: string,
  translate: Function
}

class SearchPanel extends React.Component<P, {}> {
  constructor(props:P) {
    super(props);
    this.state = {};
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  checkEmptyForm(store) {
    let check = true;
    if (store.getState().form.searchForm.syncErrors &&
    (store.getState().form.searchForm.syncErrors.selectIndexes === 'Required' ||
    store.getState().form.searchForm.syncErrors.selectCondition === 'Required' ||
    store.getState().form.searchForm.values === undefined)) {
      check = false;
    } else if (store.getState().form.searchForm.values === undefined) {
      check = false;
    }
    return check;
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      const { store } = this.props;
      e.preventDefault();
      const check = this.checkEmptyForm(store);
      let baseQuery;
      let indexForQuery;
      let conditionFilter;
      let indexFilter;
      if (check) {
        if (store.getState().form.searchForm.values) {
          if (store.getState().form.searchForm.values.selectIndexes) {
            indexFilter = store.getState().form.searchForm.values.selectIndexes;
          }
          if (store.getState().form.searchForm.values.selectCondition) {
            conditionFilter = store.getState().form.searchForm.values.selectCondition;
            indexForQuery = findYourQuery[indexFilter.concat('-').concat(conditionFilter)];
            // when MATCH index add "!" to term
            baseQuery = indexForQuery + e.target.form[2].defaultValue;
            baseQuery = (conditionFilter === 'MATCH') ? baseQuery + '!' : baseQuery;
          } else {
            baseQuery = e.target.form[2].defaultValue;
          }
        } else {
          baseQuery = e.target.form[2].defaultValue;
        }


        let bibQuery = baseQuery;
        const authQuery = baseQuery;

        let recordTypeControl = {};

        // regular filters
        if (store.getState().marccat.filter && store.getState().marccat.filter.filters) {
          const { languageFilter, formatType, recordType } = remapFilters(store.getState().marccat.filter.filters);
          recordTypeControl = recordType;
          if (languageFilter && languageFilter.length) {
            bibQuery += ' AND (' + getLanguageFilterQuery(languageFilter) + ')';
          }
          if (formatType && formatType.length) {
            bibQuery += ' AND (' + getFormatFilterQuery(formatType) + ')';
          }
        }

        if (recordTypeControl && recordTypeControl.length) {
          recordTypeControl.forEach(element => {
            if (Object.keys(element)[0] === 'Bibliographic records') {
              store.dispatch({ type: ActionTypes.SEARCH, query: bibQuery });
            }
            if (Object.keys(element)[0] === 'Authority records') {
              store.dispatch({ type: ActionTypes.SEARCH_AUTH, query: authQuery });
            }
          });
        } else {
          store.dispatch({ type: ActionTypes.SEARCH, query: bibQuery });
          store.dispatch({ type: ActionTypes.SEARCH_AUTH, query: authQuery });
        }
      }
    }
  }

  handscan = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const { store } = this.props;
      store.dispatch({ type: ActionTypes.SCAN, query: e.target.form[2].defaultValue });
    }
  }

  render() {
    const { translate } = this.props;
    return (
      <AccordionSet>
        <Accordion
          separator={false}
          label={this.props.translate({ id: 'ui-marccat.navigator.search' })}
          header={FilterAccordionHeader}
        >
          <form name="searchForm" onKeyDown={this.handleKeyDown}>
            <Row>
              <Col xs={11}>
                <div className={styles.select_margin}>
                  <SearchSelectFields
                    marginBottom0
                    {...this.props}
                  />
                </div>
              </Col>
              <Col xs={1} style={{ paddingLeft: 0 }} className={styles.popover}>
                <InfoPopover
                  content={translate({ id: 'ui-marccat.search.lorem' })}
                  buttonLabel={translate({ id: 'ui-marccat.search.scanButton' })}
                  buttonHref="http://www"
                  buttonTarget="_blank"
                />
              </Col>
            </Row>
            <Row>
              <Col xs={11}>
                <div className={styles.select_margin}>
                  <Field
                    fullWidth
                    component={SearchField}
                    placeholder="Search..."
                    name="searchTextArea"
                    id="searchTextArea"
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={11}>
                <SearchConditions {...this.props} />
              </Col>
            </Row>
          </form>
        </Accordion>
        <FiltersContainer {...this.props} onclikk={this.handleKeyDown} />
      </AccordionSet>
    );
  }
}

export default reduxForm({
  form: 'searchForm',
})(injectCommonProp(SearchPanel));
