import PropTypes from 'prop-types';
import React from 'react';
import { connect } from '@folio/stripes-connect';
import { CatalogingSelect } from '../../Material/';
import * as C from '../../Utils';

const logical = require('../../Mock/logical-views');

const mockCategory = require('../../Mock/cat-select');


class CategorySelect extends React.Component {
    static manifest = Object.freeze({
      categories: {
        type: C.RESOURCE_TYPE,
        root: C.ENDPOINT.BASE_URL,
        path: C.ENDPOINT.CATEGORY_URL,
        headers: C.ENDPOINT.HEADERS,
        records: C.API_RESULT_JSON_KEY.CATEGORIES,
        GET: {
          params: { lang: 'ita' },
        },
      },
      heading: {
        type: C.RESOURCE_TYPE,
        root: C.ENDPOINT.BASE_URL,
        path: C.ENDPOINT.HEADING_TYPES,
        headers: C.ENDPOINT.HEADERS,
        records: C.API_RESULT_JSON_KEY.HEADING_TYPES,
        GET: {
          params: { type: 'P', lang: 'ita', marcCategory: '1' },
        },
      }
    });

    render() {
      const { resources: { categories } } = this.props;
      let category = {};
      if (!categories || !categories.hasLoaded) category = logical.categorys;

      const mapping = logical.views.map(s => ({
        value: s.longDescription,
        label: s.longDescription
      }));

      return (
        <CatalogingSelect options={mapping} label="Database" />
      );
    }
}

CategorySelect.propTypes = {
  resources: PropTypes.object.isRequired
};

export default connect(CategorySelect, C.META.MODULE_NAME);
