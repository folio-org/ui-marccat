/**
 * @format
 * @flow
 */
import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { head } from 'ramda';
import { Row, Col, Select } from '@folio/stripes/components';
import { injectCommonProp, Props } from '../../../../core';
import { ActionTypes } from '../../../../redux/actions';
import { decamelizify } from '../../../../shared/Function';
import { RECORD_FIELD_STATUS, FIXED_FIELD_TEMPLATE, TAGS } from '../..';
import { EMPTY_SPACED_STRING, EMPTY_STRING } from '../../../../shared/Constants';
import { TAG006_DISPLAY_VALUE_DEFAULT } from '../../Utils/MarcUtils';

export class Tag006 extends React.Component<Props, {}> {
  handleOnChange = (e) => {
    const { dispatch, record, leaderValue, change } = this.props;
    const headerTypeCode = (e && e.target) ? e.target.value : 16;
    dispatch(change('Tag006', headerTypeCode));
    dispatch({ type: ActionTypes.VALUES_FROM_TAG_006, leader: leaderValue, code: TAGS._006, typeCode: headerTypeCode });
    record.fields.push(FIXED_FIELD_TEMPLATE(TAGS._006, headerTypeCode, TAG006_DISPLAY_VALUE_DEFAULT));
    head(record.fields.filter(f => f.code === TAGS._006)).fieldStatus = RECORD_FIELD_STATUS.NEW;
  }

  render() {
    const { headerTypesResult, tag006ValuesResults } = this.props;
    const remappedValues = [];
    if (tag006ValuesResults) {
      const result = Object.keys(tag006ValuesResults.results).map((key) => tag006ValuesResults.results[key]);
      remappedValues.push(result);
    } else {
      this.handleOnChange();
    }
    return (headerTypesResult) ? (
      <div>
        <Row>
          <Col xs={4}>
            <Field
              id="Tag006"
              name="Tag006"
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
            (tag006ValuesResults) &&
              remappedValues.map(elem => {
                return elem.map(item => {
                  let exactDisplayValue = EMPTY_STRING;
                  item.dropdownSelect.filter(x => (x.value === item.defaultValue ? exactDisplayValue = x.label : exactDisplayValue));
                  return (
                    <Col xs={4}>
                      <Field
                        component={Select}
                        name={`Tag006-${item.name}`}
                        id={`Tag006-${item.name}`}
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
  ({ marccat: { data, headerTypes006, tag006Values } }) => ({
    leaderValue: data.emptyRecord.results.leader.value,
    headerTypesResult: headerTypes006.records,
    tag006ValuesResults: tag006Values.records
  }),
)(injectCommonProp(Tag006)));
