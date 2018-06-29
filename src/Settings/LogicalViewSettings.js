import React from 'react';
import PropTypes from 'prop-types';
import Pane from '@folio/stripes-components/lib/Pane';
import * as C from '../Utils';
import { CatalogingSelect } from '../Material/Autocomplete/';

type LogicalViewProps = {|
    resources: Object,
    label: PropTypes.string.isRequired;
|}
type LogicalViewState= {|
    label: PropTypes.string.isRequired;
|}

export default class LogicalView extends React.Component<LogicalViewProps, LogicalViewState> {
  static manifest = Object.freeze({
    views: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: C.ENDPOINT.LOGICAL_VIEW_URL,
      headers: { 'x-okapi-tenant': 'tnx' },
      records: C.API_RESULT_JSON_KEY.LOGICAL_VIEW,
      GET: {
        params: { lang: 'ita' },
      },
    },
  });

  render() {
    const { resources: { views } } = this.props;
    const logicalViews = views.records;
    return (
      <Pane defaultWidth="fill" fluidContentWidth paneTitle={this.props.label}>
        <div>
          <CatalogingSelect options={logicalViews} label="Database" />
        </div>
      </Pane>
    );
  }
}
