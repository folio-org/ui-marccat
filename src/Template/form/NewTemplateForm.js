import React from 'react';
import PropTypes from 'prop-types';
import RadioButtonGroup from '@folio/stripes-components/lib/RadioButtonGroup';
import RadioButton from '@folio/stripes-components/lib/RadioButton';
import { Field, reduxForm } from 'redux-form';
import TextField from '@folio/stripes-components/lib/TextField';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';

class NewTemplateForm extends React.Component {
  static propTypes = { // eslint-disable-line react/no-unused-prop-types
    stripes: PropTypes.shape({ // eslint-disable-line react/no-unused-prop-types
      intl: PropTypes.object.isRequired,
    }).isRequired,
  };

  render() {
    return (
      <form id="item-form">
        <Row id="section-item">
          <Col xs={6}>
            <Field
              label="name"
              name="item.name"
              placeholder="name"
              aria-label="name"
              fullWidth
              id="input-item-barcode"
              component={TextField}
            />
          </Col>
          <Col xs={6}>
            <Field name="subGroup" component={RadioButtonGroup}>
              <RadioButton label="W" id="actingSponsor001" value="W" inline />
              <RadioButton label="E" id="actingSponsor002" value="E" inline />
              <RadioButton label="M" id="actingSponsor003" value="M" inline />
            </Field>
          </Col>
        </Row>
      </form>
    );
  }
}

export default reduxForm({
  form: 'newTemplateForm',
})(NewTemplateForm);
