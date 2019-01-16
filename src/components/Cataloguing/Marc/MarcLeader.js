/**
 * @format
 * @flow
 */
import React from 'react';
import { Field } from 'redux-form';
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
      leaderChanged: props.leaderValue,
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

  replaceAt(string, index, replace) {
    this.setState({
      leaderChanged: string.substring(0, index) + replace + string.substring(index + 1)
    });
  }

  handleChange = () => {
    const { store: { getState } } = this.props;
    const { leaderChanged } = this.state;
    const formData = getState().form.bibliographicRecordForm.values;
    Object.keys(formData)
      .forEach((z) => {
        if (z.split('-')[0] === 'Leader') {
          switch (z.split('-')[1]) {
          case 'itemRecordStatusCode': this.replaceAt(leaderChanged, 5, formData[z]); break;
          case 'itemRecordTypeCode': this.replaceAt(leaderChanged, 6, formData[z]); break;
          case 'itemBibliographicLevelCode': this.replaceAt(leaderChanged, 7, formData[z]); break;
          case 'itemControlTypeCode': this.replaceAt(leaderChanged, 8, formData[z]); break;
          case 'characterCodingSchemeCode': this.replaceAt(leaderChanged, 9, formData[z]); break;
          case 'encodingLevel': this.replaceAt(leaderChanged, 17, formData[z]); break;
          case 'descriptiveCataloguingCode': this.replaceAt(leaderChanged, 18, formData[z]); break;
          case 'linkedRecordCode': this.replaceAt(leaderChanged, 19, formData[z]); break;
          default: break;
          }
        }
      });
  };

  render() {
    const { leaderCss, leaderChanged } = this.state;
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
          value={(leaderChanged) || leaderValue}
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
