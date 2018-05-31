import _ from 'lodash'; // eslint-disable-line  import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import React from 'react';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import Pane from '@folio/stripes-components/lib/Pane';
import Paneset from '@folio/stripes-components/lib/Paneset'; // eslint-disable-line import/no-extraneous-dependencies
import TemplateAddButton from './TemplateAddButton';
import {
  ENDPOINT,
  RESOURCE_TYPE,
  INITIAL_RESULT_COUNT,
} from '../constant';

class TemplateView extends React.Component {
  static manifest = Object.freeze({
    query: { initialValue: {} },
    resultCount: { initialValue: INITIAL_RESULT_COUNT },
    records: {
      type: RESOURCE_TYPE,
      root: ENDPOINT.BASE_URL,
      path: ENDPOINT.TEMPLATE_URL,
      headers: { 'x-okapi-tenant': 'tnx' },
      records: 'recordTemplates',
      GET: {
        params: { lang: 'ita', type: 'B' },
      },
    }
  });


  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;

    const { resources: { records } } = this.props; // eslint-disable-line react/prop-types
    if (!records || !records.hasLoaded) return <div />;
    const templates = records.records;
    const formatter = {
      'Id: id': x => _.get(x, ['id']),
      'name: name': x => _.get(x, ['name']),
    };

    return (
      <Paneset static>
        <Pane paneTitle={formatMsg({ id: 'ui-cataloging.templates.title' })}>
          <div>
            <TemplateAddButton {...this.props} />
          </div>
          <div>
            <MultiColumnList
              id="list-templates"
              contentData={templates}
              rowMetadata={['id', 'id']}
              formatter={formatter}
              visibleColumns={['id', 'name']}
              ariaLabel="TemplateView"
              containerRef={ref => {
                this.resultsList = ref;
              }}
              rowFormatter={this.anchoredRowFormatter}
            />
          </div>
        </Pane>
      </Paneset>
    );
  }
}

TemplateView.propTypes = {
  stripes: PropTypes.shape({ // eslint-disable-line react/no-unused-prop-types
    connect: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
  }).isRequired
};

export default TemplateView;
