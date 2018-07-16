import React from 'react';
import Pane from '@folio/stripes-components/lib/Pane';
import Select from '@folio/stripes-components/lib/Select';
import Icon from '@folio/stripes-components/lib/Icon';
import * as C from '../../Utils';

type LogicalViewProps = {
  label: string,
};
type LogicalViewState = {};
class LogicalView extends React.Component<LogicalViewProps, LogicalViewState> {
  static manifest = Object.freeze({
    views: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: C.ENDPOINT.LOGICAL_VIEW_URL,
      headers: { 'x-okapi-tenant': 'tnx' },
      records: C.API_RESULT_JSON_KEY.LOGICAL_VIEW,
      GET: {
        params: { lang: C.ENDPOINT.DEFAULT_LANG },
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
            <Select
              id="logical_view"
              dataOptions={logicalViews}
              label="Database"
            />
          )}
        </div>
      </Pane>
    );
  }
}

export default LogicalView;
