import React from 'react';
import PropTypes from 'prop-types';
import { connect } from '@folio/stripes-connect';
import * as C from '../../Utils';
import SimpleSelect from '../../Material/SimpleSelect';

class IndexCategory extends React.Component {

  /* manifest with dynamic parameter. It works (as I can see on net tab) but it doesn't force re-render */
  /*
  static manifest = Object.freeze({
    categories: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: 'index-categories?type=%{recordType}&lang=%{language}',
      headers: { 'x-okapi-tenant': 'tnx' },
      records: C.API_RESULT_JSON_KEY.INDEX_CATEGORIES
    },
  });
  */

  static manifest = Object.freeze({
    categories: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: 'index-categories?type=P&lang=ita',
      headers: { 'x-okapi-tenant': 'tnx' },
      records: C.API_RESULT_JSON_KEY.INDEX_CATEGORIES
    },
  });

  render() {
    const recordType = 'P';
    const language = C.ENDPOINT.DEFAULT_LANG;
    const emptySelect = <div>Vuoto</div>;
    const { resources: { categories }, mutator } = this.props;
    if (!categories || !categories.hasLoaded) return emptySelect;
    return (
      <SimpleSelect {...this.props} data={categories.records} title="Category" />
    );
  }
}

IndexCategory.propTypes = {
  resources: PropTypes.object.isRequired,
  mutator: PropTypes.shape({
    recordType: PropTypes.shape({
      replace: PropTypes.func,
    }),
    language: PropTypes.shape({
      replace: PropTypes.func,
    }),
    settings: PropTypes.shape({
      GET: PropTypes.func
    }),
  }).isRequired,
};


export default connect(IndexCategory, C.META.MODULE_NAME);
