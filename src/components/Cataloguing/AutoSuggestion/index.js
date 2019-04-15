import React from 'react';
import { range } from 'lodash';
import { AutoSuggest } from '@folio/stripes/components';


export default function AutoSuggestion() {
  const onChange = () => {
  //  const { dispatach } = props;
  //  dispatach(autosuggestionAction())
  };

  const tags = range(900, 1000, 1);
  return (
    <AutoSuggest
      items={tags}
      onChange={() => onChange()}
      renderOption={item => item}
      renderValue={item => item}
      label="Enter type"
    />);
}
