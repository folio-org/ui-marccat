import _ from 'lodash'; // eslint-disable-line  import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import React from 'react';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import Pane from '@folio/stripes-components/lib/Pane';
import Paneset from '@folio/stripes-components/lib/Paneset'; // eslint-disable-line import/no-extraneous-dependencies

class TemplateView extends React.Component {
  static manifest = Object.freeze({
    recordTemplate: {
      type: 'rest',
      root: 'http://localhost:8080/cataloging',
      path: 'record-templates',
      headers: { 'x-okapi-tenant': 'tnx' },
      records: 'recordTemplates',
      GET: {
        params: { lang: 'ita', type: 'B' },
      },
    },
  });

  render() {
    const { resources: { recordTemplate } } = this.props; // eslint-disable-line react/prop-types
    if (!recordTemplate || !recordTemplate.hasLoaded) return <div />;
    const templates = recordTemplate.records;
    const formatter = {
      'Id: id': x => _.get(x, ['id']),
      'name: name': x => _.get(x, ['name']),
    };

    return (
      <Paneset static>
        <Pane defaultWidth="80%" paneTitle="Some Stripes Components">
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
