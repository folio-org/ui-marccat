import * as React from 'react';

import FilterGroup from './FilterGroup';
import { LANGUAGES } from '../../Utils/Constant';

export default function ReportFilters(props) {
  return (
    <FilterGroup
      searchType="packages"
      availableFilters={[{
        name: 'searchOptions',
        label: 'Search',
        defaultValue: '0',
        options: [
          { label: 'All MARC fields', value: '0' },
          { label: 'Multiple MARC fields [XXX]', value: '1' },
          { label: 'ISBN', value: 'relevance' },
          { label: 'ISSN', value: 'name' },
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
