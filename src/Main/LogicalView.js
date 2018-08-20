/**
 * @format
 * @flow
 */
import * as React from 'react';
import FilterGroups from '@folio/stripes-components/lib/FilterGroups';
import Icon from '@folio/stripes-components/lib/Icon';
import { filterConfigFn } from '../Utils/Constant';

type LogicalViewProps = {
  resources: Object;
};

export default class LogicalView extends React.Component<LogicalViewProps, { filters: Object }> {
  constructor(props:LogicalViewProps) {
    super(props);
    this.state = {
      filters: {},
    };
  }

  onChangeFilter(e: React.SyntheticEvent<any>) {
    const filters = Object.assign({}, this.state.filters);
    filters[e.target.name] = e.target.checked;
    this.setState({
      filters: filterConfigFn('Database', this.props.resources.views.records)
    });
  }

  render() {
    const { resources: { views } } = this.props;
    if (!views || !views.hasLoaded) return <Icon icon="spinner-ellipsis" />;
    const logicalViews = views.records;
    return (
      <FilterGroups onChangeFilter={this.onChangeFilter} config={filterConfigFn('Database', logicalViews)} filters={this.state.filters} />
    );
  }
}
