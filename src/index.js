/**
 * @format
 * @flow
 */
import * as React from 'react';
import { Settings } from './settings';
import { reducer, epics } from './redux';
import { injectCommonProp } from './core';
import * as C from './utils';
import MARCcat from './components/MARCcat';

import './index.css';

type RoutingProps = {
  root: {
    addReducer: Function,
    addEpic: Function,
  },
  showSettings: boolean,
  children: React.ReactNode
};

class MARCCatRouting extends React.Component<RoutingProps, {}> {
  constructor(props, context) {
    super(props, context);
    /*
     * add epic and reducer to the application store
     * all the reducer and the epic are load in the Redux folder
     * and combine in a  unique reducer and unique epic$
     */
    // this.context.addReducer(resourceKey, reducer)
    props.root.addReducer(C.STATE_MANAGEMENT.REDUCER, reducer);
    props.root.addEpic(C.STATE_MANAGEMENT.EPIC, epics);
  }

  render() {
    const { showSettings } = this.props;
    if (showSettings) {
      return <Settings {...this.props} />;
    }
    return (
      <MARCcat {...this.props}>
        {this.props.children}
      </MARCcat>
    );
  }
}

/**
  * we use the @link {withRoot} wrapper to supply all component a root prop for add a reducer and epic
  * the root prop is in the props object.
  *
  * @example: this.props.root
  * @example: const { state } = this.props.root;
  */
export default injectCommonProp(MARCCatRouting);
