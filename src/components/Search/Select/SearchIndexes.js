
/**
 * @format
 * @flow
 */
import React from 'react';
import { Field } from 'redux-form';
import Selection from '@folio/stripes-components/lib/Selection';

export default function SearchIndexes() {
  const options = [
    { label: 'All MARC fields', value: 'AW' },
    { label: 'Multiple MARC fields [XXX]', value: 'AW' },
    { label: 'ISBN', value: 'BN' },
    { label: 'ISSN', value: 'SN' },
    { label: 'Keyword', value: 'AW' },
    { label: 'Local Number', value: 'AN' },
    { label: 'Name', value: 'NA' },
    { label: 'Publisher', value: 'PU' },
    { label: 'Self location', value: 'LL' },
    { label: 'Subject', value: 'SU' },
    { label: 'Title', value: 'TI' }
  ];
  return (
    <Field
      name="selectIndexes"
      id="selectIndexes"
      placeholder="Select a field..."
      component={Selection}
      dataOptions={options}
    />
  );
}
