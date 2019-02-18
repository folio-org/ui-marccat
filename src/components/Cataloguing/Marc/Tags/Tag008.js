/**
 * @format
 * @flow
 */
import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { Row, Col, Select } from '@folio/stripes/components';
import { injectCommonProp, Props } from '../../../../core';
import { ActionTypes } from '../../../../redux/actions';
import { decamelizify } from '../..';
import * as C from '../../../../utils/Constant';
import { RECORD_FIELD_STATUS, TAGS } from '../../Utils/MarcUtils';


export class Tag008 extends React.Component<Props, {}> {
  constructor(props:Props) {
    super(props);
    this.state = {
      isChangedHeaderType: false,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange = (e) => {
    const { dispatch, leaderValue, record } = this.props;
    const headerTypeCode = e.target.value;
    dispatch({ type: ActionTypes.VALUES_FROM_TAG_008, leader: leaderValue, code: TAGS._008, typeCode: headerTypeCode || 31 });
    this.state.isChangedHeaderType = true;
    record.fields.filter(f => f.code === TAGS._008)[0].fieldStatus = RECORD_FIELD_STATUS.CHANGED;
  }

  populateFirstAccess = () => {
    const { record } = this.props;
    this.state.isChangedHeaderType = true;
    record.fields.filter(f => f.code === TAGS._008)[0].fieldStatus = RECORD_FIELD_STATUS.CHANGED;
  };

  render() {
    const { headerTypesResult, tag008ValuesResults } = this.props;
    const { isChangedHeaderType } = this.state;
    if (!tag008ValuesResults) this.populateFirstAccess();
    const remappedValues = [];
    if (isChangedHeaderType && tag008ValuesResults) {
      const result = Object.keys(tag008ValuesResults.results).map((key) => tag008ValuesResults.results[key]);
      remappedValues.push(result);
    }
    return (headerTypesResult) ? (
      <div>
        <Row>
          <Col xs={4}>
            <Select
              id="Tag008"
              name="Tag008"
              onChange={this.handleOnChange}
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
                return elem.map(item => {
                  let exactDisplayValue = C.EMPTY_MESSAGE;
                  item.dropdownSelect.filter(x => (x.value === item.defaultValue ? exactDisplayValue = x.label : exactDisplayValue));
                  return (
                    <Col xs={4}>
                      <Field
                        name={`Tag008-${item.name}`}
                        id={`Tag008-${item.name}`}
                        component={Select}
                        label={decamelizify(`${item.name}`, C.SPACED_STRING)}
                        dataOptions={item.dropdownSelect}
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
