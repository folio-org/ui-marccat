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
import WildCard from './WildCard';
import * as C from '../../../Utils';

function validate(values) {
  const errors = {};
  errors.name = {};

  if (!values.name) {
    errors.name = <FormattedMessage id="ui-cataloging.errors.missingRequiredField" />;
  }
  return errors;
}

class AdvancedSearchForm extends React.Component {

  static manifest = Object.freeze({
    indexType: {},
    categories: {
      type: C.RESOURCE_TYPE,
      root: C.ENDPOINT.BASE_URL,
      path: 'index-categories?type=%{indexType.type}&lang=ita',
      headers: { 'x-okapi-tenant': 'tnx' },
      records: C.API_RESULT_JSON_KEY.INDEX_CATEGORIES
    },
  });

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

  constructor(props) {
    super(props);
    this.state = {
      indexTypeP: true,
    };
    this.handleRadio = this.handleRadio.bind(this);
  }

  handleRadio(e) {
    const value = (e.target.value === 'P');
    this.setState({
      indexTypeP: value,
    });
  }

  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;
    const { handleSubmit, reset, submitting, pristine } = this.props;
    return (
      <form id="search-form" onSubmit={handleSubmit}>
        <Row>
          <Col xs={3}>
            <Field name="indexRadio" component={RadioButtonGroup} label={formatMsg({ id: 'ui-cataloging.search.indexes' })}>
              <RadioButton
                label={formatMsg({ id: 'ui-cataloging.search.primary' })}
                id="actingSponsor001"
                value="P"
                checked={this.state.indexTypeP}
                onChange={this.handleRadio}
                inline
              />
              <RadioButton
                label={formatMsg({ id: 'ui-cataloging.search.secondary' })}
                id="actingSponsor002"
                value="S"
                checked={!this.state.indexTypeP}
                onChange={this.handleRadio}
                inline
              />
            </Field>
          </Col>
          <Col xs={6}>
            {/* <IndexCategory {...this.props} initialValues={{}} /> */}            
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
          </Col>
          <Col xs={6}>
            <AdvancedSearchButton {...this.props} />
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
        <WildCard {...this.props} />
      </form>
    );
  }
}
export default reduxForm({
  form: 'advancedSearchForms', // a unique identifier for this form
  initialValues: {
    name: 'indexRadio', value: 'P'
  },
  validate
})(AdvancedSearchForm);
