/**
 * @format
 * @flow
 */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Button from '@folio/stripes-components/lib/Button';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SearchButton } from '../';
import * as C from '../../Utils';
import css from '../style/indexes.css';

type DiacriticProps = {
  charCopied: string;
  stripes: Object;
  onRowClick: Function;
  pristine: boolean;
  reset: boolean;
  submitting: boolean;
  change: Function;
};

type DiacriticState = {
  value: string;
  isOpen: boolean;
  charCopied: string;
};

class Diacritic extends React.Component<DiacriticProps, DiacriticState> {
  static bus;
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

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;
    const { pristine, reset, submitting } = this.props;
    return (
      <div>
        <form name="diacriticForm" id="diacriticForm" onSubmit={this.handleSubmit} noValidate>
          <Row>
            <Col xs={12}>
              <Field className={css.SearchTextArea} placeholder="Type a word..." rows="2" name="search_textarea_diacritic" id="search_textarea_diacritic" component="textarea" />
            </Col>
            <Col xs={12} className={css.CustomColButtons}>
              <SearchButton {...this.props} />
              <Button
                buttonClass={css.CustomButtons}
                type="button"
                disabled={submitting || pristine}
                onClick={reset}
                buttonStyle="primary"
              >{formatMsg({ id: 'ui-marccat.search.clear' })}
              </Button>
            </Col>
          </Row>
          <Row className={css.CustomRow}>
            <Col xs={12} className={css.Col}>
              <h5 className={css.CustomH5}>{formatMsg({
                id: 'ui-marccat.diacritic.char.copied',
              })}
              </h5>
              <Field
                id="charCopied"
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
  form: 'diacriticForm',
  initialValues: {}
})(Diacritic);
