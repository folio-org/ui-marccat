import * as React from 'react';
import FilterGroup from './FilterGroup';

export default function LanguageFilter(props) {
  return (
    <FilterGroup
      searchType="packages"
      availableFilters={[{
        name: 'languageFilter',
        label: 'Language',
        defaultValue: '0',
        options: [
          { label: 'English', value: '0' },
          { label: 'Italian', value: '1' },
          { label: 'Spanish', value: '2' },
          { label: 'French', value: '3' },
          { label: 'Hungarian', value: '4' },
          { label: 'Chinese, simplified', value: '5' },
          { label: 'Arabic', value: '6' }
        ]
      }]}
      {...props}
    />
  );
}
