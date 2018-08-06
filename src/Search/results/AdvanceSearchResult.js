import React from 'react';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';

type Props = {
    results: Array<Object>;
    loading: boolean;
};

export default function AdvanceSearchResult({
  results,
  loading
}: Props) {
  return (
    <MultiColumnList
      id="search-results"
      contentData={{}}
      visibleColumns={[
        'id',
        'amicusNumber',
        'title',
        'name',
        'date',
        'date2',
        'edition',
        'serie',
        'volume',
      ]}
      striped
    />
  );
}
