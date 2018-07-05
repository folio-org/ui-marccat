import React from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import { Field, reduxForm } from 'redux-form';
import RadioButtonGroup from '@folio/stripes-components/lib/RadioButtonGroup';
import RadioButton from '@folio/stripes-components/lib/RadioButton';
import { FormattedMessage } from 'react-intl';
import TextArea from '@folio/stripes-components/lib/TextArea';
import Button from '@folio/stripes-components/lib/Button';
import ScanButton from './ScanButton';
import AndButton from './AndButton';
import OrButton from './OrButton';
import NotButton from './NotButton';
import NearButton from './NearButton';
import WildCard from './WildCard';
import { SnackBar } from '../../../Material/';
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
      indexTypeP: true,
      showErrorMessage: false,
    };
    this.handleRadio = this.handleRadio.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogicButton = this.handleLogicButton.bind(this);
  }

  onClick() {
    if (!this.reduxForm.searchTextArea.value) {
      this.setState({ showErrorMessage: true });
    }
    this.props.history.push(C.INTERNAL_URL.SEARCH_RESULTS);
  }

  handleRadio(e) {
    const value = (e.target.value === 'P');
    this.setState({
      indexTypeP: value,
    });
  }

  handleLogicButton = (idEl, op) => { // da modificare
    const previousVal = document.getElementById(idEl).value;
    document.getElementById(idEl).value = previousVal.concat(' ').concat(op);
  }

  handleSubmit = () => {

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
            <Field component={TextArea} rows='8' id='searchTextArea' refName={(ref) => { this.input = ref; }} name='searchTextArea' withRef />
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <AndButton onClick={() => () => this.handleLogicButton('searchTextArea', 'AND')} disabled={false} />
            <NotButton onClick={() => this.handleLogicButton('searchTextArea', 'NOT')} disabled={false} />
            <OrButton onClick={() => this.handleLogicButton('searchTextArea', 'OR')} disabled={false} />
            <NearButton onClick={() => this.handleLogicButton('searchTextArea', '')} disabled={false} />
          </Col>
          <Col xs={6}>
            {/* <AdvancedSearchButton {...this.props} /> */ }
            <Link to={`${rootPath}/searchResults`} >
              <Button
                onClick={this.onClick}
                type="button"
                /* disabled={this.props.disabled} */
                buttonStyle="primary"
                /* href="/cataloging/searchResults" */
                style={{ 'minHeight': '36px' }}
              >
                <FormattedMessage id="ui-cataloging.search.searchButton" />
              </Button>
            </Link>
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
