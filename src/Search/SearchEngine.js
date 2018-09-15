import React from 'react';
import { connect } from 'react-redux';
import { ENDPOINT } from '../Utils/Constant';

type SearchEngineProps = {
    inputValue: string,
    handleInputChange: Function,
    handleSubmit: Function,
}

function SearchEngine(props:SearchEngineProps) {
  return (
    <div>
      <form onSubmit={() => props.handleSubmit(props.inputValue)}>
        <input value={props.inputValue} onChange={props.handleInputChange} />
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    inputValue: state.searchInputValue,
    repos: state.repos
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleInputChange: (evt) => {
      dispatch({ type: 'SEARCH_INPUT_CHANGE', value: evt.target.value });
    },
    handleSubmit: (evt, inputValue) => {
      evt.preventDefault();
      fetch(ENDPOINT.BASE_URL.concat('/').concat(ENDPOINT.SEARCH_URL).concat(`?lang=eng&q=${inputValue}&from=1&to=10&view=1&ml=170&dpo=1`))
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          dispatch({ type: 'SET_REPOS', repos: data.docs });
        });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchEngine);
