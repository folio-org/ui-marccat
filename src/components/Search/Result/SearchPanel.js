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
import { findYourQuery, languageFilterMap } from '../../Search/Select/FilterMapper';
import { remapFilters } from '../../../utils/Mapper';

type P = Props & {
  inputValue: string,
  translate: Function
}

class SearchPanel extends React.Component<P, {}> {
  constructor(props:P) {
    super(props);
    this.state = {};
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const { store } = this.props;
      const indexFilter = store.getState().form.searchForm.values.selectIndexes;
      const conditionFilter = store.getState().form.searchForm.values.selectCondition;
      const keyForCheckFilter = indexFilter.concat('-').concat(conditionFilter);

      let indexForQuery = '';
      findYourQuery.map(el => {
        if (el.label === keyForCheckFilter) {
          indexForQuery = el.value;
        }
        return indexForQuery;
      });
      let newQuery = indexForQuery + e.target.form[2].defaultValue;
      newQuery = (conditionFilter === 'MATCH') ? newQuery + '!' : newQuery;

      // filters
      if (store.getState().marccat && store.getState().marccat.filter && store.getState().marccat.filter.filters) {
        const { languageFilter } = remapFilters(store.getState().marccat.filter.filters);
        const languageQuery = languageFilter
          .map(element => {
            return 'LAN "' + languageFilterMap[Object.keys(element)[0]] + '"';
          })
          .join(' OR ');
        newQuery = newQuery + ' AND (' + languageQuery + ')';
      }

      console.log(store.getState());
      store.dispatch({ type: ActionTypes.SEARCH, query: newQuery });
      store.dispatch({ type: ActionTypes.SEARCH_AUTH, query: newQuery });
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
                  onClick={() => alert('ferewewrer')}
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
        <FiltersContainer {...this.props} />
      </AccordionSet>
    );
  }
}

export default reduxForm({
  form: 'searchForm'
})(injectCommonProp(SearchPanel));
