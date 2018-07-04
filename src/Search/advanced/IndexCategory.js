import React from 'react';
import PropTypes from 'prop-types';
import { connect } from '@folio/stripes-connect';
import Select from '@folio/stripes-components/lib/Select';
import * as C from '../../Utils';

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
    indexType: {},
    categories: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: 'index-categories?type=%{indexType.type}&lang=ita',
      headers: { 'x-okapi-tenant': 'tnx' },
      records: C.API_RESULT_JSON_KEY.INDEX_CATEGORIES
    },
  });

  constructor(props) {
    super(props);
    this.onUpdateType = this.onUpdateType.bind(this);
  }

  onUpdateType(typeValue) {
    this.props.mutator.indexType.update({ type: typeValue });
    return this.props.mutator.categories.GET(typeValue);
  }

  render() {
    const { resources: { categories } } = this.props;
    if (!categories || !categories.hasLoaded) {
      return (
        <div>vuoto</div>
      );
    }
    return (<Select {...this.props} dataOptions={categories.records} title="Category" />);
  }
}

IndexCategory.propTypes = {
  resources: PropTypes.object.isRequired,
  mutator: PropTypes.shape({
    indexType: PropTypes.shape({
      update: PropTypes.func,
    }),
    categories: PropTypes.shape({
      GET: PropTypes.func,
    }),
    language: PropTypes.shape({
      replace: PropTypes.func,
    }),
  }).isRequired,
};


export default connect(IndexCategory, C.META.MODULE_NAME);
