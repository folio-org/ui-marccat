/**
 * @format
 * @flow
 */
import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { Row, Col, Selection } from '@folio/stripes/components';
import { injectCommonProp, Props } from '../../../core';
import { EMPTY_MESSAGE } from '../../../utils/Constant';

export function MarcLeader({ ...props }:Props) {
  const { leaderValue } = props;
  const remappedValues = [];
  remappedValues.push(Object.keys(leaderValue.results).map((key) => leaderValue.results[key]));
  return (
    <React.Fragment>
      <Row xs={12}>
        {
          (leaderValue) &&
              remappedValues.map(elem => {
                return elem.map(item => {
                  let exactDisplayValue = EMPTY_MESSAGE;
                  item.dropdownSelect.filter(x => (x.value === item.defaultValue ? exactDisplayValue = x.label : exactDisplayValue));
                  return (
                    <Col xs={4}>
                      <Field
                        label={item.name}
                        dataOptions={item.dropdownSelect}
                        placeholder={exactDisplayValue}
                        component={Selection}
                      />
                    </Col>
                  );
                });
              })
        }
      </Row>
    </React.Fragment>
  );
}

export default (connect(
  ({ marccat: { leaderValues } }) => ({
    leaderValue: leaderValues.records.results
  }),
)(injectCommonProp(MarcLeader)));
