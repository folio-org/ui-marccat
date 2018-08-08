/**
 * @format
 * @flow
 */
import React from 'react';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';

type Props = {
  currentTag: Object;
};

export default function CurrentTagDisplay({ ...props }:Props) {
  const columnMapping = {
    code: '',
    description: '',
    ind1: '',
    ind2: '',
    displayValue: ''
  };
  const currentTag = [];
  currentTag.push(props.currentTag);

  return (
    <MultiColumnList
      contentData={currentTag}
      columnMapping={columnMapping}
      visibleColumns={[
        'code',
        'description',
        'ind1',
        'ind2',
        'displayValue',
      ]}
      columnWidths={{ code: '10%', description: '40%', ind1: '5%', ind2: '5%', displayValue: '40%' }}
    />
  );
}
