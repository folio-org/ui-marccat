/**
 * @format
 * @flow
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { connect } from '@folio/stripes-connect';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import TextField from '@folio/stripes-components/lib/TextField';
import RadioButtonGroup from '@folio/stripes-components/lib/RadioButtonGroup';
import RadioButton from '@folio/stripes-components/lib/RadioButton';
import { Accordion } from '@folio/stripes-components/lib/Accordion';
import css from '../../styles/Template.css';
import * as C from '../../../Utils';

class EditTemplateInfo extends React.Component {
  static manifest = Object.freeze({
    templateId: {},
    records: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: 'record-template/%{id}',
      headers: C.ENDPOINT.HEADERS,
      records: C.API_RESULT_JSON_KEY.HEADING_TYPES,
    },
  });

  static propTypes = {
    onToggle: PropTypes.object.isRequired,
    accordionId: PropTypes.object.isRequired,
    expanded: PropTypes.object.isRequired,
    selectedTemplate: PropTypes.object.isRequired,
  };


  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;
    const { expanded, onToggle, accordionId } = this.props;

    return (
      <Accordion
        label={formatMsg({
          id:
            'ui-marccat.template.detail.information.title',
        })}
        open={expanded}
        id={accordionId}
        onToggle={onToggle}
      >
        <Row id="section-name">
          <Col xs={6}>
            <TextField
              value={this.props.selectedTemplate.name}
              label={formatMsg({
                id: 'ui-marccat.template.form.name',
              })}
              name="templateEditName"
              aria-label={formatMsg({
                id: 'ui-marccat.template.form.name',
              })}
              fullWidth
              id="input-template-name"
            />
          </Col>
          <Col xs={6}>
            <Field
              name="subGroup"
              component={RadioButtonGroup}
              label="Group"
              className={css.colRadio}
            >
              <RadioButton
                label="W"
                id="radio_1"
                value="W"
                inline
              />
              <RadioButton
                label="E"
                id="radio_2"
                value="E"
                inline
              />
              <RadioButton
                label="M"
                id="radio_3"
                value="M"
                inline
              />
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
  }).isRequired,
};

export default connect(EditTemplateInfo, C.META.MODULE_NAME);
