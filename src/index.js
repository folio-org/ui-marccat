/**
 * @format
 * @flow
 */
import * as React from 'react';
import { MarcatSettings as Settings } from './components';
import { Router } from './router';
import { reducer, epics } from './redux';
import { injectCommonProp } from './shared';
import MARCcat from './MARCcat';
import { ActionTypes } from './redux/actions';
import { TAGS } from './components/Cataloguing';
import { REDUX } from './shared/config/constants';

import './shared/styles/common.css';


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
    props.root.addReducer(REDUX.REDUCER, reducer);
    props.root.addEpic(REDUX.EPIC, epics);

    this.toggleFilterPane = this.toggleFilterPane.bind(this);

  }

  componentDidMount() {
    const { store: { dispatch } } = this.props;
    dispatch({ type: ActionTypes.VIEW_TEMPLATE });
    dispatch({ type: ActionTypes.HEADER_TYPES_006, code: TAGS._006 });
    dispatch({ type: ActionTypes.HEADER_TYPES_007, code: TAGS._007 });
    dispatch({ type: ActionTypes.HEADER_TYPES_008, code: TAGS._008 });
    dispatch({ type: ActionTypes.SETTINGS, data: {} });
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
