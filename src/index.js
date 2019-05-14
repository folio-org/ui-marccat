// @flow
import * as React from 'react';
import { MarcatSettings as Settings } from './components';
import { reducer, epics } from './redux';
import { injectProps } from './shared';
import type { Props } from './flow/types.js.flow';
import { ACTION } from './redux/actions';
import { REDUX } from './config/constants';
import Provider from './route/Provider';

import './shared/styles/common.css';

type S = {
  filterPaneIsVisible: boolean,
};
class MARCcat extends React.Component<Props, S> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      filterPaneIsVisible: true,
    };
    /*
     * add epic and reducer to the application store
     * all the reducer and the epic are load in the Redux folder
     * and combine in a  unique reducer and unique epic$
     */
    props.root.addReducer(REDUX.REDUCER, reducer);
    props.root.addEpic(REDUX.EPIC, epics);
    this.toggleFilterPane = this.toggleFilterPane.bind(this);
  }

  componentDidMount() {
    const { store: { dispatch } } = this.props;
    dispatch({ type: ACTION.SETTINGS, data: {} });
  }

  toggleFilterPane = () => {
    this.setState(prevState => ({ filterPaneIsVisible: !prevState.filterPaneIsVisible }));
  }

  render() {
    const { showSettings } = this.props;
    const { filterPaneIsVisible } = this.state;
    if (showSettings) {
      return <Settings {...this.props} />;
    }
    return (
      <Provider
        {...this.props}
        filterPaneIsVisible={filterPaneIsVisible}
        toggleFilterPane={this.toggleFilterPane}
      />
    );
  }
}

/**
  * we use the @link {injectProps} wrapper to supply all component a root prop for add a reducer and epic
  * the root prop is in the props object.
  *
  * @example: this.props.root
  * @example: const { state } = this.props.root;
  */
export default injectProps(MARCcat);
