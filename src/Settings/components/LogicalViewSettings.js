import React from 'react';
import Pane from '@folio/stripes-components/lib/Pane';
import Icon from '@folio/stripes-components/lib/Icon';
import * as C from '../../Utils';
import { MARCcatSelect } from '../../Common';

class LogicalView extends React.Component{
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
            <MARCcatSelect
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
