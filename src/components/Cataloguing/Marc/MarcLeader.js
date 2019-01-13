/**
 * @format
 * @flow
 */
import React from 'react';
import { Field } from 'redux-form';
import { Row, Col, Select } from '@folio/stripes/components';
import { injectCommonProp, Props } from '../../../core';
import MarcField from './MarcField';
import { EMPTY_MESSAGE, SPACED_STRING } from '../../../utils/Constant';
import style from '../Style/style.css';
import { ActionTypes } from '../../../redux/actions/Actions';
import { decamelizify } from '../Utils/MarcUtils';


type P = Props & {
  readOnly: boolean,
  leaderData: Object,
  leaderCode: number,
  leaderValue: string,
}
export class MarcLeader extends React.Component<P, {}> {
  constructor(props: Props) {
    super(props);
    this.state = {
      leaderDataDispatched: false,
      leaderCss: false,
    };
    this.handleLeader = this.handleLeader.bind(this);
  }

  handleLeader = () => {
    const { leaderCss, leaderDataDispatched } = this.state;
    const { dispatch, leaderValue, leaderCode } = this.props;
    if (!leaderDataDispatched) {
      dispatch({ type: ActionTypes.LEADER_VALUES_FROM_TAG, leader: leaderValue, code: leaderCode, typeCode: '15' });
      this.setState({
        leaderDataDispatched: true
      });
    }
    this.setState({
      leaderCss: !leaderCss
    });
  };

  render() {
    const { leaderCss } = this.state;
    const { leaderData, leaderValue } = this.props;
    const remappedValues = [];
    if (leaderData) {
      const result = Object.keys(leaderData.results).map((key) => leaderData.results[key]);
      remappedValues.push(result);
    }
    return (
      <div className={style.controlFieldContainer}>
        <MarcField
          {...this.props}
          readOnly
          label="Leader"
          name="Leader"
          onClick={() => this.handleLeader()}
          value={leaderValue}
        />
        {leaderData &&
          <div className={(leaderCss) ? style.leaderResultsActive : style.leaderResults}>
            <div className={style.leaderData} id="leaderData">
              <Row xs={12}>
                {leaderData &&
                    remappedValues.map(elem => {
                      return elem.map(item => {
                        let exactDisplayValue = EMPTY_MESSAGE;
                        item.dropdownSelect.filter(x => (x.value === item.defaultValue ? exactDisplayValue = x.label : exactDisplayValue));
                        return (
                          <Col xs={4}>
                            <Field
                              id={`Leader-${item.name}`}
                              name={`Leader-${item.name}`}
                              label={decamelizify(`${item.name}`, SPACED_STRING)}
                              component={Select}
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
          </div>
        }
      </div>
    );
  }
}


export default (injectCommonProp(MarcLeader));
