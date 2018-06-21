import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import { Field, reduxForm } from 'redux-form';
import RadioButtonGroup from '@folio/stripes-components/lib/RadioButtonGroup';
import RadioButton from '@folio/stripes-components/lib/RadioButton';
import { FormattedMessage } from 'react-intl';
import TextArea from '@folio/stripes-components/lib/TextArea';
import Button from '@folio/stripes-components/lib/Button';
import AdvancedSearchButton from './AdvancedSearchButton';
import ScanButton from './ScanButton';
import IndexCategory from '../../advanced/IndexCategory';

function validate(values) {
  const errors = {};
  errors.name = {};

  if (!values.name) {
    errors.name = <FormattedMessage id="ui-cataloging.errors.missingRequiredField" />;
  }
  return errors;
}

class AdvancedSearchForm extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      intl: PropTypes.object.isRequired,
    }).isRequired,
    field: PropTypes.array.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    onCancel: PropTypes.func,
    handleKeyDown: PropTypes.func,
    initialValues: PropTypes.object,
  }

  // eslint-disable-next-line class-methods-use-this
  handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  }

  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;
    const { handleSubmit, reset, submitting, pristine, handleKeyDown, stripes: { intl } } = this.props;
    return (
      <form id="search-form" onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
        <Row>
          <Col xs={6}>
            <Field name="subGroup" component={RadioButtonGroup} label={formatMsg({ id: 'ui-cataloging.search.indexes' })}>
              <RadioButton label={formatMsg({ id: 'ui-cataloging.search.primary' })} id="actingSponsor001" value="P" inline />
              <RadioButton label={formatMsg({ id: 'ui-cataloging.search.secondary' })} id="actingSponsor002" value="S" inline />
            </Field>
          </Col>
          <Col xs={6}>
            <IndexCategory {...this.props} initialValues={{}} />
          </Col>
        </Row>
        <Row>
          <Col xs={8}>
            <TextArea />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <AdvancedSearchButton disabled={pristine || submitting} />
            <ScanButton disabled={pristine || submitting} />
            <Button
              {...this.props}
              type="submit"
              disabled={pristine || submitting}
              onClick={reset}
              buttonStyle="primary"
              style={{ 'minHeight': '36px' }}
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
  form: 'advancedSearchForms', // a unique identifier for this form
  initialValues: {
    subGroup: 'P'
  },
  validate
})(AdvancedSearchForm);
