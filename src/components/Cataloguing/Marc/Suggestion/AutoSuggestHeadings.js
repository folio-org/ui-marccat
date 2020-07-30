// @flow
import React, { Fragment } from 'react';
import { AutoSuggest, HotKeys, MessageBanner } from '@folio/stripes/components';
import { injectProps, buildUrl } from '../../../../shared';
import {
  triggerBrowseHeadingSuggestion,
  triggerTagIndicatorsSuggestion,
} from '../../Actions';
import * as C from '../../../../config/constants';
import {
  replaceAllinverted,
  replaceAll,
} from '../../Utils/MarcApiUtils';
import { validateTag } from '../../../../shared/utils/Function';

function AutoSuggestHeadings(props) {
  const initialState = {
    suggestArray: [],
    fromShowHeadings: false,
    stringValidateMessage: '',
    showMessage: false
  };

  const [state, setState] = React.useState(initialState);

  const onFocus = async e => {
    const { store } = props;
    if (e.target.form[1].defaultValue.length === 3) {
      const tagCode = e.target.form[1].defaultValue;
      const ind1 = e.target.form[2].defaultValue === '' ? ' ' : e.target.form[2].defaultValue;
      const ind2 = e.target.form[3].defaultValue === '' ? ' ' : e.target.form[3].defaultValue;
      const payload = {
        ind1,
        ind2,
        tag: tagCode,
      };
      const response = await validateTag(
        buildUrl(
          store.getState(),
          C.ENDPOINT.CHECK_VALIDATE,
          `ind1=${payload.ind1}&ind2=${payload.ind2}&tag=${payload.tag}`
        ),
        `ind1=${payload.ind1}&ind2=${payload.ind2}&tag=${payload.tag}`,
        store.getState()
      );
      if (!response.ok) {
        setState({
          stringValidateMessage: 'Wrong value in tag or indicator', showMessage: true
        });
      } else {
        setState({
          stringValidateMessage:'', showMessage: false
        });
      }
      // console.log('CHECK_TAG: ', data);
    }
  };

  const onShowHeadings = () => {
    const { suggestArray } = state;
    const { dispatch, store, input, change } = props;
    const code = store.getState().form.variableFieldForm.values.items[0]
      .variableField.code;
    const ind1 = store.getState().form.variableFieldForm.values.items[0]
      .variableField.ind1;
    const ind2 = store.getState().form.variableFieldForm.values.items[0]
      .variableField.ind2;
    const displayValue = store.getState().form.variableFieldForm.values.items[0]
      .variableField.displayValue;
    const stringText = replaceAllinverted(
      store.getState().form.variableFieldForm.values.items[0].variableField
        .displayValue
    );
    const cb = payload => setState({ suggestArray: payload.headings, fromShowHeadings: true });
    dispatch(triggerBrowseHeadingSuggestion(code, ind1, ind2, stringText, cb));
    dispatch(change(C.REDUX.FORM.VARIABLE_FORM, input.name, displayValue));
    return suggestArray;
  };

  const onChange = event => {
    const { suggestArray } = state;
    const { dispatch, store, change, input } = props;
    if (event && event !== undefined && event !== '') {
      const code = store.getState().form.variableFieldForm.values.items[0]
        .variableField.code;
      if (event === '$' && code.length === 3) {
        const cb = payload => setState({
          suggestArray: payload.subfields,
          fromShowHeadings: false,
        });
        dispatch(triggerTagIndicatorsSuggestion(code, cb));
      }
      dispatch(change(C.REDUX.FORM.VARIABLE_FORM, input.name, event));
    }
    return suggestArray;
  };

  const keys = {
    showHeadings: ['ctrl+alt'],
  };

  const handlers = {
    showHeadings: onShowHeadings,
  };

  const { suggestArray, fromShowHeadings, stringValidateMessage, showMessage } = state;
  const { input } = props;
  input.value = replaceAll(input.value);
  const remappedSuggestArray = [];
  if (suggestArray && suggestArray.length > 0 && fromShowHeadings === false) {
    suggestArray
      .split('')
      .map(elem => remappedSuggestArray.push(
        Object.assign({}, { value: '$' + elem, label: '$' + elem })
      ));
  } else if (
    suggestArray &&
    suggestArray.length > 0 &&
    fromShowHeadings === true
  ) {
    suggestArray.map(elem => remappedSuggestArray.push(
      Object.assign({}, { value: elem.stringText, label: elem.stringText })
    ));
  }

  return (
    <HotKeys keyMap={keys} handlers={handlers}>
      <Fragment>
        {showMessage &&
        <MessageBanner show={showMessage} type="warning">
          {stringValidateMessage}
        </MessageBanner>
        }
        <AutoSuggest
          {...props}
          items={remappedSuggestArray}
          onChange={onChange}
          onFocus={onFocus}
          name={input.name}
          renderOption={item => (item ? item.value : '')}
          renderValue={item => (item ? item.value : '')}
          includeItem={(item, searchString) => item.value.includes(searchString)}
          valueKey="value"

        />
      </Fragment>
    </HotKeys>
  );
}

export default injectProps(AutoSuggestHeadings);
