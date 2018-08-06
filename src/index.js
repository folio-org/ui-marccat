/**
 * @format
 * @flow
 */
import React from 'react';
import { connect } from '@folio/stripes-connect';
import { withRoot as withStoreSubscription } from '@folio/stripes-core/src/components/Root/RootContext';
import { Settings } from './Settings';
import { Navigator } from './Navigator/';
import Router from './router';
import { reducer, epics } from './Redux';
import * as C from './Utils';

import './Theme/variables.css';

type RoutingProps = {
  stripes: {
    connect: Function,
    intl: Object,
  },
  mutator: {
    firstPage: {
      GET: Function,
      reset: Function,
    },
    previousPage: {
      GET: Function,
      reset: Function,
    },
    nextPage: {
      GET: Function,
      reset: Function,
    },
    searchQuery:{
      GET: Function,
      reset: Function,
    },
    indexType: string,
    innerIndexValue: string,
    constraintIndexValue: string,
  },
  history: {
    goBack: Function,
    pop: Function,
    push: Function,
  },
  match: {
    path: string,
    id: string,
  },
  root: {
    addReducer: Function,
    addEpic: Function,
  },
  location: {
    pathname: string,
  },
  showSettings: boolean,
};

class MARCCatRouting extends React.Component<RoutingProps, {}> {
  static actionNames = ['advancedSearch', 'diacritcChar'];
  static manifest = Object.freeze({
    query: {},
    indexType: {},
    innerIndexValue: {},
    constraintIndexValue: {},
    categories: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: `index-categories?type=%{indexType}&lang=${C.ENDPOINT.DEFAULT_LANG}`,
      headers: C.ENDPOINT.HEADERS,
      records: C.API_RESULT_JSON_KEY.INDEX_CATEGORIES,
    },
    innerIndexes: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: `indexes?categoryType=%{indexType}&categoryCode=%{innerIndexValue}&lang=${C.ENDPOINT.DEFAULT_LANG}`,
      headers: C.ENDPOINT.HEADERS,
      records: C.API_RESULT_JSON_KEY.INDEX_INNER,
    },
    constraintIndexes: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      headers: C.ENDPOINT.HEADERS,
      path: `indexes/%{constraintIndexValue}?lang=${C.ENDPOINT.DEFAULT_LANG}`,
      records: C.API_RESULT_JSON_KEY.CONSTRAINT_INDEX,
    },
    searchQuery: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      headers: C.ENDPOINT.HEADERS,
      path: 'search?lang=ita&q=%{query}&from=1&to=1&view=1&ml=170&dpo=1',
      records: 'docs',
      accumulate: true,
      fetch: false
    },
    firstPage: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: `first-page?mainLibrary=170&view=1&query=%{query}&lang=${C.ENDPOINT.DEFAULT_LANG}`,
      headers: C.ENDPOINT.HEADERS,
      records: C.API_RESULT_JSON_KEY.BROWSING,
      accumulate: true,
      fetch: false
    },
    previousPage: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: `previous-page?mainLibrary=170&view=1&query=%{query}&lang=${C.ENDPOINT.DEFAULT_LANG}`,
      headers: C.ENDPOINT.HEADERS,
      records: C.API_RESULT_JSON_KEY.BROWSING,
      accumulate: true,
      fetch: false
    },
    nextPage: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: `next-page?mainLibrary=170&view=1&query=%{query}&lang=${C.ENDPOINT.DEFAULT_LANG}`,
      headers: C.ENDPOINT.HEADERS,
      records: C.API_RESULT_JSON_KEY.BROWSING,
      accumulate: true,
      fetch: false
    },
  });

  constructor(props) {
    super(props);
    this.props.mutator.indexType.replace('P');
    this.props.mutator.innerIndexValue.replace('2');
    this.props.mutator.constraintIndexValue.replace('LIB');

    /*
     * @author: Christian Chiama
     * add epic and reducer to the application store
     * all the reducer and the epic are load in the Redux folder
     * and combine in a  unique reducer and unique epic$
     */
    props.root.addReducer(C.STATE_MANAGEMENT.REDUCER, reducer);
    props.root.addEpic(C.STATE_MANAGEMENT.EPIC, epics);
  }

  render() {
    const { showSettings } = this.props;
    if (showSettings) {
      return <Settings {...this.props} />;
    }
    return (
      <Navigator {...this.props}>
        <Router {...this.props} />
      </Navigator>
    );
  }
}

export default withStoreSubscription(connect(MARCCatRouting, C.META.MODULE_NAME));
