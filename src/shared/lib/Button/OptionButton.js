/* eslint-disable no-lone-blocks */
/* eslint-disable jsx-a11y/label-has-associated-control */
// @flow
import * as React from 'react';
import { reduxForm, Field } from 'redux-form';

// eslint-disable-next-line no-unused-vars
import style from '../Style/InputField.css';


export class CheckboxIconButton extends React.Component {
  render() {
    const { labels, dispatch, change } = this.props;
    return (
      <form name="checkboxForm">
        { labels.map((l, i) => (
          <div key={i}>
            <Field
              id={`${l}`}
              className="checkbox"
              name={`${l}`}
              type="checkbox"
              component="input"
            />
            <label
              htmlFor={`${l}`}
              className="checkbox"
              onClick={() => {
                dispatch(change('checkboxForm', 'checked', true));
              }}
            >
              {l}
            </label>
          </div>))}
      </form>
    );
  }
}

export function SingleCheckboxIconButton({ ...props }) {
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
