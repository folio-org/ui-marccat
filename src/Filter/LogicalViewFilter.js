/**
 * @format
 * @flow
 */
import * as React from 'react';
import Icon from '@folio/stripes-components/lib/Icon';
import FilterGroup from './FilterGroup';
import { LANGUAGES } from '../Utils/Constant';

type LogicalViewProps = {
  resources: Object;
};

export default function LogicalViewFilter(props: LogicalViewProps) {
  const { resources: { views } } = props;
  if (!views || !views.hasLoaded) return <Icon icon="spinner-ellipsis" />;
  const logicalViews = views.records;
  return (
    <FilterGroup
      searchType="logicalView"
      availableFilters={[{
        name: 'database',
        label: 'Database',
        defaultValue: '-1',
        options: logicalViews
      }]}
      {...props}
    />
  );
}
