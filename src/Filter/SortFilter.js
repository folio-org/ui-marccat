import * as React from 'react';

import FilterGroup from './FilterGroup';

export default function TemplateFilters(props) {
  return (
    <FilterGroup
      searchType="packages"
      availableFilters={[{
        name: 'sort',
        label: 'Sort options',
        defaultValue: 'relevance',
        options: [
          { label: 'relevance', value: 'relevance' },
          { label: 'name', value: 'name' },
          { label: 'relevance', value: 'relevance' },
          { label: 'name', value: 'name' },
          { label: 'relevance', value: 'relevance' },
          { label: 'name', value: 'name' }
        ]
      }]}
      {...props}
    />
  );
}
