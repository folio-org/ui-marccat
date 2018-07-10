import React from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import { reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import Textarea from '@folio/stripes-components/lib/TextArea';
import ScanButton from './ScanButton';
import AndButton from './AndButton';
import OrButton from './OrButton';
import NotButton from './NotButton';
import NearButton from './NearButton';
import WildCard from './WildCard';
import IndexCategory from '../IndexCategory';
import { SnackBar } from '../../../../Common';
import * as C from '../../../../Utils';

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
    history: PropTypes.shape({
      goBack: PropTypes.func,
      pop: PropTypes.func,
      push: PropTypes.func
    }),
    match: {
      path: PropTypes.string,
      url: PropTypes.string
    },
    searchTextArea: PropTypes.shape({
      input: PropTypes.string
    })
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
    const formatMsg = this.props.stripes.intl.formatMessage;
    const { reset, submitting, pristine } = this.props;
    const rootPath = this.props.match.path || this.props.match.url;
    return (
      <form id="search-form" name="advancedSearchForms" onSubmit={this.handleSubmit} noValidate >
        {this.state.showErrorMessage &&
          <SnackBar position="right" message={formatMsg({ id: 'ui-cataloging.search.wrong.input' })} />
        }
        <IndexCategory {...this.props} onSelectIndex={this.handleLogicButton} onSelectConstraint={this.handleConstraint} title="Category" />
        <Row>
          <Col xs={11}>
            <Textarea rows='8' id='searchTextArea' value={this.state.value} onChange={this.handleChange} style={{ width: '100%' }} />
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
            {/* <AdvancedSearchButton {...this.props} /> */ }
            {/* <Link to={`${rootPath}/searchResults`} > */}
            <Button
              {...this.props}
              onClick={this.onClick}
              type="button"
              // disabled={this.props.disabled}
              variant="contained"
              color="primary"
            >
              <FormattedMessage id="ui-cataloging.search.searchButton" />
            </Button>
            {/* </Link> */}
            <ScanButton {...this.props} disabled={pristine || submitting} />
            <Button
              {...this.props}
              onClick={this.props.onClick}
              type="button"
              disabled={pristine || submitting}
              variant="contained"
              color="primary"
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
