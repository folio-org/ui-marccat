// @flow
import * as React from 'react';
import { AutoSuggest } from '@folio/stripes/components';
import { first } from 'lodash';
import { triggerTagIndicatorsSuggestion } from '../../Actions';
import { withProps } from '../../../../shared';
import { REDUX } from '../../../../config/constants';
import { formFieldValue } from '../../../../redux';

function AutoSuggestInd2(props) {
  const initialState = {
    tagCodeArray: []
  };
  const [state, setState] = React.useState(initialState);

  const onFocus = (e) => {
    e.preventDefault();
    const { tagCodeArray } = state;
    const { store, dispatch } = props;
    const tagCode: string = first(formFieldValue(store, REDUX.FORM.VARIABLE_FORM, 'items')).variableField.code;
    if (tagCode && tagCode.length === 3) {
      const cb = (payload) => setState({ tagCodeArray: payload.ind2 });
      dispatch(triggerTagIndicatorsSuggestion(tagCode, cb));
    }
    return tagCodeArray;
  };

  const onChange = (ind2Code) => {
    const { dispatch, change, input } = props;
    dispatch(change(REDUX.FORM.VARIABLE_FORM, input.name, ind2Code));
  };

  const { tagCodeArray } = state;
  const { input } = props;
  const remappedCodeSuggest = [];
  tagCodeArray.map(elem => remappedCodeSuggest.push(Object.assign({}, { value: elem, label: elem })));
  return (
    <AutoSuggest
      {...props}
      marginBottom0
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

export default withProps(AutoSuggestInd2);
