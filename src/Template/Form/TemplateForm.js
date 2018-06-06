import React from 'react';
import PropTypes from 'prop-types';
import RadioButtonGroup from '@folio/stripes-components/lib/RadioButtonGroup';
import RadioButton from '@folio/stripes-components/lib/RadioButton';
import { Field, reduxForm } from 'redux-form';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import TextField from '@folio/stripes-components/lib/TextField';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import css from '../styles/TemplateForm.css';
import ErrorModal from '../../Modal/ErrorModal';
import { CreateTag as CreateTagButton, BackTo } from '../';


class TemplateForm extends React.Component {
  static propTypes = { // eslint-disable-line react/no-unused-prop-types
    stripes: PropTypes.shape({ // eslint-disable-line react/no-unused-prop-types
      intl: PropTypes.object.isRequired,
    }).isRequired,
    // handleSubmit: PropTypes.func,
    // submitting: PropTypes.bool,
    template: PropTypes.shape({ // eslint-disable-line react/no-unused-prop-types
      id: PropTypes.string,
    }).isRequired,
    retrieveRef: PropTypes.func,
    field: PropTypes.array.isRequired,
  };

  constructor() {
    super();
    this.templateEL = null;
    this.clearForm = this.clearForm.bind(this);
    this.handleRef = this.handleRef.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!this.props.template || !this.props.template.id) return;
    if (!prevProps.template || prevProps.template.id !== this.props.template.id) {
      const input = this.templateEL.getRenderedComponent().input;
      setTimeout(() => input.focus());
    }
  }

  getFormErrors() {
    return null;
  }

  clearForm() {
    return null;
  }

  handleRef(templateEL) {
    this.templateEL = templateEL;
    this.props.retrieveRef(templateEL);
  }

  renderErrorModal() {
    const errors = this.getFormErrors();
    const error = errors.item || {};
    const showModal = (false);

    return (
      <ErrorModal open={showModal} onClose={this.clearForm} message={error.template} />
    );
  }


  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;

    return (
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
          <Col xs={6} classNames={css.radiobutton}>
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
        <Row id="section-table" className={css.multilist}>
          <MultiColumnList
            contentData={this.props.field}
            onRowClick={() => { }}
            visibleColumns={['categoryCode', 'headerTypeCode', 'code', 'displayValue', 'description']}
            ariaLabel="TemplateNewMandatory"
          />
          <hr />
        </Row>
        <Row id="section-button">
          <CreateTagButton />
        </Row>
        <Row>
          <BackTo />
        </Row>
      </form>
    );
  }
}

export default reduxForm({
  form: 'templateForm',
})(TemplateForm);
