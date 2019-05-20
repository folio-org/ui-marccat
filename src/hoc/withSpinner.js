// @flow
import * as React from 'react';
import { compose, lifecycle, branch, renderComponent } from 'recompose';

const withUserData = lifecycle({
  state: { loading: true },
  componentDidMount() {
    // rest call
  }
});

const Spinner = () => (
  <div className="Spinner">
    <div className="loader">Loading...</div>
  </div>
);

const isLoading = ({ loading }) => loading;

const withSpinner = branch(
  isLoading,
  renderComponent(Spinner)
);

const enhance = compose(
  withUserData,
  withSpinner
);

export default enhance;
