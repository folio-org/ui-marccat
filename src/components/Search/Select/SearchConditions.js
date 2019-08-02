
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

  const remappedOptions = [];
  if (store.getState().form.searchForm && store.getState().form.searchForm.values) {
    const selectedIndex = store.getState().form.searchForm.values.selectIndexes;
    if (selectedIndex === 'PW' || selectedIndex === 'ALL') {
      options.map(x => (x.value === 'START' ? x.disabled = true : null));
      remappedOptions.push(options);
    } else if (!(selectedIndex === 'TITLE' || selectedIndex === 'NAME' || selectedIndex === 'SUB')) {
      options.map(x => (x.value === 'CONTAINS' ? x.disabled = true : null));
      remappedOptions.push(options);
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
