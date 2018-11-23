/**
 * @format
 * @flow
 */
import * as React from 'react';
import Settings from './settings';
import { Router } from './router';
import { reducer, epics } from './redux';
import { injectCommonProp } from './core';
import * as C from './utils';
import MARCcat from './MARCcat';

import './styles/common.css';

type RoutingProps = {
  root: {
    addReducer: Function;
    addEpic: Function;
  },
  filterPaneIsVisible: boolean;
  showSettings: boolean;
  children: React.ReactNode;
};


class MARCCatRouting extends React.Component<RoutingProps, {}> {
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
    // this.context.addReducer(resourceKey, reducer)
    props.root.addReducer(C.STATE_MANAGEMENT.REDUCER, reducer);
    props.root.addEpic(C.STATE_MANAGEMENT.EPIC, epics);

    this.toggleFilterPane = this.toggleFilterPane.bind(this);
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
      <MARCcat
        {...this.props}
        filterPaneIsVisible={filterPaneIsVisible}
        toggleFilterPane={this.toggleFilterPane}
      >
        <Router
          {...this.props}
          toggleFilterPane={this.toggleFilterPane}
        />
      </MARCcat>
    );
  }
}

/**
  * we use the @link {injectCommonProp} wrapper to supply all component a root prop for add a reducer and epic
  * the root prop is in the props object.
  *
  * @example: this.props.root
  * @example: const { state } = this.props.root;
  */
export default injectCommonProp(MARCCatRouting);
