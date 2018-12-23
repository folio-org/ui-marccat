
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
    { label: 'Name: All', value: 'NAME' },
    { label: 'ISBN', value: 'ISBN' },
    { label: 'ISSN', value: 'ISSN' },
    { label: 'Local id.Number (001)', value: 'NUMID' },
    { label: 'Id.Number (035)', value: 'OTHID' },
    { label: 'All MARC fields', value: 'ALL' },
    { label: '________________________________', value: 'ALL', disabled: true },
    { label: 'Title series', value: 'TITSER' },
    { label: 'Name: Personal', value: 'NAMEP' },
    { label: 'Name: Corporate', value: 'NAMEC' },
    { label: 'Name: Meeting', value: 'NAMEM' },
    { label: 'Name/Title for Name', value: 'NAMETN' },
    { label: 'Name/Title for Title', value: 'NAMETT' },
    { label: 'Subject: All', value: 'SUB' },
    { label: 'Subject: Personal', value: 'SUBP' },
    { label: 'Subject: Corporate', value: 'SUBC' },
    { label: 'Subject: Meeting', value: 'SUBM' },
    { label: 'Subject: Uniform Title', value: 'SUBUT' },
    { label: 'Subject: Named Event', value: 'SUBNE' },
    { label: 'Subject: Chronological Term', value: 'SUBCT' },
    { label: 'Subject: Topical Term', value: 'SUBTT' },
    { label: 'Subject: Geographic Name', value: 'SUBGN' },
    { label: 'Subject: Uncontrolled', value: 'SUBU' },
    { label: 'Subject: Faceted Topical Terms', value: 'SUBFTT' },
    { label: 'Subject: Genre/Form', value: 'SUBGF' },
    { label: 'Subject: Occupation', value: 'SUBO' },
    { label: 'Subject: Function', value: 'SUBF' },
    { label: 'Subject: Curriculum Objective', value: 'SUBCO' },
    { label: 'Subject: Hierarchical Place Name', value: 'SUBHPN' },
    { label: 'Subject: Local', value: 'SUBL' },
    { label: 'Publisher Name', value: 'PN' },
    { label: 'Publisher Place', value: 'PP' },
    { label: 'Other Class. (Canada)', value: 'CC' },
    { label: 'Other Classification', value: 'OC' },
    { label: 'NLC Classed Catalogue', value: 'ZC' },
    { label: 'NAL Subject Category', value: 'SC' },
    { label: 'Dewey Classification', value: 'DC' },
    { label: 'LC Classification', value: 'LC' },
    { label: 'NLM Classification', value: 'MC' },
    { label: 'Local Classification', value: 'LX' },
    { label: 'Other Classification Number', value: 'CH' },
    { label: 'Universal Decimal', value: 'UC' },
    { label: 'CODEN designation', value: 'CD' },
    { label: 'ISMN', value: 'MN' },
    { label: 'LC control No.', value: 'LN' },
    { label: 'Music Publisher No.', value: 'MUSP' },
    { label: 'Other Control No.', value: 'NN' },
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
