/**
 * @format
 * @flow
 */
import React from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { Field } from 'redux-form';
import { Row, Col, Select, TextField } from '@folio/stripes/components';
import { injectCommonProp, Props } from '../../../../core';
import { ActionTypes } from '../../../../redux/actions';
import { decamelizify } from '../../../../shared/Function';
import { RECORD_FIELD_STATUS, TAGS } from '../../Utils/MarcUtils';
import { changeDisplayValueAction } from '../../Actions/MarcActionCreator';
import * as C from '../../../../shared/Constants';


export class Tag008 extends React.Component<Props, {}> {
  constructor(props:Props) {
    super(props);
    this.state = {
      isChangedHeaderType: false,
      currentHeaderTypeCode: String,
      jsonReq: {}
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.changeDisplayValue = this.changeDisplayValue.bind(this);
  }

  handleOnChange = (e) => {
    const { dispatch, leaderValue, record } = this.props;
    const headerTypeCode = e.target.value;
    dispatch({ type: ActionTypes.VALUES_FROM_TAG_008, leader: leaderValue, code: TAGS._008, typeCode: headerTypeCode || 31 });
    this.state.isChangedHeaderType = true;
    record.fields.filter(f => f.code === TAGS._008)[0].fieldStatus = RECORD_FIELD_STATUS.CHANGED;
  }

  populateFirstAccess = () => {
    const { record, leaderValue, dispatch, change } = this.props;
    this.state.isChangedHeaderType = true;
    const tag008 = record.fields.filter(f => f.code === TAGS._008)[0];
    tag008.fieldStatus = RECORD_FIELD_STATUS.CHANGED;
    this.state.currentHeaderTypeCode = tag008.fixedField.headerTypeCode;
    dispatch({ type: ActionTypes.VALUES_FROM_TAG_008, leader: leaderValue, code: TAGS._008, typeCode: tag008.fixedField.headerTypeCode });
    dispatch(change('Tag008', tag008.fixedField.headerTypeCode));
  };

  changeDisplayValue = (e) => {
    const { store: { getState }, dispatch, change } = this.props;
    const { jsonReq, currentHeaderTypeCode } = this.state;
    const changedFieldLabel = e.target.id.split('-')[1];
    let changedFieldValue = '';
    jsonReq.dateEnteredOnFile = getState().form.bibliographicRecordForm.values['008'].substring(0, 6);
    jsonReq.categoryCode = 1;
    jsonReq.sequenceNumber = 0;
    jsonReq.headerTypeCode = currentHeaderTypeCode;
    jsonReq.code = '008';
    jsonReq.displayValue = '';
    if (changedFieldLabel === 'dateFirstPublication' || changedFieldLabel === 'dateLastPublication') {
      changedFieldValue = e.target.value.lenght < 4 ? '' : e.target.value;
    } else {
      changedFieldValue = e.target.selectedOptions[0].value;
    }
    jsonReq[changedFieldLabel] = changedFieldValue;
    dispatch(changeDisplayValueAction(TAGS._008, jsonReq));
    const data = getState().marccat.data;
    if (!isEmpty(data) && !isEmpty(data[`displayvalue-${TAGS._008}`])) {
      const displayValue = data[`displayvalue-${TAGS._008}`].results.displayValue;
      dispatch(change(TAGS._008, displayValue));
    }
  };

  render() {
    const { headerTypesResult, tag008ValuesResults, leaderValue, newValuesFromChangedLeader, dispatch, change } = this.props;
    const { isChangedHeaderType } = this.state;
    if (!tag008ValuesResults) {
      this.populateFirstAccess();
    }
    const remappedValues = [];
    if (isChangedHeaderType && tag008ValuesResults) {
      const result = Object.keys(tag008ValuesResults.results).map((key) => tag008ValuesResults.results[key]);
      remappedValues.push(result);
    }
    const { currentHeaderTypeCode } = this.state;
    if (newValuesFromChangedLeader && newValuesFromChangedLeader.headerTypeCode !== currentHeaderTypeCode) {
      dispatch({ type: ActionTypes.VALUES_FROM_TAG_008, leader: leaderValue, code: TAGS._008, typeCode: newValuesFromChangedLeader.headerTypeCode });
      dispatch(change('Tag008', newValuesFromChangedLeader.headerTypeCode));
      this.setState({ currentHeaderTypeCode: newValuesFromChangedLeader.headerTypeCode });
      this.changeDisplayValue();
    }

    return (headerTypesResult) ? (
      <div>
        <Row>
          <Col xs={4}>
            <Field
              id="Tag008"
              name="Tag008"
              onChange={this.handleOnChange}
              component={Select}
              label="Header types"
              placeholder="Select header..."
              dataOptions={headerTypesResult.headingTypes}
            />
          </Col>
        </Row>
        <hr />
        <Row xs={12}>
          <Col xs={4} key="tag008-dateFirstPublication">
            <Field
              name="tag008-dateFirstPublication"
              id="tag008-dateFirstPublication"
              component={TextField}
              label="dateFirstPublication"
              onChange={this.changeDisplayValue}
            />
          </Col>
          <Col xs={4} key="tag008-dateLastPublication">
            <Field
              name="tag008-dateLastPublication"
              id="tag008-dateLastPublication"
              component={TextField}
              label="dateLastPublication"
              onChange={this.changeDisplayValue}
            />
          </Col>
          {
            (tag008ValuesResults) &&
              remappedValues.map((elem) => {
                return elem.map((item, idx) => {
                  let exactDisplayValue = C.EMPTY_STRING;
                  item.dropdownSelect.filter(x => (x.value === item.defaultValue ? exactDisplayValue = x.value + '-' + x.label : exactDisplayValue));
                  dispatch(change(`Tag008-${item.name}`, exactDisplayValue));
                  return (
                    <Col xs={4} key={`tag008-${idx}`}>
                      <Field
                        name={`Tag008-${item.name}`}
                        id={`Tag008-${item.name}`}
                        component={Select}
                        label={decamelizify(`${item.name}`, C.EMPTY_SPACED_STRING)}
                        dataOptions={item.dropdownSelect}
                        onChange={this.changeDisplayValue}
                        placeholder={exactDisplayValue}
                      />
                    </Col>
                  );
                });
              })
          }
        </Row>
      </div>
    ) : <div />;
  }
}
export default (connect(
  ({ marccat: { headerTypes008, tag008Values, change008ByLeader } }) => ({
    headerTypesResult: headerTypes008.records,
    tag008ValuesResults: tag008Values.records,
    newValuesFromChangedLeader: change008ByLeader.records
  }),
)(injectCommonProp(Tag008)));
