// @flow
import * as React from 'react';
import { AutoSuggest } from '@folio/stripes/components';
import { triggerTagIndicatorsSuggestion, triggerTagCodeSuggestion } from '../../Actions';
import { injectProps } from '../../../../shared';
import { REDUX } from '../../../../config/constants';

function AutoSuggestion(props) {
  const initialState = {
    tagCodeArray: []
  };
  const [state, setState] = React.useState(initialState);

  const onFocus = (e) => {
    e.preventDefault();
    const { tagCodeArray } = state;
    const { dispatch, input } = props;
    if (e.target.form[1].defaultValue.length === 3) {
      const tagCode = e.target.form[1].defaultValue;
      if (input.name === 'items[0].variableField.ind1') {
        const cb = (payload) => setState({ tagCodeArray:  payload.ind1 });
        dispatch(triggerTagIndicatorsSuggestion(tagCode, cb));
      } else if (input.name === 'items[0].variableField.ind2') {
        const cb = (payload) => setState({ tagCodeArray: payload.ind2 });
        dispatch(triggerTagIndicatorsSuggestion(tagCode, cb));
      }
    }
    return tagCodeArray;
  };

  const onChange = (digit) => {
    const { dispatch, change, input } = props;
    if (input.name === 'items[0].variableField.code' && digit && digit !== '') {
      const cb = (payload) => setState({ tagCodeArray: payload.tags });
      dispatch(triggerTagCodeSuggestion((digit.length > 3) ? digit.trim() : digit, cb));
      dispatch(change(REDUX.FORM.VARIABLE_FORM, input.name, (digit.length > 3) ? digit.trim() : digit));
    } else if (input.name === 'items[0].variableField.ind1' || input.name === 'items[0].variableField.ind2') { dispatch(change(REDUX.FORM.VARIABLE_FORM, input.name, (digit && digit.length > 1) ? digit.trim() : digit)); }
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
      onFocus={onFocus}
      onChange={onChange}
      renderOption={(item) => ((item) ? item.value : ' ')}
      renderValue={(item) => ((item) ? item.value : ' ')}
      valueKey="value"
    />
  );
}

export default injectProps(AutoSuggestion);
