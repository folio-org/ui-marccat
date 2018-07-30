import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Button from '@folio/stripes-components/lib/Button';
import { SearchButton } from './';

type DiacriticProps = {
  charCopied: string;
  stripes: Object;
  onRowClick: Function,
  pristine: boolean,
  reset: boolean,
  submitting: boolean,
};

type DiacriticState = {
  value: string;
  isOpen: boolean;
  charCopied: string;
};

class Diacritic extends Component<DiacriticProps, DiacriticState> {
  constructor(props: DiacriticProps) {
    super(props);
    this.state = {
      value: '',                                                      //eslint-disable-line
      charCopied: '',                                                 //eslint-disable-line
      isOpen: false,                                                  //eslint-disable-line
    };
    /** bind handler * */
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });                      //eslint-disable-line
  };

  handleSubmit = () => { };

  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;
    const { pristine, reset, submitting } = this.props;
    return (
      <div>
        <form name="diacriticForm" id="diacriticForm" onSubmit={this.handleSubmit}>
          <Row>
            <Col xs={12}>
              <Field style={{ width: '100%' }} placeholder="Type a word..." rows="2" name="search_textarea_diacritic" id="search_textarea_diacritic" component="textarea" />
            </Col>
            <Col xs={12} style={{ paddingTop: '10px', display: 'flex' }}>
              <SearchButton {...this.props} />
              <Button
                type="button"
                disabled={submitting || pristine}
                onClick={reset}
                buttonStyle="primary"
                style={{ width: '50%' }}
              >{formatMsg({ id: 'ui-marccat.search.clear' })}
              </Button>
            </Col>
          </Row>
          <Row style={{ marginBottom: '15px' }}>
            <Col xs={12} style={{ paddingTop: '10px' }}>
              <h5 style={{ display: 'inline', paddingRight: '10px' }}>{formatMsg({
                id: 'ui-marccat.diacritic.char.copied',
              })}
              </h5>
              <Field
                id="charCopied"
                label="Char Copied"
                name="charCopied"
                component="input"
                type="text"
                placeholder="Select a row..."
                value={this.state.charCopied}
              />
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'diacriticForm', // a unique identifier for this form
  initialValues: {},
})(Diacritic);
