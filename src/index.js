/**
 * @format
 * @flow
 */
import * as React from 'react';
import { Settings } from './settings';
import Router from './router';
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
};

class MARCCatRouting extends React.Component<RoutingProps, {}> {
  constructor(props, context) {
    super(props, context);
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
        <Router {...this.props} />
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
