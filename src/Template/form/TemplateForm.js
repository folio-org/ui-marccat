import React from 'react';
import PropTypes from 'prop-types';
import RadioButtonGroup from '@folio/stripes-components/lib/RadioButtonGroup';
import RadioButton from '@folio/stripes-components/lib/RadioButton';
import { Field } from 'redux-form';
import stripesForm from '@folio/stripes-form';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import TextField from '@folio/stripes-components/lib/TextField';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import css from './TemplateForm.css';

class TemplateForm extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      intl: PropTypes.object.isRequired,
    }).isRequired,
    field: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.mandatoryField = this.props.field;
  }


  saveFields() {
    return this.props.field;
  }


  getFormErrors() {
    return null;
  }


  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;

    return (
      <div>
        <form id="template-form">
          <Row id="section-name">
            <Col xs={6}>
              <Field
                label={formatMsg({ id: 'ui-cataloging.template.form.name' })}
                name="name"
                placeholder={formatMsg({ id: 'ui-cataloging.template.form.name' })}
                aria-label={formatMsg({ id: 'ui-cataloging.template.form.name' })}
                fullWidth
                id="input-template-name"
                component={TextField}
                withRef
                validationEnabled={false}
              />
            </Col>
            <Col xs={6} className={css.radiobutton}>
              <Field name="subGroup" component={RadioButtonGroup} label="Group" style={{ marginTop: '10px' }}>
                <RadioButton label="W" id="actingSponsor001" value="W" inline />
                <RadioButton label="E" id="actingSponsor002" value="E" inline />
                <RadioButton label="M" id="actingSponsor003" value="M" inline />
              </Field>
            </Col>
          </Row>
          <Row id="section-info">
            <Col xs={4}>
              <Field
                label={formatMsg({ id: 'ui-cataloging.template.form.code' })}
                name="code"
                placeholder={formatMsg({ id: 'ui-cataloging.template.form.code' })}
                aria-label={formatMsg({ id: 'ui-cataloging.template.form.code' })}
                fullWidth
                id="input-template-code"
                component={TextField}
              />
            </Col>
            <Col xs={4}>
              <Field
                label={formatMsg({ id: 'ui-cataloging.template.form.primary.address' })}
                name="ind1"
                placeholder={formatMsg({ id: 'ui-cataloging.template.form.primary.address' })}
                aria-label={formatMsg({ id: 'ui-cataloging.template.form.primary.address' })}
                fullWidth
                id="input-template-primary-address"
                component={TextField}
              />
            </Col>
            <Col xs={4}>
              <Field
                label={formatMsg({ id: 'ui-cataloging.template.form.secondary.address' })}
                name="ind2"
                placeholder={formatMsg({ id: 'ui-cataloging.template.form.secondary.address' })}
                aria-label={formatMsg({ id: 'ui-cataloging.template.form.secondary.address' })}
                fullWidth
                id="input-template-secondary-address"
                component={TextField}
              />
            </Col>
          </Row>
        </form>
        <Row id="section-table" className={css.multilist}>
          <MultiColumnList
            contentData={this.mandatoryField}
            onRowClick={() => { }}
            visibleColumns={['categoryCode', 'headerTypeCode', 'code', 'displayValue', 'description']}
            ariaLabel="TemplateNewMandatory"
          />
        </Row>
      </div>
    );
  }
}

export default stripesForm({
  form: 'templateForm',
})(TemplateForm);
