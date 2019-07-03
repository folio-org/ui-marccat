// //
// import * as React from 'react';
// import { AutoSuggest } from '@folio/stripes/components';
// import { triggerTagCodeSuggestion } from '../../Actions';
// import { injectProps } from '../../../../shared';
// import { REDUX } from '../../../../config/constants';

// function AutoSuggestCode(props) {
//   const initialState = {
//     tagCodeArray: []
//   };
//   const [state, setState] = React.useState(initialState);

//   const onChange = (code) => {
//     const { tagCodeArray } = state;
//     const { dispatch, change, input } = props;
//     if (code && code !== '') {
//       const cb = (payload) => setState({ tagCodeArray: payload.tags });
//       dispatch(triggerTagCodeSuggestion(code, cb));
//       dispatch(change(REDUX.FORM.VARIABLE_FORM, input.name, code));
//     }
//     return tagCodeArray;
//   };

//   const { tagCodeArray } = state;
//   const { input } = props;
//   const remappedCodeSuggest = [];
//   tagCodeArray.map(elem => remappedCodeSuggest.push(Object.assign({}, { value: elem, label: elem })));
//   return (
//     <AutoSuggest
//       {...props}
//       items={remappedCodeSuggest}
//       name={input.name}
//       onChange={onChange}
//       renderOption={(item) => ((item) ? item.value : '')}
//       renderValue={(item) => ((item) ? item.value : '')}
//       valueKey="value"
//     />
//   );
// }

// export default injectProps(AutoSuggestCode);
