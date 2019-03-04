/**
 * @format
 * @flow
 */
import React from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { Field } from 'redux-form';
import { Row, Col, Select } from '@folio/stripes/components';
import { injectCommonProp, Props } from '../../../../core';
import { ActionTypes } from '../../../../redux/actions';
import { decamelizify } from '../..';
import { RECORD_FIELD_STATUS, TAGS } from '../../Utils/MarcUtils';
import { changeDisplayValueAction } from '../../Actions/MarcActionCreator';
import * as C from '../../../../utils/Constant';


export class Tag008 extends React.Component<Props, {}> {
  constructor(props:Props) {
    super(props);
    this.state = {
      isChangedHeaderType: false,
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
    dispatch({ type: ActionTypes.VALUES_FROM_TAG_008, leader: leaderValue, code: TAGS._008, typeCode: tag008.fixedField.headerTypeCode });
    dispatch(change('Tag008', tag008.fixedField.headerTypeCode));
  };

  changeDisplayValue = () => {
    const { store: { getState }, dispatch, change } = this.props;
    const jsonReq = {};
    const dropdown = getState().form.bibliographicRecordForm.values;
    Object.keys(getState().form.bibliographicRecordForm.registeredFields)
      .filter(k => k.split('-') !== undefined && k.split('-').shift() === 'Tag008')
      .forEach(c => jsonReq[c.split('-')[1]] = C.SPACED_STRING);
    Object.keys(dropdown)
      .filter(k => k.split('-')
        .shift() === 'Tag008')
      .forEach(d => {
        const key = d.split('-')[1];
        const value = dropdown[d] || ' ';
        if (d === 'Tag008') jsonReq.headerTypeCode = value;
        jsonReq[key] = value;
      });

    if (!isEmpty(jsonReq)) {
      jsonReq.categoryCode = 1;
      jsonReq.displayValue = dropdown[TAGS._008];
      jsonReq.code = TAGS._008;
      jsonReq.dateEnteredOnFile = '180924';
      jsonReq.languageCode = 'ita';
      jsonReq.sequenceNumber = 0;
      jsonReq.recordCataloguingSourceCode = 'r';
      jsonReq.dateFirstPublication = '     ';
      jsonReq.dateLastPublication = '     ';
      jsonReq.placeOfPublication = 'ita';
      jsonReq.recordModifiedCode = 'x';
      dispatch(changeDisplayValueAction(TAGS._008, jsonReq));
      const data = getState().marccat.data;
      if (!isEmpty(data) && !isEmpty(data[`displayvalue-${TAGS._008}`])) {
        const displayValue = data[`displayvalue-${TAGS._008}`].results.displayValue;
        dispatch(change(TAGS._008, displayValue));
      }
    }
  };

  render() {
    const { headerTypesResult, tag008ValuesResults } = this.props;
    const { isChangedHeaderType } = this.state;
    if (!tag008ValuesResults) {
      this.populateFirstAccess();
    }
    // } else {
    //   this.changeDisplayValue();
    // }
    const remappedValues = [];
    if (isChangedHeaderType && tag008ValuesResults) {
      const result = Object.keys(tag008ValuesResults.results).map((key) => tag008ValuesResults.results[key]);
      remappedValues.push(result);
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
          {
            (tag008ValuesResults) &&
              remappedValues.map((elem) => {
                return elem.map((item, idx) => {
                  let exactDisplayValue = C.EMPTY_MESSAGE;
                  item.dropdownSelect.filter(x => (x.value === item.defaultValue ? exactDisplayValue = x.label : exactDisplayValue));
                  return (
                    <Col xs={4} key={`tag008-${idx}`}>
                      <Field
                        name={`Tag008-${item.name}`}
                        id={`Tag008-${item.name}`}
                        component={Select}
                        label={decamelizify(`${item.name}`, C.SPACED_STRING)}
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
  ({ marccat: { headerTypes008, tag008Values } }) => ({
    headerTypesResult: headerTypes008.records,
    tag008ValuesResults: tag008Values.records
  }),
)(injectCommonProp(Tag008)));
