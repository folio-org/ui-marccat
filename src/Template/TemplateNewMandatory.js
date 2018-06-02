import _ from 'lodash'; // eslint-disable-line  import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import React from 'react';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import {
  ENDPOINT,
  RESOURCE_TYPE,
  INITIAL_RESULT_COUNT,
} from '../constant';

class TemplateNewMandatory extends React.Component {
    static manifest = Object.freeze({
      query: { initialValue: {} },
      resultCount: { initialValue: INITIAL_RESULT_COUNT },
      records: {
        type: RESOURCE_TYPE,
        root: ENDPOINT.BASE_URL,
        path: ENDPOINT.TEMPLATE_MANDATORY,
        headers: { 'x-okapi-tenant': 'tnx' },
        records: 'fields',
        GET: {
          params: { lang: ENDPOINT.DEFAULT_LANG },
        },
      }
    });

    render() {
      const formatMsg = this.props.stripes.intl.formatMessage;

      const { resources: { records } } = this.props; // eslint-disable-line react/prop-types
      if (!records || !records.hasLoaded) return <div />;
      const fields = records.records;
      const formatter = {
        'label: label': x => _.get(x, ['displayValue']),
        'code: code': x => _.get(x, ['code']),
        'cat: cat': x => _.get(x, ['categoryCode']),
        'hdrNum: hdrNum': x => _.get(x, ['headerTypeCode']),
        'descr: descr': x => _.get(x, ['description'])

      };

      return (
        <Paneset static>
          <Pane paneTitle={formatMsg({ id: 'ui-cataloging.templates.title' })}>
            <MultiColumnList
              id="fields"
              contentData={fields}
              rowMetadata={['code', 'code']}
              formatter={formatter}
              visibleColumns={['code', 'descr']}
              ariaLabel="TemplateNewMandatory"
              containerRef={ref => {
                    this.resultsList = ref;
                  }}
              rowFormatter={this.anchoredRowFormatter}
            />
          </Pane>
        </Paneset>
      );
    }
}

TemplateNewMandatory.propTypes = {
  stripes: PropTypes.shape({ // eslint-disable-line react/no-unused-prop-types
    connect: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
  }).isRequired
};

export default TemplateNewMandatory;
