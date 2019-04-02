import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';

class TestForm extends React.Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return this.props.children;
  }
}

export default reduxForm({
  form: 'formsDemo'
})(TestForm);
setch