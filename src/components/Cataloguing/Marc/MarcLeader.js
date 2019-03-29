/**
 * @format
 * @flow
 */
import React from 'react';
import { Field } from 'redux-form';
import { head } from 'ramda';
import { Row, Col, Select } from '@folio/stripes/components';
import type { Props } from '../../../core';
import MarcField from './MarcField';
import { EMPTY_STRING, EMPTY_SPACED_STRING } from '../../../shared/Constants';
import style from '../Style/style.css';
import { decamelizify } from '../../../shared/Function';
import { fixedFieldByLeaderAction } from '../Actions/MarcActionCreator';
import { TAGS } from '../Utils/MarcUtils';


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
      leaderCss: false,
      leaderVal: props.leaderValue,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   *
   * @param {*} string - a current leader
   * @param {*} index - index to replace
   * @param {*} replace - a mutate leader
   */
  replaceAt(string, index, replace) {
    this.setState({
      leaderVal: string.substring(0, index) + replace + string.substring(index + 1)
    });
  }

  handleChangeDisplayValueTag008 = (leader) => {
    const { dispatch } = this.props;
    const payload = { leader, tag: TAGS._008 };
    dispatch(fixedFieldByLeaderAction(payload));
  };

  handleChange = () => {
    const { store: { getState } } = this.props;
    const { leaderVal } = this.state;
    const formData = getState().form.bibliographicRecordForm.values;
    Object.keys(formData)
      .forEach((k) => {
        if (head(k.split('-')) === 'Leader') {
          switch (k.split('-')[1]) {
          case 'itemRecordStatusCode': this.replaceAt(leaderVal, 5, formData[k]); break;
          case 'itemRecordTypeCode': this.replaceAt(leaderVal, 6, formData[k]); this.handleChangeDisplayValueTag008(leaderVal); break;
          case 'itemBibliographicLevelCode': this.replaceAt(leaderVal, 7, formData[k]); this.handleChangeDisplayValueTag008(leaderVal); break;
          case 'itemControlTypeCode': this.replaceAt(leaderVal, 8, formData[k]); break;
          case 'characterCodingSchemeCode': this.replaceAt(leaderVal, 9, formData[k]); break;
          case 'encodingLevel': this.replaceAt(leaderVal, 17, formData[k]); break;
          case 'descriptiveCataloguingCode': this.replaceAt(leaderVal, 18, formData[k]); break;
          case 'linkedRecordCode': this.replaceAt(leaderVal, 19, formData[k]); break;
          default: break;
          }
        }
      });
  };

  render() {
    const { leaderCss, leaderVal } = this.state;
    const { leaderData, leaderValue, dispatch, change } = this.props;
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
          onClick={() => this.setState({ leaderCss: !leaderCss })}
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
                        dispatch(change(`Tag008-${item.name}`, exactDisplayValue));
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
