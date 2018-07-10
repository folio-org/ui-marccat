import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Button from '@folio/stripes-components/lib/Button';
import { FormattedMessage } from 'react-intl';
import Select from '@folio/stripes-components/lib/Select';
import CategorySelect from '../field/CategorySelect';

function validate(values) {
  const errors = {
    code: {},
    ind1: {},
    ind2: {},
  };
  if (!values.code) {
    errors.code = (
      <FormattedMessage id="ui-cataloging.errors.missingRequiredField" />
    );
  }

  if (!values.ind1) {
    errors.ind1 = (
      <FormattedMessage id="ui-cataloging.errors.missingRequiredField" />
    );
  }

  if (!values.ind2) {
    errors.ind2 = (
      <FormattedMessage id="ui-cataloging.errors.missingRequiredField" />
    );
  }

  return errors;
}

class TagForm extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      intl: PropTypes.object.isRequired,
    }).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    defaultValue: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.initialize({ accountno: 'some value here' });
  }

  constructor(props) {
    super(props);
    this.state = {
      isTagInputVisible: false,
    };
    this.handleForm = this.handleForm.bind(this);
  }

  handleForm() {
    this.setState(curState => {
      const newState = _.cloneDeep(curState);
      newState.isTagInputVisible = !newState.isTagInputVisible;
      return newState;
    });
  }

  render() {
    const { handleSubmit } = this.props;
    const formatMsg = this.props.stripes.intl.formatMessage;
    return (
      <form 
        name="tagForm"
        onSubmit={handleSubmit}
        style={{ paddingTop: '30px' }}
      >
        <Row>
          <CategorySelect {...this.props} title="Source" />
        </Row>
        <Row>
          <Select
            dataOptions={[
              { value: "a", label: "a" },
            ]}
          />
          <Col xs={6}>
            <Field
              style={{
                width: 100 + '%',
              }}
              label={formatMsg({
                id: 'ui-cataloging.template.form.name',
              })}
              name="name"
              placeholder={formatMsg({
                id: 'ui-cataloging.template.form.name',
              })}
              aria-label={formatMsg({
                id: 'ui-cataloging.template.form.name',
              })}
              fullWidth
              id="input-template-name"
              withRef
              validationEnabled={false}
              component="input"
            />
          </Col>
          <Button
            type="button"
            onClick={this.OnCancel}
            buttonStyle="primary"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={this.onOpen}
            buttonStyle="primary"
          >
            Open
          </Button>
        </Row>
        <Row>
          <Select
            dataOptions={[
              { value: "b", label: "b" },
            ]}
          />
          <Col xs={6}>
            <Field
              style={{
                width: 100 + '%',
              }}
              label={formatMsg({
                id: 'ui-cataloging.template.form.name',
              })}
              value="eeee"
              name="tssag"
              placeholder={formatMsg({
                id: 'ui-cataloging.template.form.name',
              })}
              aria-label={formatMsg({
                id: 'ui-cataloging.template.form.name',
              })}
              fullWidth
              id="input-template-name"
              withRef
              validationEnabled={false}
              component="input"
            />
          </Col>
          <Button
            type="button"
            onClick={this.OnCancel}
            buttonStyle="primary"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={this.onOpen}
            buttonStyle="primary"
          >
            Open
          </Button>
        </Row>
        <Row>
          <Select
            dataOptions={[
              { value: "a", label: "a" },
            ]}
          />
          <Col xs={6}>
            <Field
              style={{
                width: 100 + '%',
              }}
              label={formatMsg({
                id: 'ui-cataloging.template.form.name',
              })}
              name="nssdasdame"
              placeholder={formatMsg({
                id: 'ui-cataloging.template.form.name',
              })}
              aria-label={formatMsg({
                id: 'ui-cataloging.template.form.name',
              })}
              fullWidth
              id="input-template-name"
              withRef
              validationEnabled={false}
              component="input"
            />
          </Col>
          <Button
            type="button"
            onClick={this.OnCancel}
            buttonStyle="primary"
          >
            Add Subfield
          </Button>
        </Row>
        <Button
          type="button"
          onClick={this.handleForm}
          buttonStyle="primary"
          style={{ minHeight: '36px' }}
        >
          Add Tag
        </Button>
        <hr />
      </form>
    );
  }
}
export default reduxForm({
  form: 'tagForm',
  initialValues: {
    name: 'some value here'
  },
  validate,
})(TagForm);
