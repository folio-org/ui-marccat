/**
 * @format
 * @flow
 */
import React from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { Field } from 'redux-form';
import { Row, Col, Select } from '@folio/stripes/components';
import { injectCommonProp, Props } from '../../../../core';
import { decamelizify, buildUrl } from '../../../../shared/Function';
import {
  EMPTY_SPACED_STRING,
  EMPTY_STRING,
  ENDPOINT,
} from '../../../../shared/Constants';
import { TAGS_NAME, TAG007_DISPLAY_VALUE_DEFAULT, TAGS } from '../../Utils/MarcConstant';
import { handleTagXXXHeaderTypeChange } from '../../Utils/MarcApiUtils';
import { ActionTypes } from '../../../../redux/actions';
import { post } from '../../../../core/api/HttpService';

export class Tag007 extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isChangedHeaderType: false,
      jsonReq: {}
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.changeDisplayValue = this.changeDisplayValue.bind(this);
  }

  handleOnChange = (e) => {
    const headerTypeCode = (e && e.target) ? e.target.value : 16;
    const tag = {
      action: ActionTypes.VALUES_FROM_TAG_007,
      code: TAGS._007,
      name: TAGS_NAME._007,
      default: TAG007_DISPLAY_VALUE_DEFAULT
    };
    handleTagXXXHeaderTypeChange(this.props, tag, headerTypeCode);
    this.state.isChangedHeaderType = true;
  }

  changeDisplayValue = (e) => {
    const { store: { getState }, tag007ValuesResults } = this.props;
    const { isChangedHeaderType } = this.state;
    const formData = getState().form.bibliographicRecordForm.values;
    let { jsonReq } = this.state;
    if (isChangedHeaderType) {
      jsonReq = {};
    }
    if (isEmpty(jsonReq)) {
      Object.keys(tag007ValuesResults.results).map((key) => tag007ValuesResults.results[key]).map((x) => jsonReq[x.name] = x.defaultValue);
    }
    const changedFieldLabel = (e.target) ? e.target.name.split('-')[1] : EMPTY_STRING;
    const changedFieldValue = EMPTY_STRING;
    jsonReq.dateEnteredOnFile = getState().form.bibliographicRecordForm.values[TAGS._007].substring(0, 6);
    jsonReq.categoryCode = 1;
    jsonReq.sequenceNumber = 0;
    jsonReq.headerTypeCode = formData.Tag007;
    jsonReq.code = TAGS._007;
    jsonReq.languageCode = formData['Tag007-languageCode'] || 'ita';
    jsonReq.displayValue = EMPTY_STRING;
    jsonReq[changedFieldLabel] = changedFieldValue;

    this.asyncChangeDisplayValue(jsonReq);
  };

   asyncChangeDisplayValue = async (jsonReq) => {
     const { dispatch, change } = this.props;
     const response = await post(buildUrl(ENDPOINT.CHANGE_DISPLAY_VALUE, ENDPOINT.DEFAULT_LANG_VIEW), jsonReq);
     const data = await response.json;
     dispatch(change(TAGS._007, data.displayValue));
   }

   render() {
     const { headerTypesResult, tag007ValuesResults } = this.props;
     const remappedValues = [];
     if (tag007ValuesResults) {
       const result = Object.keys(tag007ValuesResults.results).map((key) => tag007ValuesResults.results[key]);
       remappedValues.push(result);
     } else {
       this.handleOnChange();
     }
     return (headerTypesResult) ? (
       <React.Fragment>
         <Row>
           <Col xs={4}>
             <Field
               id={`${TAGS_NAME._007}`}
               name={`${TAGS_NAME._007}`}
               component={Select}
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
             (tag007ValuesResults) &&
              remappedValues.map(elem => {
                return elem.map(item => {
                  let exactDisplayValue = EMPTY_STRING;
                  item.dropdownSelect.filter(x => (x.value === item.defaultValue ? exactDisplayValue = x.label : exactDisplayValue));
                  return (
                    <Col xs={4}>
                      <Field
                        component={Select}
                        name={`${TAGS_NAME._007}-${item.name}`}
                        id={`${TAGS_NAME._007}-${item.name}`}
                        label={decamelizify(`${item.name}`, EMPTY_SPACED_STRING)}
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
       </React.Fragment>
     ) : (<React.Fragment />);
   }
}

export default (connect(
  ({ marccat: { data, headerTypes007, tag007Values } }) => ({
    leaderValue: data.emptyRecord.results.leader.value,
    headerTypesResult: headerTypes007.records,
    tag007ValuesResults: tag007Values.records
  }),
)(injectCommonProp(Tag007)));
