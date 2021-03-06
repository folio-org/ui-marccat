/* eslint-disable no-lone-blocks */
/* eslint-disable jsx-a11y/label-has-associated-control */
// @flow
import * as React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Checkbox } from '@folio/stripes-components';
import type { Props } from '../../../flow/types.js.flow';
import { ACTION } from '../../../redux/actions/Actions';
// eslint-disable-next-line no-unused-vars
// import style from '../Style/InputField.css';

type P = Props & {
  labels: Array<any>,
};


export class CheckboxIconButton extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.state = {
    };
  }

 labels = [
   'resultView-Record Type',
   '001-id Number',
   // '245-Title',
   // 'name-Name',
   'preferredTitle-Uniform Title',
   'tagHighlighted-Tag',
   'date1-Date 1',
   'date2-Date 2',
   'format-Format',
 ];

 render() {
   const { dispatch, change } = this.props;
   return (
     <form name="checkboxForm">
       { this.labels.map((l, i) => (
         <div key={i}>
           <Field
             id={l}
             className="checkbox"
             name={l}
             checked
             type="checkbox"
             component={Checkbox}
             onClick={() => {
               dispatch(change('checkboxForm', 'checked', false));
               dispatch({ type: ACTION.CUSTOM_COLUMN_VIEW });
             }}
           />
           <label
             htmlFor={l}
             className="checkbox"
           >
             {l.split('-')[1]}
           </label>
         </div>))}
     </form>
   );
 }
}

export function SingleCheckboxIconButton({ ...props }: P) {
  const { labels, pullLeft, widthPadding } = props;
  return (
    <div>
      { labels.map((l, i) => (
        <div
          key={i}
          style={
            {
              float: (pullLeft) ? 'left' : 'none',
              paddingBottom: (widthPadding) ? '10px' : 'none'
            }
          }
        >
          <Field
            id={`checkbox-${l}`}
            className="checkbox"
            name={`checkbox-${l}`}
            type="checkbox"
            component="input"
          />
          <label
            htmlFor={`checkbox-${l}`}
            className="checkbox"
          >
            {l}
          </label>
        </div>
      ))
      }
    </div>
  );
}

export default reduxForm({
  form: 'checkboxForm',
  navigationCheck: true,
  enableReinitialize: true,
  destroyOnUnmount: false
})(CheckboxIconButton);
