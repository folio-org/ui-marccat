import React from 'react';
import { AutoSuggest } from '@folio/stripes/components';
import tags from './mock';

export default function AutoSuggestion({ ...props }) {
  const onChange = () => {
  //  const { dispatach } = props;
  //  dispatach(autosuggestionAction())
  };
  
  return (
    <AutoSuggest
      items={tags}
      onChange={() => onChange()}
      renderOption={item => item.label}
      renderValue={item => item.label}
      label=""
    />);
}
