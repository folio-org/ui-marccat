/**
 * @format
 * @flow
 */
import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { Row, Col, Select } from '@folio/stripes/components';
import { injectCommonProp, Props } from '../../../../core';
import { decamelizify } from '../../../../shared/Function';
import { EMPTY_SPACED_STRING, EMPTY_STRING } from '../../../../shared/Constants';
import { TAGS_NAME, TAG006_DISPLAY_VALUE_DEFAULT, TAGS } from '../../Utils/MarcConstant';
import { handleTagXXXHeaderTypeChange } from '../../Utils/MarcApiUtils';
import { ActionTypes } from '../../../../redux/actions';

export class Tag006 extends React.Component<Props, {}> {
  handleOnChange = (e) => {
    const headerTypeCode = (e && e.target) ? e.target.value : 16;
    const tag = {
      action: ActionTypes.VALUES_FROM_TAG_006,
      code: TAGS._006,
      name: TAGS_NAME._006,
      default: TAG006_DISPLAY_VALUE_DEFAULT
    };
    handleTagXXXHeaderTypeChange(this.props, tag, headerTypeCode);
  }

  changeDisplayValue = () => {
    // const { store: { getState }, dispatch } = this.props;
    // // const form = getState().form.bibliographicRecordForm.values;
    // dispatch(changeDisplayValueAction(TAGS._006, {}));
  }

  render() {
    const { store, headerTypesResult, tag006ValuesResults, dispatch, change, reset } = this.props;
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
                  reset(store.getState().form.bibliographicRecordForm.fields.Tag006);
                  dispatch(change(`${TAGS_NAME._006}-${item.name}`, exactDisplayValue));
                  return (
                    <Col xs={4}>
                      <Field
                        component={Select}
                        name={`${TAGS_NAME._006}-${item.name}`}
                        id={`${TAGS_NAME._006}-${item.name}`}
                        label={decamelizify(`${item.name}`, EMPTY_SPACED_STRING)}
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
