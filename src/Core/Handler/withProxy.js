import React from 'react';
import PropTypes from 'prop-types';
import * as C from '../../Utils';

const withProxy = WrappedComponent =>
  class WithProxyComponent extends React.Component {
        static manifest = Object.freeze(
          Object.assign({}, WrappedComponent.manifest, {
            recordsTemplates: {
              type: C.RESOURCE_TYPE,
              root: C.ENDPOINT.BASE_URL,
              records: C.ENDPOINT.TEMPLATE_URL,
              path: C.ENDPOINT.TEMPLATE_URL,
              accumulate: 'true',
              fetch: false,
              GET: { params: { lang: C.ENDPOINT.DEFAULT_LANG }, },
              POST: { path: C.ENDPOINT.BASE_URL + C.ENDPOINT.TEMPLATE_MANDATORY },
              PUT: { path: C.ENDPOINT.BASE_URL + C.ENDPOINT.TEMPLATE_MANDATORY },
              DELETE: { path: C.ENDPOINT.BASE_URL + C.ENDPOINT.TEMPLATE_MANDATORY },
            },
            recordsMandatory: {
              type: C.RESOURCE_TYPE,
              root: C.ENDPOINT.BASE_URL,
              path: C.ENDPOINT.TEMPLATE_MANDATORY,
              headers: C.ENDPOINT.HEADERS,
              accumulate: 'true',
              records: 'fields',
              GET: { params: { lang: C.ENDPOINT.DEFAULT_LANG }, },
              POST: { path: C.ENDPOINT.BASE_URL + C.ENDPOINT.TEMPLATE_MANDATORY },
              PUT: { path: C.ENDPOINT.BASE_URL + C.ENDPOINT.TEMPLATE_MANDATORY },
              DELETE: { path: C.ENDPOINT.BASE_URL + C.ENDPOINT.TEMPLATE_MANDATORY },
            },
            categories: {
              type: C.RESOURCE_TYPE,
              root: C.ENDPOINT.BASE_URL,
              path: 'index-categories?type=P&lang=ita',
              headers: { 'x-okapi-tenant': 'tnx' },
              records: C.API_RESULT_JSON_KEY.INDEX_CATEGORIES
            },
            sponsorsFor: {
              type: 'rest',
              records: 'proxiesFor',
              path: 'proxiesfor',
              accumulate: 'true',
              fetch: false,
            },
          }),
        );

        static propTypes = {
          stripes: PropTypes.shape({
            hasPerm: PropTypes.func.isRequired,
          }),
          resources: PropTypes.shape({
            sponsors: PropTypes.object,
            proxies: PropTypes.object,
          }),
          match: PropTypes.shape({
            params: PropTypes.shape({
              id: PropTypes.string,
            }),
          }).isRequired,
          mutator: PropTypes.shape({
            proxiesFor: PropTypes.shape({
              POST: PropTypes.func.isRequired,
              GET: PropTypes.func.isRequired,
              DELETE: PropTypes.func.isRequired,
              reset: PropTypes.func,
            }),
            sponsorsFor: PropTypes.shape({
              GET: PropTypes.func.isRequired,
              reset: PropTypes.func,
            }),
            proxies: PropTypes.shape({
              GET: PropTypes.func.isRequired,
              reset: PropTypes.func,
            }),
            sponsors: PropTypes.shape({
              GET: PropTypes.func.isRequired,
              reset: PropTypes.func,
            }),
          }),
        };

        constructor(props) {
          super(props);
          this.state = {};
        }


        getRecords(resourceName, idKey) {
          const { resources } = this.props;
          const resourceForName = `${resourceName}For`;
          const records = (resources[resourceName] || {}).records || [];
          const recordsFor = (resources[resourceForName] || {}).records || [];

          if (!records.length) return records;

          const rMap = records.reduce((memo, record) =>
            Object.assign(memo, { [record.id]: record }), {});
          return recordsFor.map(r => ({ proxy: r, user: rMap[r[idKey]] }));
        }


        render() {
          return (<WrappedComponent
              {...this.props}
            />);
        }
  };


export default withProxy;
