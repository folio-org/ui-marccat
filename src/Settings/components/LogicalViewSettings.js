import React from 'react';
import PropTypes from 'prop-types';
import Pane from '@folio/stripes-components/lib/Pane';
import Icon from '@folio/stripes-components/lib/Icon';
import * as C from '../../Utils';
import { CatalogingSelect } from '../../Common';

type LogicalViewProps = {|
  resources: Object,
  label: PropTypes.string.isRequired,
|};
type LogicalViewState = {|
  label: PropTypes.string.isRequired,
|};
class LogicalView extends React.Component<
  LogicalViewProps,
  LogicalViewState
> {
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
    const {
      resources: { views },
    } = this.props;
    if (!views || !views.hasLoaded) return <div />;
    const logicalViews = views.records;
    return (
      <Pane
        defaultWidth="fill"
        fluidContentWidth
        paneTitle={this.props.label}
      >
        <div>
          {!logicalViews && (
            <Icon icon="spinner-ellipsis" />
          )}
          {logicalViews.length > 0 && (
            <CatalogingSelect
              options={logicalViews}
              label="Database"
            />
          )}
        </div>
      </Pane>
    );
  }
}

export default LogicalView;
