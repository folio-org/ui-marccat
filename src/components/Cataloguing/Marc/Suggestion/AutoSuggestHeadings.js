// @flow
import * as React from 'react';
import { AutoSuggest, HotKeys } from '@folio/stripes/components';
import { injectProps } from '../../../../shared';
import { triggerBrowseHeadingSuggestion, triggerTagIndicatorsSuggestion } from '../../Actions';
import { REDUX } from '../../../../config/constants';
import { replaceAllWithEmptyString } from '../../Utils/MarcApiUtils';

function AutoSuggestHeadings(props) {
  const initialState = {
    suggestArray: []
  };

  const [state, setState] = React.useState(initialState);

  const onShowHeadings = () => {
    const { dispatch, store, change } = props;
    const code = store.getState().form.variableFieldForm.values.items[0].variableField.code;
    const ind1 = store.getState().form.variableFieldForm.values.items[0].variableField.ind1;
    const ind2 = store.getState().form.variableFieldForm.values.items[0].variableField.ind2;
    const displayValue = store.getState().form.variableFieldForm.values.items[0].variableField.displayValue;
    const stringText = replaceAllWithEmptyString(store.getState().form.variableFieldForm.values.items[0].variableField.displayValue);
    const cb = (payload) => setState({ suggestArray: payload.headings });
    dispatch(triggerBrowseHeadingSuggestion(code, ind1, ind2, stringText, cb));
    dispatch(change(REDUX.FORM.VARIABLE_FORM, props.input.name, displayValue));
    return state.suggestArray;
  };

  const onChange = (event) => {
    const { dispatch, store, change } = props;
    if (event && event === '$') {
      const cb = (payload) => setState({ suggestArray: payload.subfields });
      const code = store.getState().form.variableFieldForm.values.items[0].variableField.code;
      dispatch(triggerTagIndicatorsSuggestion(code, cb));
    }
    dispatch(change(REDUX.FORM.VARIABLE_FORM, props.input.name, event));
    state.suggestArray = [];
    return state.suggestArray;
  };

  const keys = {
    'showHeadings' : ['ctrl+alt'],
  };

  const handlers = {
    'showHeadings': onShowHeadings
  };

  const { input } = props;
  const remappedSuggestArray = [];
  if (state.suggestArray && state.suggestArray.length > 0) {
    if (state.suggestArray.length > 7) {
      state.suggestArray.split('').map(elem => remappedSuggestArray.push(Object.assign({}, { value: '$' + elem, label: '$' + elem })));
    } else {
      state.suggestArray.map(elem => remappedSuggestArray.push(Object.assign({}, { value: elem.stringText, label: elem.stringText })));
    }
  }
  return (
    <HotKeys
      keyMap={keys}
      handlers={handlers}
    >
      <AutoSuggest
        {...props}
        items={remappedSuggestArray}
        onChange={onChange}
        name={input.name}
        renderOption={(item) => ((item) ? item.value : '')}
        renderValue={(item) => ((item) ? item.value : '')}
        includeItem={(item, searchString) => item.value.includes(searchString)}
        valueKey="value"
      />
    </HotKeys>
  );
}

export default injectProps(AutoSuggestHeadings);
