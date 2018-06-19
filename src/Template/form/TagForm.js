import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Button from '@folio/stripes-components/lib/Button';
import { Row, Col } from 'react-flexbox-grid';
import { FormattedMessage } from 'react-intl';
import TextField from '@folio/stripes-components/lib/TextField';
import SimpleSelect from '../../Material/SimpleSelect';
import Category from '../../Category';

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
    }).isRequired
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
    const data = [{
      value: 15,
      name: 'rrr'
    }, {
      value: 60,
      name: 'rrr'
    }, {
      value: 10,
      name: 'rrr'
    }];
    const formatMsg = this.props.stripes.intl.formatMessage;
    const { handleSubmit, pristine, reset, submitting } = this.props;
    const { isTagInputVisible } = this.state;
    const title = this.props;

    return (
      <form onSubmit={handleSubmit} style={{ paddingTop: '30px' }}>
        {isTagInputVisible && <Row>
          <Col xs={8}>
            <Row>
              <Col xs={4}>
                <Field
                  label={formatMsg({ id: 'ui-cataloging.template.form.tag.code' })}
                  name="code"
                  id="code"
                  placeholder={formatMsg({ id: 'ui-cataloging.template.form.tag.code' })}
                  aria-label={formatMsg({ id: 'ui-cataloging.template.form.tag.code' })}
                  component={TextField}
                  required
                  fullWidth
                />
              </Col>
              <Col xs={4}>
                <Field
                  label={formatMsg({ id: 'ui-cataloging.template.form.tag.ind1' })}
                  name="ind1"
                  id="ind1"
                  placeholder={formatMsg({ id: 'ui-cataloging.template.form.tag.ind1' })}
                  aria-label={formatMsg({ id: 'ui-cataloging.template.form.tag.ind1' })}
                  component={TextField}
                  required
                  fullWidth
                />
              </Col>
              <Col xs={4}>
                <Field
                  label={formatMsg({ id: 'ui-cataloging.template.form.tag.ind2' })}
                  name="ind2"
                  id="ind2"
                  placeholder={formatMsg({ id: 'ui-cataloging.template.form.tag.ind2' })}
                  aria-label={formatMsg({ id: 'ui-cataloging.template.form.tag.ind2' })}
                  component={TextField}
                  required
                  fullWidth
                />
              </Col>
            </Row>
          </Col>
        </Row>
        }
        {isTagInputVisible &&
          <Row>
            <Row>
              <Col xs={3}>
                <Category {...this.props} title="Category" />
              </Col>
            </Row>
            <Row>
              <Col xs={3}>
                <SimpleSelect {...this.props} data={data} title="Cataloging Source" />
              </Col>
            </Row>
          </Row>}
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
  validate // a unique identifier for this form
})(TagForm);
