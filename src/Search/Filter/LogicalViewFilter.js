/**
 * @format
 * @flow
 */
import * as React from 'react';
import Icon from '@folio/stripes-components/lib/Icon';
import FilterGroup from './FilterGroup';
import { LogicalView } from '../../DB';

type LogicalViewProps = {
  resources: Object;
};

export default function LogicalViewFilter(props: LogicalViewProps) {
  const { resources: { views = <LogicalView /> } } = props;
  if (!views || !views.hasLoaded) return <Icon icon="spinner-ellipsis" />;
  return (
    <FilterGroup
      searchType="logicalView"
      availableFilters={[{
        name: 'logicalViewFilter',
        label: 'LogicalView',
        defaultValue: '-1',
        options: views
      }]}
      {...props}
    />
  );
}
