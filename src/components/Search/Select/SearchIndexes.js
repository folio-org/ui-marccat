
/**
 * @format
 * @flow
 */
import React from 'react';
import { Field } from 'redux-form';
import { Select } from '@folio/stripes/components';

export default function SearchIndexes({ ...props }) {
  const { rest } = props;
  const options = [
    { label: 'Title', value: 'TITLE' },
    { label: 'Name', value: 'NAME' },
    { label: 'ISBN', value: 'ISBN' },
    { label: 'ISSN', value: 'ISSN' },
    { label: 'Local id.Number (001)', value: 'NUMID' },
    { label: 'Id.Number (035)', value: 'ALL' },
    { label: 'All MARC fields', value: 'ALL' },
    { label: '___________________', value: 'ALL', disabled: true },
    { label: 'Multiple MARC fields [XXX]', value: 'MULTI' },
    { label: 'Keyword', value: 'KEY' },
    { label: 'Publisher', value: 'PUB' },
    { label: 'Self location', value: 'LOC' },
    { label: 'Subject', value: 'SUB' },
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
      {...rest}
    />
  );
}
