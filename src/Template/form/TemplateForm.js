import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RadioButtonGroup from '@folio/stripes-components/lib/RadioButtonGroup';
import RadioButton from '@folio/stripes-components/lib/RadioButton';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import TextField from '@folio/stripes-components/lib/TextField';
import MandatoryList from '../form/MandatoryList';

type TemplateFormProps = {
  stripes: Object;
  history: Object;
  resources: Object;
};
type TemplateFormState = {
  currentTemplate: Object;
};

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

class TemplateForm extends React.Component<TemplateFormProps, TemplateFormState> {
  constructor(props) {
    super(props);
    this.handleMandatory = this.handleMandatory.bind(this);
  }

  handleMandatory = () => {
  // this.setState({ currentTemplate: remapForTemplateMandatory(mandatoryMap) });
  }

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

    return (
      <form id="templateForm" name="templateForm" onSubmit={this.handleSubmit}>
        <Row id="section-name">
          <Col xs={6}>
            <Field
              style={{
                width: `${100}%`
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
              component={TextField}
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
                id="subGroupW"
                value="W"
                inline
              />
              <RadioButton
                label="E"
                id="subGroupE"
                value="E"
                inline
              />
              <RadioButton
                label="M"
                id="subGroupM"
                value="M"
                inline
              />
            </Field>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <MandatoryList {...this.props} mandatoryFields={this.handleMandatory} />
          </Col>
        </Row>
      </form>
    );
  }
}

export default reduxForm({
  form: 'templateForm',
  validate,
})(TemplateForm);
