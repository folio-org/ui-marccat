import _ from 'lodash';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import Button from '@folio/stripes-components/lib/Button';
import IconButton from '@folio/stripes-components/lib/IconButton';
import RadioButtonGroup from '@folio/stripes-components/lib/RadioButtonGroup';
import RadioButton from '@folio/stripes-components/lib/RadioButton';
import { Field, reduxForm, reset, getFormSubmitErrors } from 'redux-form';
import TextField from '@folio/stripes-components/lib/TextField';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import * as C from '../../Utils';
import { ErrorModal } from '../../Modal';

class NewTemplateForm extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      intl: PropTypes.object.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
  }

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
