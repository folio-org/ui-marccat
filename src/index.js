/**
 * @format
 * @flow
 */
import React from 'react';
import { connect } from '@folio/stripes-connect';
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
  mutator: {
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
  location: {
    pathname: string,
  },
  showSettings: boolean,
};

class MARCCatRouting extends React.Component<RoutingProps, {}> {
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
  });

  constructor(props) {
    super(props);
    this.props.mutator.indexType.replace('P');
    this.props.mutator.innerIndexValue.replace('2');
    this.props.mutator.constraintIndexValue.replace('LIB');
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

export default connect(MARCCatRouting, C.META.MODULE_NAME);
