
// @flow
import * as React from 'react';
import { Field } from 'redux-form';
import { Select } from '@folio/stripes/components';
import { ACTION } from '../../../redux/actions';
import { SORT_TYPE, FILTER_NAME } from '../../../config/constants';

export default ({ ...props }) => {
  const { rest, name, id } = props;
  const options = [
    { label: 'Title', value: 'TITLE', sortBy: SORT_TYPE.TITLE },
    { label: 'Name: All', value: 'NAME', sortBy: SORT_TYPE.NAME },
    { label: 'ISBN', value: 'ISBN' },
    { label: 'ISSN', value: 'ISSN' },
    { label: 'Local id.Number (001)', value: 'NUMID', sortBy: SORT_TYPE.AN },
    { label: 'Id.Number (035)', value: 'OTHID', sortBy: SORT_TYPE.AN },
    { label: 'All MARC fields', value: 'ALL' },
    { label: '________________________________', value: 'ALL', disabled: true },
    { label: 'Title series', value: 'TITSER', sortBy: SORT_TYPE.TITLE },
    { label: 'Name: Personal', value: 'NAMEP', sortBy: SORT_TYPE.NAME },
    { label: 'Name: Corporate', value: 'NAMEC', sortBy: SORT_TYPE.NAME },
    { label: 'Name: Meeting', value: 'NAMEM', sortBy: SORT_TYPE.NAME },
    { label: 'Name/Title for Name', value: 'NAMETN', sortBy: SORT_TYPE.NAME },
    { label: 'Name/Title for Title', value: 'NAMETT', sortBy: SORT_TYPE.NAME },
    { label: 'Subject: All', value: 'SUB', sortBy: SORT_TYPE.SUBJECT },
    { label: 'Subject: Personal', value: 'SUBP', sortBy: SORT_TYPE.SUBJECT },
    { label: 'Subject: Corporate', value: 'SUBC', sortBy: SORT_TYPE.SUBJECT },
    { label: 'Subject: Meeting', value: 'SUBM', sortBy: SORT_TYPE.SUBJECT },
    { label: 'Subject: Preferred title', value: 'SUBUT', sortBy: SORT_TYPE.SUBJECT },
    { label: 'Subject: Named Event', value: 'SUBNE', sortBy: SORT_TYPE.SUBJECT },
    { label: 'Subject: Chronological Term', value: 'SUBCT', sortBy: SORT_TYPE.SUBJECT },
    { label: 'Subject: Topical Term', value: 'SUBTT', sortBy: SORT_TYPE.SUBJECT },
    { label: 'Subject: Geographic Name', value: 'SUBGN', sortBy: SORT_TYPE.SUBJECT },
    { label: 'Subject: Uncontrolled', value: 'SUBU', sortBy: SORT_TYPE.SUBJECT },
    { label: 'Subject: Faceted Topical Terms', value: 'SUBFTT', sortBy: SORT_TYPE.SUBJECT },
    { label: 'Subject: Genre/Form', value: 'SUBGF', sortBy: SORT_TYPE.SUBJECT },
    { label: 'Subject: Occupation', value: 'SUBO', sortBy: SORT_TYPE.SUBJECT },
    { label: 'Subject: Function', value: 'SUBF', sortBy: SORT_TYPE.SUBJECT },
    { label: 'Subject: Curriculum Objective', value: 'SUBCO', sortBy: SORT_TYPE.SUBJECT },
    { label: 'Subject: Hierarchical Place Name', value: 'SUBHPN', sortBy: SORT_TYPE.SUBJECT },
    { label: 'Subject: Local', value: 'SUBL', sortBy: SORT_TYPE.SUBJECT },
    { label: 'Publisher Name', value: 'PU' },
    { label: 'Publisher Place', value: 'PP' },
    { label: 'Publisher Keyword', value: 'PW' },
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

  const disableSortOnAuthority = (sortType) => {
    const { store: { getState } } = props;
    const filter = getState().marccat.filter.filters;
    const sortAuth = (sortType === SORT_TYPE.UNIFORM_TITLE || sortType === SORT_TYPE.DATA1 || sortType === SORT_TYPE.DATE2);
    if (sortAuth) filter[FILTER_NAME.AUTHORITY] = false;
  };

  const setSortStrategy = event => {
    const { dispatch } = props;
    const index = event.target.options.selectedIndex - 1;
    const sortType = options[index].sortBy;
    disableSortOnAuthority(sortType);
    dispatch({ type: ACTION.SETTINGS, data: { sortType } });
  };

  return (
    <Field
      id={id}
      name={name}
      placeholder="Select a index..."
      component={Select}
      dataOptions={options}
      marginBottom0
      onChange={(event) => {
        setSortStrategy(event);
      }}
      {...rest}
    />
  );
};
