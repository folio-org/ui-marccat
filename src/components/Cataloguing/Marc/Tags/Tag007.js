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
import { FIXED_FIELD_TEMPLATE, RECORD_FIELD_STATUS, TAGS } from '../..';
import { EMPTY_SPACED_STRING, EMPTY_STRING } from '../../../Shared/Constants';

export class Tag007 extends React.Component<Props, {}> {
  constructor(props:Props) {
    super(props);
    this.state = {
      isChangedHeaderType: false,
    };
  }

  handleOnChange = (e) => {
    const { dispatch, record, leaderValue } = this.props;
    const headerTypeCode = e.target.value;
    dispatch({ type: ActionTypes.VALUES_FROM_TAG_007, leader: leaderValue, code: TAGS._007, typeCode: headerTypeCode });
    this.state.isChangedHeaderType = true;
    record.fields.push(FIXED_FIELD_TEMPLATE(TAGS._007, headerTypeCode));
    record.fields.filter(f => f.code === TAGS._007)[0].fieldStatus = RECORD_FIELD_STATUS.NEW;
  }

  render() {
    const { headerTypesResult, tag007ValuesResults } = this.props;
    const { isChangedHeaderType } = this.state;
    const remappedValues = [];
    if (isChangedHeaderType && tag007ValuesResults) {
      const result = Object.keys(tag007ValuesResults.results).map((key) => tag007ValuesResults.results[key]);
      remappedValues.push(result);
    }
    return (headerTypesResult) ? (
      <div>
        <Row>
          <Col xs={4}>
            <Field
              id="Tag007"
              name="Tag007"
              component={Select}
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
            (isChangedHeaderType === true && tag007ValuesResults) &&
              remappedValues.map(elem => {
                return elem.map(item => {
                  let exactDisplayValue = EMPTY_STRING;
                  item.dropdownSelect.filter(x => (x.value === item.defaultValue ? exactDisplayValue = x.label : exactDisplayValue));
                  return (
                    <Col xs={4}>
                      <Field
                        component={Select}
                        name={`Tag007-${item.name}`}
                        id={`Tag007-${item.name}`}
                        label={decamelizify(`${item.name}`, EMPTY_SPACED_STRING)}
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
  ({ marccat: { template, headerTypes007, tag007Values } }) => ({
    leaderValue: template.recordsById.leader.value,
    headerTypesResult: headerTypes007.records,
    tag007ValuesResults: tag007Values.records
  }),
)(injectCommonProp(Tag007)));
