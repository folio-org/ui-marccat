/**
 * @format
 * @flow
 */
import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Icon, Selection } from '@folio/stripes/components';
import { injectCommonProp, Props } from '../../../../core';
import style from '../../Style/style.css';

export class CustomLeader extends React.Component<Props, {}> {
  constructor(props:Props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { leaderValuesResults } = this.props;
    const remappedValues = [];
    if (leaderValuesResults) {
      const result = Object.keys(leaderValuesResults.results).map((key) => leaderValuesResults.results[key]);
      remappedValues.push(result);
    }
    if (leaderValuesResults === undefined) {
      return <Icon icon="spinner-ellipsis" />;
    } else {
      return (
        <div className={style.rcornerspanel} id="rcornerspanel">
          <Row>
            <Col xs={4}>
             INSERT HERE HEADER VALUEs
            </Col>
          </Row>
          <hr />
          <Row xs={12}>
            {
              (leaderValuesResults) &&
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
  ({ marccat: { leaderValues } }) => ({
    leaderValuesResults: leaderValues.records
  }),
)(injectCommonProp(CustomLeader)));
