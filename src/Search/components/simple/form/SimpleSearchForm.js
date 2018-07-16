/**
 * @format
 * @flow
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import { Field, reduxForm } from 'redux-form'; // eslint-disable-line
import RadioButtonGroup from '@folio/stripes-components/lib/RadioButtonGroup';
import RadioButton from '@folio/stripes-components/lib/RadioButton';
import { FormattedMessage } from 'react-intl';
import TextArea from '@folio/stripes-components/lib/TextArea';
import SimpleSearchButton from './SimpleSearchButton';

function validate(values) {
  const errors = {};
  errors.name = {};

  if (!values.name) {
    errors.name = <FormattedMessage id="ui-marccat.errors.missingRequiredField" />;
  }
  return errors;
}

class SimpleSearchForm extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      intl: PropTypes.object.isRequired,
    }).isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };
  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;
    const { handleSubmit } = this.props;
    return (
      <form id="search-form" onSubmit={handleSubmit}>
        <Row>
          <Col xs={7}>
            <TextArea rows="8" />
          </Col>
          <Col xs={5}>
            <Field name="subGroup" component={RadioButtonGroup}>
              <RadioButton
                label={formatMsg({
                  id: 'ui-marccat.search.simple.NT',
                })}
                id="actingSponsor001"
                value="NT"
              />
              <RadioButton
                label={formatMsg({
                  id: 'ui-marccat.search.simple.PW',
                })}
                id="actingSponsor002"
                value="PW"
              />
              <RadioButton
                label={formatMsg({
                  id: 'ui-marccat.search.simple.SW',
                })}
                id="actingSponsor003"
                value="SW"
              />
              <RadioButton
                label={formatMsg({
                  id: 'ui-marccat.search.simple.NW',
                })}
                id="actingSponsor004"
                value="NW"
              />
              <RadioButton
                label={formatMsg({
                  id: 'ui-marccat.search.simple.TW',
                })}
                id="actingSponsor005"
                value="TW"
              />
              <RadioButton
                label={formatMsg({
                  id: 'ui-marccat.search.simple.AW',
                })}
                id="actingSponsor006"
                value="AW"
              />
            </Field>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <SimpleSearchButton />
          </Col>
        </Row>
      </form>
    );
  }
}

export default reduxForm({
  form: 'simpleSearchForms', // a unique identifier for this form
  initialValues: {},
  validate,
})(SimpleSearchForm);
