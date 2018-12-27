/* eslint-disable no-lone-blocks */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import style from '../../Style/InputField.css';

type Props = {
  labels: Array<any>,
};

export function RadioIconButton({ ...props }:Props) {
  const { labels } = props;
  return (
    <form>
      { React.Children.map(labels, (l, i) => (
        <div key={i}>
          <input id={`radio-${i}`} className={style['radio-custom']} name={`radio-group-${i}`} type="radio" />
          <label htmlFor={`radio-${i}`} className={style['radio-custom-label']}>{l}</label>
        </div>
      ))
      }
    </form>);
}


class CheckboxIconButton extends React.Component<Props, {}> {
  constructor(props:Props) {
    super(props);

    this.state = {
      isSelected: false
    };

    this.handleCheckboxValue = this.handleCheckboxValue.bind(this);
  }


  handleCheckboxValue = e => {
    const { dispatch, change } = this.props;
    const { isSelected } = this.state;
    dispatch(change(`${e.target.htmlFor}`, !isSelected));
    this.setState({
      isSelected: !isSelected
    });
  };

  render() {
    const { labels } = this.props;
    return (
      <form name="checkboxForm">
        { labels.map((l, i) => (
          <div key={i}>
            <Field
              id={`checkbox-${l}`}
              className="checkbox"
              name={`checkbox-${l}`}
              type="checkbox"
              component="input"
              checked={`checkbox-${l}`}
            />
            <label
              htmlFor={`checkbox-${l}`}
              className="checkbox"
              onClick={this.handleCheckboxValue}
            >
              {l}
            </label>
          </div>
        ))
        }
      </form>
    );
  }
}
export default reduxForm({
  form: 'checkboxForm',
  destroyOnUnmount: false
})(CheckboxIconButton);
