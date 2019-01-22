
/**
 * @format
 * @flow
 */
import React from 'react';
import { Field } from 'redux-form';
import { Select } from '@folio/stripes/components';
import { ActionTypes } from '../../../redux/actions';

export default function SearchIndexes({ ...props }) {
  const { rest, name, id } = props;
  const options = [
    { label: 'Title', value: 'TITLE', sortBy: 4 },
    { label: 'Name: All', value: 'NAME', sortBy: 2096 },
    { label: 'ISBN', value: 'ISBN' },
    { label: 'ISSN', value: 'ISSN' },
    { label: 'Local id.Number (001)', value: 'NUMID', sortBy: 54 },
    { label: 'Id.Number (035)', value: 'OTHID', sortBy: 54 },
    { label: 'All MARC fields', value: 'ALL' },
    { label: '________________________________', value: 'ALL', disabled: true },
    { label: 'Title series', value: 'TITSER', sortBy: 4 },
    { label: 'Name: Personal', value: 'NAMEP', sortBy: 2096 },
    { label: 'Name: Corporate', value: 'NAMEC', sortBy: 2096 },
    { label: 'Name: Meeting', value: 'NAMEM', sortBy: 2096 },
    { label: 'Name/Title for Name', value: 'NAMETN', sortBy: 2096 },
    { label: 'Name/Title for Title', value: 'NAMETT', sortBy: 2096 },
    { label: 'Subject: All', value: 'SUB', sortBy: 21 },
    { label: 'Subject: Personal', value: 'SUBP', sortBy: 21 },
    { label: 'Subject: Corporate', value: 'SUBC', sortBy: 21 },
    { label: 'Subject: Meeting', value: 'SUBM', sortBy: 21 },
    { label: 'Subject: Preferred title', value: 'SUBUT', sortBy: 21 },
    { label: 'Subject: Named Event', value: 'SUBNE', sortBy: 21 },
    { label: 'Subject: Chronological Term', value: 'SUBCT', sortBy: 21 },
    { label: 'Subject: Topical Term', value: 'SUBTT', sortBy: 21 },
    { label: 'Subject: Geographic Name', value: 'SUBGN', sortBy: 21 },
    { label: 'Subject: Uncontrolled', value: 'SUBU', sortBy: 21 },
    { label: 'Subject: Faceted Topical Terms', value: 'SUBFTT', sortBy: 21 },
    { label: 'Subject: Genre/Form', value: 'SUBGF', sortBy: 21 },
    { label: 'Subject: Occupation', value: 'SUBO', sortBy: 21 },
    { label: 'Subject: Function', value: 'SUBF', sortBy: 21 },
    { label: 'Subject: Curriculum Objective', value: 'SUBCO', sortBy: 21 },
    { label: 'Subject: Hierarchical Place Name', value: 'SUBHPN', sortBy: 21 },
    { label: 'Subject: Local', value: 'SUBL', sortBy: 21 },
    { label: 'Publisher Name', value: 'PN', sortBy: 2096 },
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

  const onChange = event => {
    const { dispatch } = props;
    const index = event.target.options.selectedIndex - 1;
    const sortType = options[index].sortBy;
    dispatch({ type: ActionTypes.SETTINGS, data: { sortType } });
  };

  return (
    <Field
      id={id}
      name={name}
      placeholder="Select a index..."
      component={Select}
      dataOptions={options}
      onChange={(event) => onChange(event)}
      {...rest}
    />
  );
}
