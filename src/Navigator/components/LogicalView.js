/**
 * @format
 * @flow
 */
import React from 'react';
import { Field } from 'redux-form';
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

  constructor(props:LogicalViewProps) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange = e => {
    this.props.mutator.selectedView.replace(e.target.value);
  };

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
            onChange={this.onChange}
          />
        )}
      </div>
    );
  }
}

export default connect(LogicalView, C.META.MODULE_NAME);
