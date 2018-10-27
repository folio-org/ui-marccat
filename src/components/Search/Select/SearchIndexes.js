
/**
 * @format
 * @flow
 */
import React from 'react';
import { Field } from 'redux-form';
import Select from '@folio/stripes-components/lib/Select';

export default function SearchIndexes() {
  const options = [
    { label: 'All MARC fields', value: 'ALL' },
    { label: 'Multiple MARC fields [XXX]', value: 'MULTI' },
    { label: 'ISBN', value: 'ISBN' },
    { label: 'ISSN', value: 'ISSN' },
    { label: 'Keyword', value: 'KEY' },
    { label: 'Local Number (ID)', value: 'NUMID' },
    { label: 'Name', value: 'NAME' },
    { label: 'Publisher', value: 'PUB' },
    { label: 'Self location', value: 'LOC' },
    { label: 'Subject', value: 'SUB' },
    { label: 'Title', value: 'TITLE' },
    { label: 'Local Number (barcode)', value: 'BARCODE' },
    { label: 'Local Number (copyId)', value: 'COPY' },
  ];

  return (
    <Field
      name="selectIndexes"
      id="selectIndexes"
      placeholder="Select a field..."
      component={Select}
      dataOptions={options}
    />
  );
}
