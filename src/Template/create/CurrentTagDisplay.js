/**
 * @format
 * @flow
 */
import * as React from 'react';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';

type Props = {
  currentTag: Object;
};

export default function CurrentTagDisplay({ ...props }:Props) {
  const currentTag = [];
  currentTag.push(props.currentTag);// ?
  return (
    <MultiColumnList
      contentData={currentTag}
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
