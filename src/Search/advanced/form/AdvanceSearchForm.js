/**
 * @format
 * @flow
 */
import React from 'react';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import RadioButton from '@folio/stripes-components/lib/RadioButton';
import RadioButtonGroup from '@folio/stripes-components/lib/RadioButtonGroup';
import Select from '@folio/stripes-components/lib/Select';
import { Field, reduxForm } from 'redux-form';
import Button from '@folio/stripes-components/lib/Button';
import ScanButton from '../button/ScanButton';
import SearchButton from '../button/SearchButton';
import { formatSearchQuery } from '../../../Utils/Formatter';
import * as C from '../../../Utils';
import LogicalButton from '../button/LogicalButton';
import css from '../../style/Search.css';
import AdavnceSearchInput from './AdvanceSearchInput';

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
      this.props.resources.query = '';
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
            <form name="advancedSearchForm" id="advancedSearchForm">
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
              <div className="selectContainer">
                <Col xs={12} className={css.colFirstSelect}>
                  {categories &&
                  <Select
                    name="categorySelect"
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
                    value={this.state.thirdSelect}
                    onChange={this.handleChangeThirdSelect}
                  >
                    <option value="">--</option>
                    {optionsConstraintIndex}
                  </Select>
                  }
                </Col>
              </div>
              <Col xs={12}>
                <div className={css.colQuery}>
                  <LogicalButton {...this.props} handleTextAreaValue={this.handleTextAreaValue} />
                  <AdavnceSearchInput onChange={this.handleChange} />
                  <Row>
                    <Col xs={6}>
                      <SearchButton
                        data={this.state.value}
                        {...this.props}
                      />
                    </Col>
                    <Col xs={6}>
                      <ScanButton data={this.state.value} {...this.props} />
                    </Col>
                    <Col xs={12}>
                      <Button
                        {...this.props}
                        onClick={this.handleClick}
                        type="button"
                        buttonStyle="primary"
                        buttonClass={css.largeBox}
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
  enableReinitialize: true,
  fields: ['searchTextArea']
})(AdvanceSearchForm);
