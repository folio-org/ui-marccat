import * as React from 'react';
import FilterGroup from './FilterGroup';

export default function SuppressedFilter(props) {
  return (
    <FilterGroup
      searchType="packages"
      availableFilters={[{
        name: 'suppressedFilter',
        label: 'Suppressed',
        defaultValue: '0',
        options: [
          { label: 'Yes', value: '0' },
          { label: 'No', value: '1' },
        ]
      }]}
      {...props}
    />
  );
}
