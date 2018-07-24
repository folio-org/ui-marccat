/**
 * @format
 * @flow
 */
import React from 'react';
import { Settings } from './Settings';
import { Navigator } from './Navigator/';
import * as C from './Utils';
import Router from './router';

import './Theme/variables.css';

type RoutingProps = {
  stripes: {
    connect: Function,
    intl: Object,
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
  location: {
    pathname: string,
  },
  showSettings: boolean,
};

class MARCCatRouting extends React.Component<RoutingProps, {}> {
  static manifest = Object.freeze({
    query: { initialValue: {} },
    indexType: {},
    innerIndexValue: {},
    constraintIndexValue: {},
    categories: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: `index-categories?type=P&lang=${C.ENDPOINT.DEFAULT_LANG}`,
      headers: C.ENDPOINT.HEADERS,
      records: C.API_RESULT_JSON_KEY.INDEX_CATEGORIES,
    },
    innerIndexes: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: 'indexes?categoryType=P&categoryCode=2&lang=ita',
      headers: C.ENDPOINT.HEADERS,
      records: C.API_RESULT_JSON_KEY.INDEX_INNER,
    },
    constraintIndexes: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      headers: C.ENDPOINT.HEADERS,
      path: 'indexes/%{constraintIndexValue}?lang=ita',
      records: C.API_RESULT_JSON_KEY.CONSTRAINT_INDEX,
    },
  });

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

export default MARCCatRouting;
