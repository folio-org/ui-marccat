import React from 'react';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import RadioButton from '@folio/stripes-components/lib/RadioButton';
import RadioButtonGroup from '@folio/stripes-components/lib/RadioButtonGroup';
import Select from '@folio/stripes-components/lib/Select';
import { Field, reduxForm } from 'redux-form';
import { AdvanceSearchTextArea } from '../../../Search/';

import * as C from '../../../Utils';

type AdvanceSerachFormProps = {
    stripes: Object;
    mutator: Object;
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
      firstSelect: '',
      secondSelect: '',
      thirdSelect: '',
      checkedFirstRadio: true,
    };
    this.handleChangeRadio = this.handleChangeRadio.bind(this);
    this.handleChangeFirstSelect = this.handleChangeFirstSelect.bind(this);
    this.handleChangeSecondSelect = this.handleChangeSecondSelect.bind(this);
    this.handleChangeThirdSelect = this.handleChangeThirdSelect.bind(this);
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
      this.props.mutator.constraintIndexValue.replace(event.target.value);
      this.props.onSelectIndex(event.target.value);
    };

    handleChangeThirdSelect = event => {
      const splitted = event.target.value.split(C.SEPARATOR);
      this.setState({
        thirdSelect: event.target.value,
      });
      this.props.onSelectConstraint(splitted[0], splitted[1]);
    }

    handleChangeRadio = event => {
      this.setState({
        checkedFirstRadio: (event.target.value === 'P'),
      });
      this.props.mutator.indexType.replace(event.target.value);
      this.props.mutator.constraintIndexValue.replace('LIB');
    };

    render() {
      const formatMsg = this.props.stripes.intl.formatMessage;
      const { resources: { categories, innerIndexes, constraintIndexes } } = this.props;
      let options = {};
      let optionsInnerIndex = {};
      let optionsConstraintIndex = {};

      if (categories) {
        options = categories.records.map((element) => (
          <option value={element.value}>{element.label}</option>
        ));
      }

      if (innerIndexes) {
        optionsInnerIndex = innerIndexes.records.map((element) => (
          <option value={element.value}>{element.label} ({element.value})</option>
        ));
      }

      if (constraintIndexes) {
        optionsConstraintIndex = constraintIndexes.records.map((element) => {
          const valueLabel = element.value + C.SEPARATOR + element.label;
          return (
            <option value={valueLabel}> {element.label} </option>
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
                    name="testSelected"
                    native
                    value={this.state.thirdSelect}
                    onChange={this.handleChangeThirdSelect}
                  >
                    <option value="">--</option>
                    {optionsConstraintIndex}
                  </Select>
                }
              </Col>
            </form>
            <Col xs={12}>
              <AdvanceSearchTextArea {...this.props} />
            </Col>
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
})(AdvanceSearchForm);
