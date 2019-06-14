// @flow
import * as React from 'react';
import { AutoSuggest } from '@folio/stripes/components';
import { triggerTagIndicatorsSuggestion } from '../../Actions';
import { injectProps } from '../../../../shared';
import { REDUX } from '../../../../config/constants';

function AutoSuggestIndicators(props) {
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

  const onChange = (indicator) => {
    const { dispatch, change, input } = props;
    dispatch(change(REDUX.FORM.VARIABLE_FORM, input.name, indicator));
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
      renderOption={(item) => ((item) ? item.value : '')}
      renderValue={(item) => ((item) ? item.value : '')}
      valueKey="value"
    />
  );
}

export default injectProps(AutoSuggestIndicators);
