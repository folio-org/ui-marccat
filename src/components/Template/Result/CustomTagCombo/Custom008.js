/**
 * @format
 * @flow
 */
import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Icon, Selection } from '@folio/stripes/components';
import { injectCommonProp, Props } from '../../../../core';
import { ActionTypes } from '../../../../redux/actions';
import style from '../style.css';

type P = Props & {
}

export class Custom008 extends React.Component<P, {}> {
  constructor(props) {
    super(props);
    this.state = {
      isChangedHeaderType: false,
    };
  }

  handleOnChange = (e) => {
    const selectedHeaderType = e;
    const { dispatch, leaderValue } = this.props;
    dispatch({ type: ActionTypes.VALUES_FROM_TAG_008, leader: leaderValue, code: '008', typeCode: selectedHeaderType });
    this.state.isChangedHeaderType = true;
  }

  render() {
    const { headerTypesResult, tag008ValuesResults } = this.props;
    const { isChangedHeaderType } = this.state;
    const remappedValues = [];
    if (isChangedHeaderType && tag008ValuesResults) {
      const result = Object.keys(tag008ValuesResults.results).map((key) => tag008ValuesResults.results[key]);
      remappedValues.push(result);
    }
    if (headerTypesResult === undefined || tag008ValuesResults === undefined) {
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
              (isChangedHeaderType === true && tag008ValuesResults) &&
              remappedValues.map(elem => {
                const totInArray = elem.length;
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
  ({ marccat: { template, headerTypes008, tag008Values } }) => ({
    leaderValue: template.recordsById.leader.value,
    headerTypesResult: headerTypes008.records,
    tag008ValuesResults: tag008Values.records
  }),
)(injectCommonProp(Custom008)));
