import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import _ from 'lodash';
import Button from '@folio/stripes-components/lib/Button';
import { FormattedMessage } from 'react-intl';
import CategorySelect from '../field/CategorySelect';

function validate(values) {
  const errors = {
    code: {},
    ind1: {},
    ind2: {}
  };
  if (!values.code) {
    errors.code = <FormattedMessage id="ui-cataloging.errors.missingRequiredField" />;
  }

  if (!values.ind1) {
    errors.ind1 = <FormattedMessage id="ui-cataloging.errors.missingRequiredField" />;
  }

  if (!values.ind2) {
    errors.ind2 = <FormattedMessage id="ui-cataloging.errors.missingRequiredField" />;
  }

  return errors;
}


class TagForm extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      intl: PropTypes.object.isRequired,
    }).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    defaultValue: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      isTagInputVisible: false
    };
    this.handleForm = this.handleForm.bind(this);
  }

  handleForm() {
    this.setState((curState) => {
      const newState = _.cloneDeep(curState);
      newState.isTagInputVisible = !newState.isTagInputVisible;
      return newState;
    });
  }


  render() {

    const { handleSubmit } = this.props;
    const { isTagInputVisible } = this.state;

    return (
      <form onSubmit={handleSubmit} style={{ paddingTop: '30px' }}>
        {isTagInputVisible &&
          <CategorySelect {...this.props} title="Source" />
        }
        <Button
          type="button"
          onClick={this.handleForm}
          buttonStyle="primary"
          style={{ 'minHeight': '36px' }}
        >Add Tag
        </Button>
        <hr />
      </form>
    );
  }
}
export default reduxForm({
  form: 'tagForm',
  validate
})(TagForm);
