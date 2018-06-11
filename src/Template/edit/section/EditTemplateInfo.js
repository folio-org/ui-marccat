import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import TextField from '@folio/stripes-components/lib/TextField';
import RadioButtonGroup from '@folio/stripes-components/lib/RadioButtonGroup';
import RadioButton from '@folio/stripes-components/lib/RadioButton';
import { Accordion } from '@folio/stripes-components/lib/Accordion';
import css from '../EditTemplate.css';


class EditTemplateInfo extends React.Component {
  static propTypes = {
    onToggle: PropTypes.object.isRequired,
    accordionId: PropTypes.object.isRequired,
    expanded: PropTypes.object.isRequired,
  };
  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;
    const { expanded, onToggle, accordionId } = this.props;

    return (
      <Accordion
        label={formatMsg({ id: 'ui-cataloging.template.detail.information.title' })}
        open={expanded}
        id={accordionId}
        onToggle={onToggle}
      >
        <Row id="section-name">
          <Col xs={6}>
            <TextField
              label={formatMsg({ id: 'ui-cataloging.template.form.name' })}
              name="name"
              aria-label={formatMsg({ id: 'ui-cataloging.template.form.name' })}
              fullWidth
              id="input-template-name"
            />
          </Col>
          <Col xs={6} className={css.radiobutton}>
            <Field name="subGroup" component={RadioButtonGroup} label="Group" style={{ marginTop: '10px' }}>
              <RadioButton label="W" id="radio_1" value="W" inline />
              <RadioButton label="E" id="radio_2" value="E" inline />
              <RadioButton label="M" id="radio_3" value="M" inline />
            </Field>
          </Col>
        </Row>
      </Accordion>
    );
  }
}


EditTemplateInfo.propTypes = {
  stripes: PropTypes.shape({
    intl: PropTypes.object.isRequired,
  }).isRequired
};

export default EditTemplateInfo;
