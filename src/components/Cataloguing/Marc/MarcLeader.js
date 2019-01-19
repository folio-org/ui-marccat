/**
 * @format
 * @flow
 */
import React from 'react';
import { Field } from 'redux-form';
import { cloneDeep } from 'lodash';
import { Row, Col, Select } from '@folio/stripes/components';
import type { Props } from '../../../core';
import MarcField from './MarcField';
import { EMPTY_MESSAGE, SPACED_STRING } from '../../../utils/Constant';
import { ActionTypes } from '../../../redux/actions/Actions';
import { decamelizify } from '../Utils/MarcUtils';
import style from '../Style/style.css';


type P = Props & {
  readOnly: boolean,
  leaderData: Object,
  leaderCode: number,
  leaderValue: string,
}
export default class MarcLeader extends React.Component<P, {}> {
  constructor(props: Props) {
    super(props);
    this.state = {
      leaderDataDispatched: false,
      leaderCss: false,
      leader: props.leaderValue,
    };
    this.handleLeader = this.handleLeader.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  /**
   *
   * @param {*} string - a currnt leader
   * @param {*} index - index to replace
   * @param {*} replace - a mutate leader
   */
  replaceAt(string, index, replace) {
    this.setState((prevState) => {
      const newState = cloneDeep(prevState);
      const newLeader = Object.assign({}, prevState.leader);
      newState.leader = newLeader.substring(0, index) + replace + newLeader.substring(index + 1);
      return newState;
    });
  }

  handleChange = () => {
    const { store: { getState } } = this.props;
    const { leader } = this.state;
    const formData = getState().form.bibliographicRecordForm.values;
    Object.keys(formData)
      .forEach((k) => {
        if (k.split('-')[0] === 'Leader') {
          switch (k.split('-')[1]) {
          case 'itemRecordStatusCode': this.replaceAt(leader, 5, formData[k]); break;
          case 'itemRecordTypeCode': this.replaceAt(leader, 6, formData[k]); break;
          case 'itemBibliographicLevelCode': this.replaceAt(leader, 7, formData[k]); break;
          case 'itemControlTypeCode': this.replaceAt(leader, 8, formData[k]); break;
          case 'characterCodingSchemeCode': this.replaceAt(leader, 9, formData[k]); break;
          case 'encodingLevel': this.replaceAt(leader, 17, formData[k]); break;
          case 'descriptiveCataloguingCode': this.replaceAt(leader, 18, formData[k]); break;
          case 'linkedRecordCode': this.replaceAt(leader, 19, formData[k]); break;
          default: break;
          }
        }
      });
  };

  render() {
    const { leaderCss, leader } = this.state;
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
          withIcon
          onClick={this.handleLeader}
          value={(leader) || leaderValue}
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
                              id={`${item.name}`}
                              name={`Leader-${item.name}`}
                              label={decamelizify(`${item.name}`, SPACED_STRING)}
                              component={Select}
                              dataOptions={item.dropdownSelect}
                              placeholder={exactDisplayValue}
                              onChange={this.handleChange}
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
