/**
 * @format
 * @flow
 */
import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Icon, Selection } from '@folio/stripes/components';
import { injectCommonProp, Props } from '../../../../core';
import { ActionTypes } from '../../../../redux/actions';

import style from '../../Style/style.css';


export class Custom007 extends React.Component<Props, {}> {
  constructor(props:Props) {
    super(props);
    this.state = {
      isChangedHeaderType: false,
    };
  }

  handleOnChange = (e) => {
    const selectedHeaderType = e;
    const { dispatch, leaderValue } = this.props;
    dispatch({ type: ActionTypes.VALUES_FROM_TAG_007, leader: leaderValue, code: '007', typeCode: selectedHeaderType });
    this.state.isChangedHeaderType = true;
  }

  render() {
    const { headerTypesResult, tag007ValuesResults } = this.props;
    const { isChangedHeaderType } = this.state;
    const remappedValues = [];
    if (isChangedHeaderType && tag007ValuesResults) {
      const result = Object.keys(tag007ValuesResults.results).map((key) => tag007ValuesResults.results[key]);
      remappedValues.push(result);
    }
    if (headerTypesResult === undefined) {
      return <Icon icon="spinner-ellipsis" />;
    } else {
      return (
        <div className={style.rcornerspanel} id="rcornerspanel">
          <Row>
            <Col xs={4}>
              <Selection
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
                  let exactDisplayValue = '';
                  item.dropdownSelect.filter(x => (x.value === item.defaultValue ? exactDisplayValue = x.label : exactDisplayValue));
                  return (
                    <Col xs={4}>
                      <Selection
                        label={item.name}
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
      );
    }
  }
}

export default (connect(
  ({ marccat: { template, headerTypes007, tag007Values } }) => ({
    leaderValue: template.recordsById.leader.value,
    headerTypesResult: headerTypes007.records,
    tag007ValuesResults: tag007Values.records
  }),
)(injectCommonProp(Custom007)));
