/**
 * @format
 * @flow
 */
import * as React from 'react';
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
import CategorySelect from '../select/CategorySelect';
import IndexesSelect from '../select/IndexesSelect';

type AdvanceSerachFormProps = {
    stripes: Object;
    mutator: Object;
    resources: Object;
    onSelectIndex: Function;
    onSelectConstraint: Function;
    translate: (o:Object) => void;
    change: Function;
    reset: Function;
};
type AdvanceSerachFormState = {
    value: string;
    firstSelect: React.ReactNode;
    secondSelect: React.ReactNode;
    thirdSelect: React.ReactNode;
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

    handleChangeFirstSelect = (event: React.SyntheticEvent<>) => {
      this.setState({
        firstSelect: event.target.value,
      });
      this.props.mutator.innerIndexValue.replace(event.target.value);
      this.props.mutator.constraintIndexValue.replace('LIB');
    };

    handleChangeSecondSelect = (event: React.SyntheticEvent<>) => {
      this.setState({
        secondSelect: event.target.value,
      });
      const newValue = this.state.value + ' ' + event.target.value + ' ';
      this.props.change('searchTextArea', newValue);
      this.setState({ value: newValue });
      this.props.mutator.constraintIndexValue.replace(event.target.value);
      this.props.onSelectIndex(event.target.value);
    };

    handleChangeThirdSelect = (event: React.SyntheticEvent<>) => {
      const splitted = event.target.value.split(C.SEPARATOR);
      this.setState({
        thirdSelect: event.target.value,
      });
      const newValue = this.state.value + ' ' + formatSearchQuery(event.target.value) + ' ';
      this.props.change('searchTextArea', newValue);
      this.setState({ value: newValue });
      this.props.onSelectConstraint(splitted[0], splitted[1]);
    }

    handleChange = (event: React.SyntheticEvent<>) => {
      this.setState({ value: event.target.value });
    }

    handleClick = () => {
      this.props.reset();
      this.setState({
        value: ''
      });
      this.props.resources.query = '';
    };

    handleChangeRadio = (event: React.SyntheticEvent<>) => {
      this.setState({
        checkedFirstRadio: (event.target.value === 'P'),
      });
      this.props.mutator.indexType.replace(event.target.value);
      this.props.mutator.constraintIndexValue.replace('LIB');
    };

    handleTextAreaValue = (text: string) => {
      const newValue = this.state.value + ' ' + text.toUpperCase() + ' ';
      this.setState({ value: newValue });
      this.props.change('searchTextArea', newValue);
    }

    render() {
      const { translate, resources: { categories, innerIndexes, constraintIndexes } } = this.props;
      let optionsConstraintIndex = {};

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
              <Field
                name="indexRadio"
                component={RadioButtonGroup}
                label={translate({ id: 'ui-marccat.search.indexes' })}
              >
                <RadioButton
                  label={translate({ id: 'ui-marccat.search.primary' })}
                  id="actingSponsor001"
                  name="actingSponsor001"
                  value="P"
                  checked={this.state.checkedFirstRadio}
                  onChange={this.handleChangeRadio}
                  inline
                />
                <RadioButton
                  label={translate({ id: 'ui-marccat.search.secondary' })}
                  id="actingSponsor002"
                  value="S"
                  checked={!this.state.checkedFirstRadio}
                  onChange={this.handleChangeRadio}
                  inline
                />
              </Field>
              <div className="selectContainer">
                <CategorySelect
                  {...this.props}
                  categories={categories}
                  value={this.state.firstSelect}
                  onChange={this.handleChangeFirstSelect}
                />
                <IndexesSelect
                  {...this.props}
                  innerIndexes={innerIndexes}
                  value={this.state.secondSelect}
                  onChange={this.handleChangeSecondSelect}
                />
                <Col xs={12}>
                  {constraintIndexes && constraintIndexes.records.length > 0 &&
                  <Select
                    marginBottom0
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
