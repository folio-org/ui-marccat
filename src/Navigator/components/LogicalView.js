/**
 * @format
 * @flow
 */
import * as React from 'react';
import Select from '@folio/stripes-components/lib/Select';
import Icon from '@folio/stripes-components/lib/Icon';
import { connect } from '@folio/stripes-connect';
import * as C from '../../Utils';

type LogicalViewProps = {
  label: string;
  resources: Object;
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
    const { label, resources: { views } } = this.props;
    if (!views || !views.hasLoaded) return <Icon icon="spinner-ellipsis" />;
    const logicalViews = views.records;
    return (
      <div>
        {logicalViews.length > 0 && (
          <Select
            id="logical_view"
            dataOptions={logicalViews}
            label={label}
          />
        )}
      </div>
    );
  }
}

export default connect(LogicalView, C.META.MODULE_NAME);
