import React from 'react';
import Button from '@folio/stripes-components/lib/Button';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import { Row, Col } from 'react-flexbox-grid';
import { ENDPOINT } from '../Utils/Constant';

type SearchEngineProps = {
  inputValue: string,
  store: Object,
  repos: Array<Object>,
}

function SearchEngine(props: SearchEngineProps) {
  function handleSearch(evt) {
    evt.preventDefault();
    const query = props.store.getState().form['object Object'].values.searchTextArea;
    const URL_SEARCH = ENDPOINT.BASE_URL.concat('/').concat(ENDPOINT.SEARCH_URL).concat(`?lang=ita&q=${query}&from=1&to=10&view=1&ml=170&dpo=1`);
    return fetch(URL_SEARCH, { method: 'GET', headers: ENDPOINT.HEADERS }).then((response) => {
      return response.json();
    }).then((data) => {
      props.store.dispatch({ type: '@@ui-marccat/SEARCH', repos: data.docs });
    });
  }
  function handleScan(evt) {
    evt.preventDefault();
  }

  return (
    <form name="advancedSearchForm">
      <Row>
        <Col xs={12}>
          <Field
            style={{ width: '100%', marginBottom: '10px' }}
            defaultValue={props.inputValue}
            placeholder="What are you searching for?"
            rows="2"
            name="searchTextArea"
            id="searchTextArea"
            component="textarea"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Button fullWidth buttonStyle="primary" onClick={(evt) => handleSearch(evt, props.inputValue)}>Search</Button>
        </Col>
        <Col xs={6}>
          <Button fullWidth buttonStyle="primary" onClick={(evt) => handleScan(evt, props.inputValue)}>Scan</Button>
        </Col>
      </Row>
      { props.marccat.search.isLoading &&
      <div>
        {props.marccat.search.repos[0].data}
      </div>
      }
    </form>
  );
}

connect(
  ({ marccat: { search } }) => ({
    repos: search.repos,
    isLoading: search.isLoading
  })
)(SearchEngine);

export default reduxForm({
  form: 'advancedSearchForm',
  initialValues: {},
  enableReinitialize: true,
  fields: ['searchTextArea']
})(SearchEngine);
