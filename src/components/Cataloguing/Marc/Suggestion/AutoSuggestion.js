// @flow
import * as React from 'react';
import { AutoSuggest } from '@folio/stripes/components';
import { triggerTagCodeSuggestion } from '../../Actions';
import { injectProps } from '../../../../shared';

function AutoSuggestion({ ...props }) {
  const initialState = {
    tagCodeArray: []
  };
  const [state, setState] = React.useState(initialState);

  const onChange = (code) => {
    const { tagCodeArray } = state;
    const { store } = props;
    if (code && code !== '') {
      const cb = (payload) => setState({ tagCodeArray: payload.tags });
      store.dispatch(triggerTagCodeSuggestion(code, cb));
    }
    return tagCodeArray;
  };

  const { tagCodeArray } = state;
  const { input } = props;
  const remappedCodeSuggest = [];
  tagCodeArray.map(elem => remappedCodeSuggest.push(Object.assign({}, { value: elem, label: elem })));
  return (
    <AutoSuggest
      {...props}
      items={remappedCodeSuggest}
      name={input.name}
      onChange={(code) => onChange(code)}
      renderOption={item => (item ? item.label : '')}
      renderValue={item => (item ? item.label : '')}
      valueKey="value"
    />
  );
}

export default injectProps(AutoSuggestion);
