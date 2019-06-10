// @flow
import * as React from 'react';
import { AutoSuggest, HotKeys } from '@folio/stripes/components';
import { triggerBrowseHeadingSuggestion } from '../../Actions';
import { injectProps } from '../../../../shared';
import { REDUX } from '../../../../config/constants';

function AutoSuggestHeadings(props) {
  const initialState = {
    suggestArray: []
  };

  const [state, setState] = React.useState(initialState);

  const onShowHeadings = () => {
    const { suggestArray } = state;
    const { dispatch, change, input, store } = props;
    const code = store.getState().form.variableFieldForm.values.items[0].variableField.code;
    const ind1 = store.getState().form.variableFieldForm.values.items[0].variableField.ind1;
    const ind2 = store.getState().form.variableFieldForm.values.items[0].variableField.ind2;
    const displayValue = store.getState().form.variableFieldForm.values.items[0].variableField.displayValue;
    const cb = (payload) => setState({ suggestArray: payload.headings });
    dispatch(triggerBrowseHeadingSuggestion(code, ind1, ind2, displayValue, cb));
    dispatch(change(REDUX.FORM.VARIABLE_FORM, input.name, displayValue));
    return suggestArray;
  };

  const keys = {
    'showHeadings' : ['ctrl+space'],
  };

  const handlers = {
    'showHeadings': onShowHeadings
  };

  const { suggestArray } = state;
  const { input } = props;
  const remappedSuggestArray = [];
  suggestArray.map(elem => remappedSuggestArray.push(Object.assign({}, { value: elem.stringText, label: elem.stringText })));
  return (
    <HotKeys
      keyMap={keys}
      handlers={handlers}
    >
      <AutoSuggest
        {...props}
        items={remappedSuggestArray}
        name={input.name}
        onShowHeadings={onShowHeadings}
        renderOption={(item) => ((item) ? item.value : '')}
        renderValue={(item) => ((item) ? item.value : '')}
        valueKey="value"
      />
    </HotKeys>
  );
}

export default injectProps(AutoSuggestHeadings);
