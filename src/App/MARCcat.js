/**
 * @format
 * @flow
 */
import * as React from 'react';
import { Navigator } from '../Navigator';
import * as C from '../Utils';

type MARCcatProps = {
  stripes: Object,
  resources: Object,
  mutator: Object,
};

type MARCcatState = {}

export default class MARCcat extends React.Component<MARCcatProps, MARCcatState> {
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
    return <Navigator {...this.props} />;
  }
}
