// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { isEmpty, first, cloneDeep } from 'lodash';
import { Field } from 'redux-form';
import { Row, Col, Select, TextField } from '@folio/stripes/components';
import { injectCommonProp, Props, post } from '../../../../../shared';
import { decamelizify } from '../../../../../utils/Function';
import { RECORD_FIELD_STATUS, TAGS, TAGS_NAME } from '../../../Utils/MarcConstant';
import * as C from '../../../../../config/constants';
import { buildUrl } from '../../../../../redux';
import { MarcField } from '../../..';
import style from '../../../Style/index.css';
import { ACTION } from '../../../../../redux/actions/Actions';


class Tag008 extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isChangedHeaderType: false,
      currentHeaderTypeCode: 0,
      expand008: false,
      displayValue: undefined,
      jsonReq: {}
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.changeDisplayValue = this.changeDisplayValue.bind(this);
  }

  handleOnChange = (e) => {
    const { dispatch, leaderValue, record } = this.props;
    const { currentHeaderTypeCode } = this.state;
    let headerTypeCode = e.target.value;
    if (currentHeaderTypeCode !== headerTypeCode) {
      this.state.isChangedHeaderType = true;
    } else {
      headerTypeCode = currentHeaderTypeCode;
    }
    dispatch({ type: ACTION.VALUES_FROM_TAG_008, leader: leaderValue, code: TAGS._008, typeCode: headerTypeCode });
    first(record.fields.filter(f => f.code === TAGS._008)).fieldStatus = RECORD_FIELD_STATUS.CHANGED;
  }

  populateFirstAccess = () => {
    const { record, leaderValue, dispatch, change } = this.props;
    const tag008 = first(record.fields.filter(f => f.code === TAGS._008));
    tag008.fieldStatus = RECORD_FIELD_STATUS.CHANGED;
    this.state.currentHeaderTypeCode = tag008.fixedField.headerTypeCode;
    dispatch({ type: ACTION.VALUES_FROM_TAG_008, leader: leaderValue, code: TAGS._008, typeCode: tag008.fixedField.headerTypeCode });
    dispatch(change(TAGS_NAME._008, tag008.fixedField.headerTypeCode));
  };

  changeDisplayValue = (e) => {
    const { store: { getState }, tag008ValuesResults } = this.props;
    const { currentHeaderTypeCode, isChangedHeaderType } = this.state;
    let { jsonReq } = this.state;
    if (isChangedHeaderType) {
      jsonReq = {};
    }
    if (isEmpty(jsonReq)) {
      jsonReq.dateFirstPublication = '    ';
      jsonReq.dateLastPublication = '    ';
      Object.keys(tag008ValuesResults.results).map((key) => tag008ValuesResults.results[key]).map((x) => jsonReq[x.name] = x.defaultValue);
    }
    const changedFieldLabel = (e.target) ? e.target.name.split('-')[1] : '';
    jsonReq.dateEnteredOnFile = getState().form.bibliographicRecordForm.values[TAGS._008].substring(0, 6);
    jsonReq.categoryCode = 1;
    jsonReq.sequenceNumber = 0;
    jsonReq.headerTypeCode = currentHeaderTypeCode;
    jsonReq.code = TAGS._008;
    jsonReq.displayValue = '';
    if (changedFieldLabel === 'dateFirstPublication' || changedFieldLabel === 'dateLastPublication') {
      jsonReq[changedFieldLabel] = e.target.value.lenght < 4 ? '' : e.target.value;
    } else {
      jsonReq[changedFieldLabel] = e.target.value;
    }
    this.asyncChangeDisplayValue(jsonReq);
    this.state.jsonReq = jsonReq;
    this.state.isChangedHeaderType = false;
  };

  asyncChangeDisplayValue = async (jsonReq) => {
    const { dispatch, change } = this.props;
    await post(buildUrl(C.ENDPOINT.CHANGE_DISPLAY_VALUE, C.ENDPOINT.DEFAULT_LANG_VIEW), jsonReq)
      .then((r) => { return r.json(); }).then((data) => {
        dispatch(change(TAGS._008, data.displayValue));
        this.setState((prevState) => {
          const newState = cloneDeep(prevState);
          newState.displayValue = data.displayValue;
          return newState;
        });
      });
  }

  render() {
    const {
      headerTypesResult,
      store: { getState },
      tag008Values,
      leaderValue,
      newValuesFromChangedLeader,
      dispatch,
      change,
      tag,
    } = this.props;
    const { displayValue, currentHeaderTypeCode, jsonReq } = this.state;
    const { expand008 } = this.state;
    if (!tag008Values) {
      this.populateFirstAccess();
    }
    const remappedValues = [];
    let result = newValuesFromChangedLeader || tag008Values;
    result = (result) ? Object.keys(result.results).map((key) => result.results[key]) : [];
    remappedValues.push(result);

    if (newValuesFromChangedLeader && newValuesFromChangedLeader.headerTypeCode !== currentHeaderTypeCode) {
      dispatch({ type: ACTION.VALUES_FROM_TAG_008, leader: leaderValue, code: TAGS._008, typeCode: newValuesFromChangedLeader.headerTypeCode });
      dispatch(change(TAGS_NAME._008, newValuesFromChangedLeader.headerTypeCode));
      this.setState({ currentHeaderTypeCode: newValuesFromChangedLeader.headerTypeCode });
      let json = Object.assign({}, jsonReq);
      json = {};
      json.dateFirstPublication = '    ';
      json.dateLastPublication = '    ';
      json.dateEnteredOnFile = getState().form.bibliographicRecordForm.values[TAGS._008].substring(0, 6);
      json.categoryCode = 1;
      json.sequenceNumber = 0;
      json.headerTypeCode = currentHeaderTypeCode;
      json.code = TAGS._008;
      Object.keys(tag008Values.results).map((key) => tag008Values.results[key]).map((x) => json[x.name] = x.defaultValue);
      this.asyncChangeDisplayValue(json);
    }

    return (
      <div className={style.controlFieldContainer}>
        <MarcField
          {...this.props}
          readOnly
          label={tag.fixedField.code}
          name={tag.fixedField.code}
          value={displayValue || tag.fixedField.displayValue}
          onClick={() => { this.setState({ expand008: !expand008 }); }}
        />
        {headerTypesResult &&
          <div className={(expand008) ? style.leaderResultsActive : style.leaderResults}>
            <Row>
              <Col xs={4}>
                <Field
                  id="Tag008"
                  name="Tag008"
                  onChange={this.handleOnChange}
                  component={Select}
                  label="Header types"
                  placeholder="Select header..."
                  dataOptions={headerTypesResult.headingTypes}
                />
              </Col>
            </Row>
            <hr />
            <Row xs={12}>
              <Col xs={4} key="Tag008-dateFirstPublication">
                <Field
                  name="Tag008-dateFirstPublication"
                  id="Tag008-dateFirstPublication"
                  component={TextField}
                  label="dateFirstPublication"
                  onChange={this.changeDisplayValue}
                />
              </Col>
              <Col xs={4} key="Tag008-dateLastPublication">
                <Field
                  name="Tag008-dateLastPublication"
                  id="Tag008-dateLastPublication"
                  component={TextField}
                  label="dateLastPublication"
                  onChange={this.changeDisplayValue}
                />
              </Col>
              {tag008Values &&
              remappedValues.map((elem) => {
                return elem.map((item, idx) => {
                  let exactDisplayValue = C.EMPTY_STRING;
                  item.dropdownSelect.filter(x => (x.value === item.defaultValue ? exactDisplayValue = x.label : exactDisplayValue));
                  return (
                    <Col xs={4} key={`Tag008-${idx}`}>
                      <Field
                        name={`Tag008-${item.name}`}
                        id={`Tag008-${item.name}`}
                        component={Select}
                        label={decamelizify(`${item.name}`, C.EMPTY_SPACED_STRING)}
                        dataOptions={item.dropdownSelect}
                        onChange={this.changeDisplayValue}
                        placeholder={exactDisplayValue}
                      />
                    </Col>
                  );
                });
              })
              }
            </Row>
          </div>
        }
      </div>
    );
  }
}
export default (connect(
  ({ marccat: { headerTypes008, tag008Values, change008ByLeader } }) => ({
    headerTypesResult: headerTypes008.records,
    tag008ValuesResults: tag008Values.records,
    newValuesFromChangedLeader: change008ByLeader.records
  }),
)(injectCommonProp(Tag008)));
