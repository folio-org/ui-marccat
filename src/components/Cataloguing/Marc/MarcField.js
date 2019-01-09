import React from 'react';
import { Field } from 'redux-form';
import { Icon } from '@folio/stripes/components';
import type { Props } from '../../../core';
import style from '../Style/style.css';
import { ActionTypes } from '../../../redux/actions';
import { MarcLeader } from './MarcLeader';


export default class MarcField extends React.Component<Props, {}> {
  constructor(props) {
    super(props);
    this.state = {
      leaderResults: false
    };
  }

  render() {
    const { leaderResults } = this.state;
    const { dispatch, change, label, name, value, leaderValuesResults, bibliographicRecord } = this.props;
    dispatch(change(name, value));
    dispatch({ type: ActionTypes.LEADER_VALUES_FROM_TAG, leader: bibliographicRecord.leader.value, code: bibliographicRecord.leader.code, typeCode: '15' });
    return (
      <div className={style.controlFieldContainer}>
        <div>
          <label htmlFor={name}>{label}</label>
          <Field
            id={name}
            name={name}
            type="text"
            component="input"
            value={value}
          />
          <div className={style.marcFieldIconCaret}>
            <Icon
              icon="caret-down"
              size="large"
              onClick={() => this.setState({
                leaderResults: true
              })}
            />
          </div>
        </div>
        <div className={leaderResults ? style.leaderResults : style.leaderResultsActive}>
          {leaderValuesResults &&
          <MarcLeader {...this.props} leaderValuesResults={leaderValuesResults} />
          }
        </div>
      </div>
    );
  }
}
