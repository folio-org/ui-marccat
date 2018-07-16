// eslint-disable react/require-default-props
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import { reduxForm } from 'redux-form'; // eslint-disable-line
import Button from '@folio/stripes-components/lib/Button';
import { FormattedMessage } from 'react-intl';
import Textarea from '@folio/stripes-components/lib/TextArea';
import ScanButton from './ScanButton';
import AndButton from './AndButton';
import OrButton from './OrButton';
import NotButton from './NotButton';
import NearButton from './NearButton';
import WildCard from './WildCard';
import IndexCategory from '../IndexCategory';
import * as C from '../../../../Utils';

function validate(values) {
  const errors = {};
  errors.name = {};

  if (!values.name) {
    errors.name = <FormattedMessage id="ui-marccat.errors.missingRequiredField" />;
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
      records: C.API_RESULT_JSON_KEY.INDEX_CATEGORIES,
    },
  });

  static propTypes = {
    stripes: PropTypes.shape({
      intl: PropTypes.object.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      showErrorMessage: false,
    };
    this.onClick = this.onClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogicButton = this.handleLogicButton.bind(this);
    this.handleConstraint = this.handleConstraint.bind(this);
  }

  onClick(event) {
    if (!this.state.value) {
      this.state.showErrorMessage = true;
      this.setState({ value: event.target.value });
    } else {
      this.props.history.push(C.INTERNAL_URL.SEARCH_RESULTS);
    }
  }

  handleLogicButton = (op) => { // da modificare
    const previousVal = this.state.value;
    this.setState({ value: previousVal.concat(' ').concat(op) });
  }

  handleConstraint = (valueSelect, labelSelect) => {
    const previousVal = this.state.value;
    this.setState({ value: previousVal.concat(' "').concat(valueSelect).concat('" [').concat(labelSelect)
      .concat('] ') });
  }

  handleSubmit = () => {

  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    const { submitting, pristine } = this.props;
    return (
      <form id="search-form" name="advancedSearchForms" onSubmit={this.handleSubmit} noValidate>
        <IndexCategory {...this.props} onSelectIndex={this.handleLogicButton} onSelectConstraint={this.handleConstraint} title="Category" />
        <Row style={{ marginTop: '50px' }}>
          <Col xs={11}>
            <Textarea rows="8" id="searchTextArea" value={this.state.value} onChange={this.handleChange} style={{ width: '100%' }} />
          </Col>
        </Row>
        <Row>
          <Col xs={7}>
            <AndButton {...this.props} onClick={() => this.handleLogicButton('AND')} disabled={false} />
            <NotButton {...this.props} onClick={() => this.handleLogicButton('NOT')} disabled={false} />
            <OrButton {...this.props} onClick={() => this.handleLogicButton('OR')} disabled={false} />
            <NearButton {...this.props} onClick={() => this.handleLogicButton('NEAR')} disabled={false} />
          </Col>
          <Col xs={5}>
            <Button
              {...this.props}
              onClick={this.onClick}
              type="button"
              buttonStyle="primary"
              style={{ minHeight: '36px' }}
            >
              <FormattedMessage id="ui-marccat.search.searchButton" />
            </Button>
            <ScanButton {...this.props} disabled={pristine || submitting} />
            <Button
              {...this.props}
              onClick={this.props.onClick}
              type="button"
              disabled={pristine || submitting}
              buttonStyle="primary"
              style={{ minHeight: '36px' }}
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
    name: 'indexRadio',
    value: 'P',
    testSelected: 'Ainu',
  },
  validate,
})(AdvancedSearchForm);
