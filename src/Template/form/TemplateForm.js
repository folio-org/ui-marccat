import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import RadioButtonGroup from '@folio/stripes-components/lib/RadioButtonGroup';
import RadioButton from '@folio/stripes-components/lib/RadioButton';
import Button from '@folio/stripes-components/lib/Button';
import { FormattedMessage } from 'react-intl';
import {
  Row,
  Col,
} from '@folio/stripes-components/lib/LayoutGrid';
import TagForm from '../form/TagForm';
import { CreateTemplateButton } from '../';

function validate(values) {
  const errors = {};
  errors.name = {};

  if (!values.name) {
    errors.name = (
      <FormattedMessage id="ui-cataloging.errors.missingRequiredField" />
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
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    onCancel: PropTypes.func,
    reset: PropTypes.func,
    initialValues: PropTypes.object,
    handleKeyDown: PropTypes.func,
  };

  validate(values) {
    const errors = {};
    errors.name = {};

    if (!values.name) {
      errors.name = (
        <FormattedMessage id="ui-cataloging.errors.missingRequiredField" />
      );
    }
    return errors;
  }

  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;
    const {
      handleSubmit,
      reset,
      submitting,
      pristine,
      mandatoryField,
    } = this.props;
    const defaultValue =
      mandatoryField[mandatoryField.length - 1];

    return (
      <form id="template-form" onSubmit={handleSubmit}>
        <Row id="section-name">
          <Col xs={6}>
            <Field
              style={{
                width: 100 + '%',
                marginTop: 25,
              }}
              label={formatMsg({
                id: 'ui-cataloging.template.form.name',
              })}
              name="name"
              placeholder={formatMsg({
                id: 'ui-cataloging.template.form.name',
              })}
              aria-label={formatMsg({
                id: 'ui-cataloging.template.form.name',
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
        <Row>
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
        </Row>
      </form>
    );
  }
}

export default reduxForm({
  form: 'templateForms', // a unique identifier for this form
  validate,
})(TemplateForm);
