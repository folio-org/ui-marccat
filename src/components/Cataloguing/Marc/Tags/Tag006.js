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
import { TAGS_NAME, TAG006_DISPLAY_VALUE_DEFAULT, TAGS } from '../../Utils/MarcConstant';
import { handleTagXXXHeaderTypeChange } from '../../Utils/MarcApiUtils';
import { ActionTypes } from '../../../../redux/actions';
import { post } from '../../../../core/api/HttpService';

export class Tag006 extends React.Component<Props, {}> {
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
      action: ActionTypes.VALUES_FROM_TAG_006,
      code: TAGS._006,
      name: TAGS_NAME._006,
      default: TAG006_DISPLAY_VALUE_DEFAULT
    };
    handleTagXXXHeaderTypeChange(this.props, tag, headerTypeCode);
    this.state.isChangedHeaderType = true;
  }

  changeDisplayValue = (e) => {
    const { store: { getState }, tag006ValuesResults } = this.props;
    const { isChangedHeaderType } = this.state;
    const formData = getState().form.bibliographicRecordForm.values;
    let { jsonReq } = this.state;
    if (isChangedHeaderType) {
      jsonReq = {};
    }
    if (isEmpty(jsonReq)) {
      Object.keys(tag006ValuesResults.results).map((key) => tag006ValuesResults.results[key]).map((x) => jsonReq[x.name] = x.defaultValue);
    }
    const changedFieldLabel = (e.target) ? e.target.name.split('-')[1] : EMPTY_STRING;
    const changedFieldValue = e.target.value;
    jsonReq.categoryCode = 1;
    jsonReq.sequenceNumber = 0;
    jsonReq.headerTypeCode = formData.Tag006;
    jsonReq.code = TAGS._006;
    jsonReq.languageCode = formData['Tag006-languageCode'] || 'ita';
    jsonReq.displayValue = EMPTY_STRING;
    jsonReq[changedFieldLabel] = changedFieldValue;

    this.asyncChangeDisplayValue(jsonReq);
  };

  asyncChangeDisplayValue = async (jsonReq) => {
    const { dispatch, change } = this.props;
    await post(buildUrl(ENDPOINT.CHANGE_DISPLAY_VALUE, ENDPOINT.DEFAULT_LANG_VIEW), jsonReq)
      .then((r) => { return r.json(); }).then((data) => {
        dispatch(change(TAGS._006, data.displayValue));
      });
  }

  render() {
    const { headerTypesResult, tag006ValuesResults } = this.props;
    const remappedValues = [];
    if (tag006ValuesResults) {
      const result = Object.keys(tag006ValuesResults.results).map((key) => tag006ValuesResults.results[key]);
      remappedValues.push(result);
    } else {
      this.handleOnChange();
    }
    return (headerTypesResult) ? (
      <div>
        <Row>
          <Col xs={4}>
            <Field
              id={`${TAGS_NAME._006}`}
              name={`${TAGS_NAME._006}`}
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
            (tag006ValuesResults) &&
              remappedValues.map(elem => {
                return elem.map(item => {
                  let exactDisplayValue = EMPTY_STRING;
                  item.dropdownSelect.filter(x => (x.value === item.defaultValue ? exactDisplayValue = x.label : exactDisplayValue));
                  return (
                    <Col xs={4}>
                      <Field
                        component={Select}
                        name={`${TAGS_NAME._006}-${item.name}`}
                        id={`${TAGS_NAME._006}-${item.name}`}
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
      </div>
    ) : <div />;
  }
}

export default (connect(
  ({ marccat: { data, headerTypes006, tag006Values } }) => ({
    leaderValue: data.emptyRecord.results.leader.value,
    headerTypesResult: headerTypes006.records,
    tag006ValuesResults: tag006Values.records
  }),
)(injectCommonProp(Tag006)));
