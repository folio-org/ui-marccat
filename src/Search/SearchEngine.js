import React from 'react';
import Button from '@folio/stripes-components/lib/Button';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

type SearchEngineProps = {
  inputValue: string,
  handleInputChange: Function,
  handleSubmit: Function,
}


function SearchEngine(props: SearchEngineProps) {
  function handleSubmit(e) {
    console.log('rewrwe');
    props.store.dispatch({
      type: 'SEARCH',
      payload: props.store.getState().form['object Object'].values.searchTextArea
    });
  }
  return (
    <form name="advancedSearchForm">
      <Field
        fullWidth
        defaultValue={props.inputValue}
        onChange={props.handleInputChange}
        rows="2"
        name="searchTextArea"
        id="searchTextArea"
        component="textarea"
      />
      <Button onClick={(evt) => handleSubmit(evt, props.inputValue)}>Search</Button>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    inputValue: state.searchInputValue,
    repos: state.repos
  };
};

const mapDispatchToProps = {
  performSearch: '@@ui-marccat/SEARCH'
};

connect(mapStateToProps, mapDispatchToProps)(SearchEngine); // eslint disable-line

export default reduxForm({
  form: 'advancedSearchForm',
  initialValues: {},
  enableReinitialize: true,
  fields: ['searchTextArea']
})(SearchEngine);
