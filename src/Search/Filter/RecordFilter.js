import * as React from 'react';
import FilterGroup from './FilterGroup';

export default function SuppressedFilter(props) {
  return (
    <FilterGroup
      searchType="packages"
      availableFilters={[{
        name: 'recordFilter',
        label: 'Record Type',
        defaultValue: '0',
        options: [
          { label: 'Bibliographic records', value: '0' },
          { label: 'Authority records', value: '1' }
        ]
      }]}
      {...props}
    />
  );
}
