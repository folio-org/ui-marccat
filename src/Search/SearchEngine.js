import React from 'react';
import Button from '@folio/stripes-components/lib/Button';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { ENDPOINT } from '../Utils/Constant';

type SearchEngineProps = {
  inputValue: string,
  handleInputChange: Function,
  handleSubmit: Function,
}

function SearchEngine(props: SearchEngineProps) {
  return (
    <form>
      <Field
        fullWidth
        defaultValue={props.inputValue}
        onChange={props.handleInputChange}
        rows="2"
        name="searchTextArea"
        id="searchTextArea"
        component="textarea"
      />
      <Button onClick={(evt) => props.handleSubmit(evt, props.inputValue)}>Search</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchEngine);
