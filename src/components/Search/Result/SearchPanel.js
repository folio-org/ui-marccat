import React from 'react';
import { SearchField,
  Button,
  AccordionSet,
  Accordion,
  FilterAccordionHeader,
  InfoPopover,
  Icon,
} from '@folio/stripes-components';
import { Row, Col } from 'react-flexbox-grid';
import { reduxForm, Field } from 'redux-form';
import type { Props } from '../../../core';
import { SearchIndexes, SearchConditions, FiltersContainer } from '..';
import { ActionTypes } from '../../../redux/actions/Actions';
import { findYourQuery } from '../Select/FilterMapper';
import { remapFilters } from '../../../utils/Mapper';
import { getLanguageFilterQuery, getFormatFilterQuery } from '../../../utils/SearchUtils';
import styles from '../../../styles/common.css';

type P = Props & {
  inputErrorCheck: string,
  translate: Function,
}
type S = {
};

class SearchPanel extends React.Component<P, S> {
  constructor(props: P) {
    super(props);
    this.state = {
      isBrowseRequested: false,
      searchForm: [{ name: '' }],
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleAddSearchForm = this.handleAddSearchForm.bind(this);
    this.handleRemoveSearchForm = this.handleRemoveSearchForm.bind(this);
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const inputValue = '"' + e.target.form[3].defaultValue + '"';
      const { store, dispatch, history } = this.props;
      let { isBrowseRequested } = this.state;
      isBrowseRequested = false;
      let baseQuery;
      let indexForQuery;
      let conditionFilter;
      let indexFilter;
      if (store.getState().form.searchForm.values) {
        if (store.getState().form.searchForm.values.selectIndexes) {
          indexFilter = store.getState().form.searchForm.values.selectIndexes;
        }
        if (store.getState().form.searchForm.values.selectCondition) {
          conditionFilter = store.getState().form.searchForm.values.selectCondition;
          indexForQuery = findYourQuery[indexFilter.concat('-').concat(conditionFilter)];
          // when MATCH index add "!" to term
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

      // regular filters
      if (store.getState().marccat.filter && store.getState().marccat.filter.filters) {
        const { languageFilter, formatType } = remapFilters(store.getState().marccat.filter.filters);
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
        history.push('/marccat/browse');
      } else if (!isBrowseRequested) {
        if (indexForQuery === 'BN ' || indexForQuery === 'SN ' || indexForQuery === 'PU ' || indexForQuery === 'LL ' || indexForQuery === 'BC ' || indexForQuery === 'CP ' || indexForQuery === 'PW ') {
          dispatch({ type: ActionTypes.SEARCH, queryBib: bibQuery, queryAuth: '' });
        } else {
          dispatch({ type: ActionTypes.SEARCH, queryBib: bibQuery, queryAuth: authQuery });
        }
        history.push('/marccat/search');
      }
    }
  }

  handleAddSearchForm = () => {
    const { searchForm } = this.state;
    this.setState({
      searchForm: searchForm.concat([{ name: '' }])
    });
  }

  handleRemoveSearchForm = (idx) => () => {
    const { searchForm } = this.state;
    delete searchForm[idx];
    this.setState({
      searchForm
    });
  }

  render() {
    const { translate, ...rest } = this.props;
    const { searchForm } = this.state;
    return (
      <AccordionSet>
        <Accordion
          {...rest}
          separator={false}
          label={translate({ id: 'ui-marccat.navigator.search' })}
          header={FilterAccordionHeader}
        >
          {searchForm.map((form, idx) => (
            <form name="searchForm" onKeyDown={this.handleKeyDown} key={idx}>
              <Row>
                <Col xs={11}>
                  <div className={styles.select_margin}>
                    <SearchIndexes
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
              <Row style={{ height: '30px' }}>
                <Col xs={11}>
                  <SearchConditions {...this.props} />
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
              <Col xs={11}>
                <Button
                  buttonClass={styles.rightPosition}
                  onClick={this.handleAddSearchForm}
                >
                  <Icon icon="plus-sign">
                    {translate({ id: 'ui-marccat.button.add' })}
                  </Icon>
                </Button>
                {idx !== 0 &&
                <Button
                  buttonClass={styles.rightPositionTop}
                  onClick={this.handleRemoveSearchForm(idx)}
                >
                  {translate({ id: 'ui-marccat.button.remove' })}
                </Button>}
              </Col>
            </form>
          ))
          }
        </Accordion>
        <FiltersContainer {...this.props} />
      </AccordionSet>
    );
  }
}

export default reduxForm({
  form: 'searchForm',
})(SearchPanel);
