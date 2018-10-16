import * as React from 'react';
import FilterGroup from './FilterGroup';

export default function FormatTypeFilter(props) {
  return (
    <FilterGroup
      searchType="packages"
      availableFilters={[{
        name: 'formatTypeFilter',
        label: 'Format type',
        defaultValue: '0',
        options: [
          { label: 'Audio recording', value: '0' },
          { label: 'Book', value: '1' },
          { label: 'Map', value: '2' },
          { label: 'Monograph', value: '3' },
          { label: 'Serial', value: '4' },
          { label: 'Video', value: '5' }
        ]
      }]}
      {...props}
    />
  );
}
