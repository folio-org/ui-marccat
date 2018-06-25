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
import AndButton from './AndButton';
import OrButton from './OrButton';
import NotButton from './NotButton';
import NearButton from './NearButton';
import WildCardCheckbox from './WildCardCheckbox';
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
    reset: PropTypes.func,
    initialValues: PropTypes.object,
  }

  constructor() {
    super();
    this.state = {
      selectedIndexType: 'P'
    };
  }


  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;
    const { handleSubmit, reset, submitting, pristine } = this.props;
    return (
      <form id="search-form" onSubmit={handleSubmit}>
        <Row>
          <Col xs={3}>
            <Field name="subGroup" component={RadioButtonGroup} label={formatMsg({ id: 'ui-cataloging.search.indexes' })}>
              <RadioButton
                label={formatMsg({ id: 'ui-cataloging.search.primary' })}
                id="actingSponsor001"
                value="P"
                input={
                    {
                      checked: this.state.selectedIndexType === 'P',
                      onChange: () => { this.setState({ selectedIndexType: 'P' }); },

                    }
                  }
                inline
              />
              <RadioButton
                label={formatMsg({ id: 'ui-cataloging.search.secondary' })}
                id="actingSponsor002"
                value="S"
                input={
                  {
                    checked: this.state.selectedIndexType === 'S',
                    onChange: () => { this.setState({ selectedIndexType: 's' }); },
                  }
                }
                inline
              />
            </Field>
          </Col>
          <Col xs={6}>
            <IndexCategory {...this.props} initialValues={{}} />
          </Col>
        </Row>
        <Row>
          <Col xs={11}>
            <TextArea rows='8' />
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <AndButton />
            <NotButton />
            <OrButton />
            <NearButton />
            <WildCardCheckbox {...this.props} />
          </Col>
          <Col xs={6}>
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
  },
  validate
})(AdvancedSearchForm);
