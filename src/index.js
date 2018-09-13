/**
 * @format
 * @flow
 */
import * as React from 'react';
import { Settings } from './Settings';
import Router from './router';
import { reducer, epics } from './Redux';
import { injectCommonProp } from './Core';
import * as C from './Utils';
import MARCcat from './App/MARCcat';

type RoutingProps = {
  stripes: {
    connect: Function,
    intl: Object,
  },
  resources: Object,
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
    indexType: {
      replace: Function,
    },
    innerIndexValue: {
      replace: Function,
    },
    constraintIndexValue: {
      replace: Function,
    },
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
    views: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: C.ENDPOINT.LOGICAL_VIEW_URL,
      headers: C.ENDPOINT.HEADERS,
      records: C.API_RESULT_JSON_KEY.LOGICAL_VIEW,
      GET: {
        params: { lang: C.ENDPOINT.DEFAULT_LANG },
      },
    },
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
      accumulate: true
    },
    firstPage: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: `first-page?mainLibrary=170&view=1&query=%{query}&lang=${C.ENDPOINT.DEFAULT_LANG}`,
      headers: C.ENDPOINT.HEADERS,
      records: C.API_RESULT_JSON_KEY.BROWSING,
      accumulate: true
    },
    previousPage: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: `previous-page?mainLibrary=170&view=1&query=%{query}&lang=${C.ENDPOINT.DEFAULT_LANG}`,
      headers: C.ENDPOINT.HEADERS,
      records: C.API_RESULT_JSON_KEY.BROWSING,
      accumulate: true
    },
    nextPage: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: `next-page?mainLibrary=170&view=1&query=%{query}&lang=${C.ENDPOINT.DEFAULT_LANG}`,
      headers: C.ENDPOINT.HEADERS,
      records: C.API_RESULT_JSON_KEY.BROWSING,
      accumulate: true
    },
    recordsTemplates: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      headers: C.ENDPOINT.HEADERS,
      records: C.API_RESULT_JSON_KEY.TEMPLATES,
      GET: {
        path: 'record-templates?type=%{currentType}&lang=' + C.ENDPOINT.DEFAULT_LANG
      },
      POST: {
        path: `record-template?type=B&lang=${C.ENDPOINT.DEFAULT_LANG}`
      },
      PUT: {
        path: `record-template/%{query}?type=B&lang=${C.ENDPOINT.DEFAULT_LANG}`
      },
      DELETE: {
        path: `record-template/%{query}?type=B&lang=${C.ENDPOINT.DEFAULT_LANG}`
      }
    },
    mandatory: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      headers: C.ENDPOINT.HEADERS,
      records: C.API_RESULT_JSON_KEY.FIELDS,
      GET: {
        path: 'bibliographic/fields/mandatory?lang=' + C.ENDPOINT.DEFAULT_LANG
      },
    },
  });

  constructor(props, context) {
    super(props, context);
    this.props.mutator.indexType.replace('P');
    this.props.mutator.innerIndexValue.replace('2');
    this.props.mutator.constraintIndexValue.replace('LIB');

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
