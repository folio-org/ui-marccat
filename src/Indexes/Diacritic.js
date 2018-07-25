import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import Button from '@folio/stripes-components/lib/Button';
import { SearchButton } from './';
import * as C from '../Utils';
import MultiColumnListDiacritic from './components/MultiColumnListDiacritic';

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
};

class Diacritic extends Component<DiacriticProps, DiacriticState> {
  constructor(props: DiacriticProps) {
    super(props);
    this.state = {
      value: '', //eslint-disable-line
      charCopied: '', //eslint-disable-line
      isOpen: false, //eslint-disable-line
    };
    /** bind handler * */
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });//eslint-disable-line
  };

  onRowClick = (rowMetadata) => {
    const char = rowMetadata.currentTarget.children[1].innerText;
    this.state.charCopied = char;
    this.setState({ charCopied: char });
    this.props.change('charCopied', 'AAAAA');
  }

  handleSubmit = () => { };

  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;
    const { pristine, reset, submitting } = this.props;

    return (
      <Paneset static>
        <Pane
          paneTitle={formatMsg({
            id: 'ui-marccat.diacritic.title',
          })}
          paneSub={formatMsg({
            id: 'ui-marccat.diacritic.subTitle',
          })}
          appIcon={{ app: C.META.ICON_TITLE }}
        >
          <form name="diacriticForm" id="diacriticForm" onSubmit={this.handleSubmit}>
            <Row>
              <Col xs={12}>
                <Field style={{ width: '100%' }} placeholder="Type a word..." rows="8" name="search_textarea_diacritic" id="search_textarea_diacritic" component="textarea" />
              </Col>
              <Col xs={12} style={{ paddingTop: '30px' }}>
                <SearchButton {...this.props} />
                <Button
                  type="button"
                  disabled={submitting || pristine}
                  onClick={reset}
                  buttonStyle="primary"
                  style={{ minHeight: '36px' }}
                >{formatMsg({
                    id: 'ui-marccat.search.clear',
                  })}
                </Button>
              </Col>
            </Row>
            <Row style={{ marginBottom: '30px' }}>
              <Col xs={12} sm={6} md={4} style={{ paddingTop: '30px' }}>
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
                  placeholder={this.state.charCopied}
                />
              </Col>
            </Row>
            <Row>
              <MultiColumnListDiacritic
                {...this.props}
                onRowClick={this.onRowClick}
              />
            </Row>
          </form>

        </Pane>
      </Paneset>
    );
  }
}

export default reduxForm({
  form: 'diacriticForm', // a unique identifier for this form
  initialValues: {},
})(Diacritic);
