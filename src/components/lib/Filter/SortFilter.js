import * as React from 'react';
import FilterGroup from './FilterGroup';
import type { Props } from '../../Core';

type P = Props & {};

export default function SortFilters({ ...props }:P) {
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
