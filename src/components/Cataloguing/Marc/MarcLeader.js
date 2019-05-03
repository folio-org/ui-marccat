// @flow
import * as React from 'react';
import { Field } from 'redux-form';
import { Row, Col, Select } from '@folio/stripes/components';
import type { Props } from '../../../flow/index.js.flow';
import MarcField from './MarcField';
import { EMPTY_STRING, EMPTY_SPACED_STRING } from '../../../config/constants';
import { ACTION } from '../../../redux/actions/Actions';
import style from '../Style/index.css';
import { decamelizify } from '../../../utils/Function';

type P = {
  readOnly: boolean,
  leaderData: Object,
  leaderCode: number,
  leaderValue: string,
} & Props;

export default class MarcLeader extends React.Component<P, {
  leaderDataDispatched: boolean,
  leaderCss: boolean,
  leader: string,
}> {
  constructor(props: Props) {
    super(props);
    this.state = {
      leaderDataDispatched: false,
      leaderCss: false,
      leaderVal: props.leaderValue,
      leaderChangedFor008: false,
    };
    this.handleLeader = this.handleLeader.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleLeader = () => {
    const { leaderCss, leaderDataDispatched } = this.state;
    const { dispatch, leaderValue, leaderCode } = this.props;
    if (!leaderDataDispatched) {
      dispatch({ type: ACTION.LEADER_VALUES_FROM_TAG, leader: leaderValue, code: leaderCode, typeCode: '15' });
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
   * @param {*} string - a current leader
   * @param {*} index - index to replace
   * @param {*} replace - a mutate leader
   */
  replaceAt(string, index, replace) {
    this.setState({
      leaderVal: string.substring(0, index) + replace + string.substring(index + 1),
      leaderChangedFor008: !!((index === 6 || index === 7)),
    });
  }

  handleChange = (e) => {
    const { leaderVal } = this.state;
    const selectedValue = e.target.value;
    const selectedName = e.target.id;
    switch (selectedName) {
    case 'itemRecordStatusCode': this.replaceAt(leaderVal, 5, selectedValue); break;
    case 'itemRecordTypeCode': this.replaceAt(leaderVal, 6, selectedValue); break;
    case 'itemBibliographicLevelCode': this.replaceAt(leaderVal, 7, selectedValue); break;
    case 'itemControlTypeCode': this.replaceAt(leaderVal, 8, selectedValue); break;
    case 'characterCodingSchemeCode': this.replaceAt(leaderVal, 9, selectedValue); break;
    case 'encodingLevel': this.replaceAt(leaderVal, 17, selectedValue); break;
    case 'descriptiveCataloguingCode': this.replaceAt(leaderVal, 18, selectedValue); break;
    case 'linkedRecordCode': this.replaceAt(leaderVal, 19, selectedValue); break;
    default: break;
    }
  }

  render() {
    const { leaderCss, leaderVal } = this.state;
    let { leaderChangedFor008 } = this.state;
    const { leaderData, leaderValue, dispatch } = this.props;
    const remappedValues = [];
    if (leaderChangedFor008 === true) {
      dispatch({ type: ACTION.CHANGE_008_BY_LEADER, leader: leaderVal });
      leaderChangedFor008 = false;
    }
    if (leaderData) {
      const result = Object.keys(leaderData.results).map((key) => leaderData.results[key]);
      remappedValues.push(result);
    }
    return (
      <div className={style.controlFieldContainer}>
        <MarcField
          {...this.props}
          readOnly
          label="leader"
          name="leader"
          onClick={this.handleLeader}
          value={(leaderVal) || leaderValue}
        />
        {leaderData &&
          <div className={(leaderCss) ? style.leaderResultsActive : style.leaderResults}>
            <div className={style.leaderData} id="leaderData">
              <Row xs={12}>
                {leaderData &&
                  remappedValues.map(elem => {
                    return elem.map((item, i) => {
                      let exactDisplayValue = EMPTY_STRING;
                      item.dropdownSelect.filter(x => (x.value === item.defaultValue ? exactDisplayValue = x.label : exactDisplayValue));
                      return (
                        <Col xs={4} key={i}>
                          <Field
                            id={`${item.name}`}
                            name={`Leader-${item.name}`}
                            label={decamelizify(`${item.name}`, EMPTY_SPACED_STRING)}
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
