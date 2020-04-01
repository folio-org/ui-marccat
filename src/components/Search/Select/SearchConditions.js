
// @flow
import * as React from 'react';
import { Field } from 'redux-form';
import { Select } from '@folio/stripes/components';

export default ({ ...props }) => {
  const { rest, name, id, store } = props;
  const options = [
    { label: 'Browse', value: 'BROWSE' },
    { label: 'Begins with', value: 'START' },
    { label: 'Contains', value: 'CONTAINS' },
    { label: 'Exact match', value: 'MATCH' }
  ];
  const optionsAllPubKey = [
    { label: 'Contains', value: 'CONTAINS' },
    { label: 'Exact match', value: 'MATCH' }
  ];

  const onlyBrowseOption = [
    { label: 'Browse', value: 'BROWSE' }
  ];

  const remappedOptions = [];
  if (store.getState().form.searchForm && store.getState().form.searchForm.values) {
    const selectedIndex = store.getState().form.searchForm.values.selectIndexes;
    if (selectedIndex === 'PW' || selectedIndex === 'ALL') {
      remappedOptions.push(optionsAllPubKey);
    } else if (
      !(selectedIndex === 'TITLE' ||
        selectedIndex === 'NAME' ||
        selectedIndex === 'SUB' ||
        selectedIndex === 'PP' ||
        selectedIndex === 'PU' ||
        selectedIndex === 'NAMEC' ||
        selectedIndex === 'NAMEM' ||
        selectedIndex === 'NAMETN' ||
        selectedIndex === 'NAMETT' ||
        selectedIndex === 'NAMEP')) {
      options.map(x => (x.value === 'BROWSE' ? options.splice(x, 1) : null));
      remappedOptions.push(options);
    } else if (selectedIndex === 'NAMETN' ||
    selectedIndex === 'NAMETT') {
      remappedOptions.push(onlyBrowseOption);
    }
  }


  return (
    <Field
      name={name}
      id={id}
      placeholder="Select condition..."
      component={Select}
      marginBottom0
      dataOptions={(remappedOptions.length > 0) ? remappedOptions[0] : options}
      {...rest}
    />
  );
};
