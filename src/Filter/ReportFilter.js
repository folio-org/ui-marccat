import * as React from 'react';

import FilterGroup from './FilterGroup';
import { LANGUAGES } from '../Utils/Constant';

export default function ReportFilters(props) {
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
      },
      {
        name: 'language',
        label: 'Language',
        defaultValue: 'eng',
        options: LANGUAGES
      }
      ]}
      {...props}
    />
  );
}
