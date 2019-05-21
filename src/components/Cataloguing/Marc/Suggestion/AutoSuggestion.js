// @flow
import * as React from 'react';
import { AutoSuggest } from '@folio/stripes/components';
import { triggerTagCodeSuggestion } from '../../Actions';
import { injectProps } from '../../../../shared';

function AutoSuggestion(props) {
  const initialState = {
    tagCodeArray: []
  };
  const [state, setState] = React.useState(initialState);

  const onChange = (code) => {
    const { tagCodeArray } = state;
    const { dispatch } = props;
    if (code !== '') {
      const cb = (payload) => setState({ tagCodeArray: payload.tags });
      dispatch(triggerTagCodeSuggestion(code, cb));
    }
    return tagCodeArray;
  };

  const { tagCodeArray } = state;
  const remappedCodeSuggest = [];
  tagCodeArray.map(elem => remappedCodeSuggest.push(Object.assign({}, { value: elem, label: elem })));
  return (
    <AutoSuggest
      {...props}
      items={remappedCodeSuggest}
      onChange={onChange}
      renderOption={item => item.label}
      renderValue={item => item.label}
    />
  );
}

export default injectProps(AutoSuggestion);
