import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import RadioButtonGroup from '@folio/stripes-components/lib/RadioButtonGroup';
import RadioButton from '@folio/stripes-components/lib/RadioButton';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import TagForm from '../form/TagForm';

function validate(values) {
  const errors = {};
  errors.name = {};

  if (!values.name) {
    errors.name = (
      <FormattedMessage id="ui-marccat.errors.missingRequiredField" />
    );
  }
  return errors;
}

class TemplateForm extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      intl: PropTypes.object.isRequired,
    }).isRequired,
    mandatoryField: PropTypes.array.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  validate(values) {
    const errors = {};
    errors.name = {};

    if (!values.name) {
      errors.name = (
        <FormattedMessage id="ui-marccat.errors.missingRequiredField" />
      );
    }
    return errors;
  }

  handleSubmit = () => {}

  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;
    const {
      mandatoryField,
    } = this.props;
    const defaultValue =
      mandatoryField[mandatoryField.length - 1];

    return (
      <form id="templateForm" name="templateForm" onSubmit={this.handleSubmit}>
        <Row id="section-name">
          <Col xs={6}>
            <Field
              style={{
                width: `${100}%`,
                marginTop: 25,
              }}
              label={formatMsg({
                id: 'ui-marccat.template.form.name',
              })}
              name="name"
              placeholder={formatMsg({
                id: 'ui-marccat.template.form.name',
              })}
              aria-label={formatMsg({
                id: 'ui-marccat.template.form.name',
              })}
              fullWidth
              id="input-template-name"
              withRef
              validationEnabled={false}
              component="input"
            />
          </Col>
          <Col xs={6}>
            <Field
              name="subGroup"
              component={RadioButtonGroup}
              label="Group"
              style={{ marginTop: '10px' }}
            >
              <RadioButton
                label="W"
                id="actingSponsor001"
                value="W"
                inline
              />
              <RadioButton
                label="E"
                id="actingSponsor002"
                value="E"
                inline
              />
              <RadioButton
                label="M"
                id="actingSponsor003"
                value="M"
                inline
              />
            </Field>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <TagForm
              {...this.props}
              defaultValue={defaultValue}
            />
          </Col>
        </Row>
        {/* <Row>
          <Col xs={12}>
            <CreateTemplateButton
              disabled={pristine || submitting}
            />
            <Button
              {...this.props}
              type="submit"
              disabled={pristine || submitting}
              onClick={reset}
              buttonStyle="primary"
              style={{ minHeight: '36px' }}
            >
              Clear
            </Button>
          </Col>
        </Row> */}
      </form>
    );
  }
}

export default reduxForm({
  form: 'templateForm',
  validate,
})(TemplateForm);
