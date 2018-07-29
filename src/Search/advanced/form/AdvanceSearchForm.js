import React from 'react';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import RadioButton from '@folio/stripes-components/lib/RadioButton';
import RadioButtonGroup from '@folio/stripes-components/lib/RadioButtonGroup';
import Select from '@folio/stripes-components/lib/Select';
import { Field, reduxForm } from 'redux-form';
import Button from '@folio/stripes-components/lib/Button';
import { FormattedMessage } from 'react-intl';
import Headline from '@folio/stripes-components/lib/Headline';
import ScanButton from '../button/ScanButton';
import SearchButton from '../button/SearchButton';
import { formatSearchQuery } from '../../../Utils/Formatter';
import * as C from '../../../Utils';

type AdvanceSerachFormProps = {
    stripes: Object;
    mutator: Object;
    resources: Object;
    onSelectIndex: Function;
    onSelectConstraint: Function;
    change: Function;
    reset: Function;
};
type AdvanceSerachFormState = {
    value: string;
    firstSelect: React.node;
    secondSelect: React.node;
    thirdSelect: React.node;
    checkedFirstRadio: boolean;
};


class AdvanceSearchForm extends
  React.Component<AdvanceSerachFormProps, AdvanceSerachFormState> {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      firstSelect: '',
      secondSelect: '',
      thirdSelect: '',
      checkedFirstRadio: true,
    };
    this.handleChangeRadio = this.handleChangeRadio.bind(this);
    this.handleChangeFirstSelect = this.handleChangeFirstSelect.bind(this);
    this.handleChangeSecondSelect = this.handleChangeSecondSelect.bind(this);
    this.handleChangeThirdSelect = this.handleChangeThirdSelect.bind(this);
    this.handleTextAreaValue = this.handleTextAreaValue.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

    handleChangeFirstSelect = event => {
      this.setState({
        firstSelect: event.target.value,
      });
      this.props.mutator.innerIndexValue.replace(event.target.value);
      this.props.mutator.constraintIndexValue.replace('LIB');
    };

    handleChangeSecondSelect = event => {
      this.setState({
        secondSelect: event.target.value,
      });
      const newValue = this.state.value + ' ' + event.target.value + ' ';
      this.props.change('searchTextArea', newValue);
      this.setState({ value: newValue });
      this.props.mutator.constraintIndexValue.replace(event.target.value);
      this.props.onSelectIndex(event.target.value);
    };

    handleChangeThirdSelect = event => {
      const splitted = event.target.value.split(C.SEPARATOR);
      this.setState({
        thirdSelect: event.target.value,
      });
      const newValue = this.state.value + ' ' + formatSearchQuery(event.target.value) + ' ';
      this.props.change('searchTextArea', newValue);
      this.setState({ value: newValue });
      this.props.onSelectConstraint(splitted[0], splitted[1]);
    }

    handleChange(event) {
      this.setState({ value: event.target.value });
    }

    handleClick = () => {
      this.props.reset();
      this.setState({
        value: ''
      });
    };

    handleChangeRadio = event => {
      this.setState({
        checkedFirstRadio: (event.target.value === 'P'),
      });
      this.props.mutator.indexType.replace(event.target.value);
      this.props.mutator.constraintIndexValue.replace('LIB');
    };

    handleTextAreaValue = (text) => {
      const newValue = this.state.value + ' ' + text + ' ';
      this.setState({ value: newValue });
      this.props.change('searchTextArea', newValue);
    }

    render() {
      const formatMsg = this.props.stripes.intl.formatMessage;
      const { resources: { categories, innerIndexes, constraintIndexes } } = this.props;
      let options = {};
      let optionsInnerIndex = {};
      let optionsConstraintIndex = {};
      const { value } = this.state;

      if (categories) {
        options = categories.records.map((element) => (
          <option key={element.value} value={element.value}>{element.label}</option>
        ));
      }

      if (innerIndexes) {
        optionsInnerIndex = innerIndexes.records.map((element) => (
          <option key={element.value} value={element.value}>{element.label} ({element.value})</option>
        ));
      }

      if (constraintIndexes) {
        optionsConstraintIndex = constraintIndexes.records.map((element) => {
          const valueLabel = element.value + C.SEPARATOR + element.label;
          return (
            <option key={element.value} value={valueLabel}> {element.label} </option>
          );
        });
      }
      return (
        <Row>
          <Col xs={12}>
            <form name="advancedSearchForm" id="advancedSearchForm" noValidate>
              <Field name="indexRadio" component={RadioButtonGroup} label={formatMsg({ id: 'ui-marccat.search.indexes' })}>
                <RadioButton
                  label={formatMsg({ id: 'ui-marccat.search.primary' })}
                  id="actingSponsor001"
                  name="actingSponsor001"
                  value="P"
                  checked={this.state.checkedFirstRadio}
                  onChange={this.handleChangeRadio}
                  inline
                />
                <RadioButton
                  label={formatMsg({ id: 'ui-marccat.search.secondary' })}
                  id="actingSponsor002"
                  value="S"
                  checked={!this.state.checkedFirstRadio}
                  onChange={this.handleChangeRadio}
                  inline
                />
              </Field>
              <Col xs={12} style={{ marginTop: '20px' }}>
                {categories &&
                  <Select
                    name="testSelect"
                    value={this.state.firstSelect}
                    onChange={this.handleChangeFirstSelect}
                  >
                    {options}
                  </Select>
                }
              </Col>
              <Col xs={12}>
                {innerIndexes &&
                  <Select
                    native
                    value={this.state.secondSelect}
                    onChange={this.handleChangeSecondSelect}
                  >
                    <option value="">--</option>
                    {optionsInnerIndex}
                  </Select>
                }
              </Col>
              <Col xs={12}>
                {constraintIndexes && constraintIndexes.records.length > 0 &&
                  <Select
                    native
                    value={this.state.thirdSelect}
                    onChange={this.handleChangeThirdSelect}
                  >
                    <option value="">--</option>
                    {optionsConstraintIndex}
                  </Select>
                }
              </Col>
              <Col xs={12}>
                <div style={{ marginTop: '50px' }}>
                  <Row>
                    <Col xs={4}>
                      <Headline size="small" margin="medium" tag="h4">
                       Typed a Query:
                      </Headline>
                    </Col>
                    <Col xs={8}>
                      <Button
                        {...this.props}
                        type="button"
                        buttonStyle="primary"
                        onClick={() => this.handleTextAreaValue('AND')}
                      >
                        <FormattedMessage id="ui-marccat.search.andButton" />
                      </Button>
                      <Button
                        {...this.props}
                        type="button"
                        buttonStyle="primary"
                        onClick={() => this.handleTextAreaValue('NEAR')}
                      >
                        <FormattedMessage id="ui-marccat.search.nearButton" />
                      </Button>
                      <Button
                        {...this.props}
                        type="button"
                        buttonStyle="primary"
                        onClick={() => this.handleTextAreaValue('NOT')}
                      >
                        <FormattedMessage id="ui-marccat.search.notButton" />
                      </Button>
                      <Button
                        {...this.props}
                        type="button"
                        buttonStyle="primary"
                        onClick={() => this.handleTextAreaValue('OR')}
                      >
                        <FormattedMessage id="ui-marccat.search.orButton" />
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <Field value={value} onChange={this.handleChange} rows="8" name="searchTextArea" id="searchTextArea" component="textarea" style={{ width: '100%' }} />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={6}>
                      <SearchButton data={this.state.value} {...this.props} />
                    </Col>
                    <Col xs={6}>
                      <ScanButton {...this.props} />
                    </Col>
                    <Col xs={12}>
                      <Button
                        {...this.props}
                        onClick={this.handleClick}
                        type="button"
                        buttonStyle="primary"
                        style={{ width: '100%' }}
                      >
                      Reset
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Col>
            </form>
          </Col>
        </Row>
      );
    }
}

export default reduxForm({
  form: 'advancedSearchForm',
  initialValues: {
    name: 'actingSponsor001',
    value: 'P',
  },
  enableReinitialize: true
})(AdvanceSearchForm);
