/**
 * @format
 * @flow
 */
import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { Row, Col, Select } from '@folio/stripes/components';
import { injectCommonProp, Props } from '../../../../core';
import { EMPTY_SPACED_STRING, EMPTY_STRING } from '../../../../shared/Constants';
import { decamelizify } from '../../../../shared/Function';
import { TAGS_NAME, TAG007_DISPLAY_VALUE_DEFAULT, TAGS } from '../../Utils/MarcConstant';
import { handleTagXXXHeaderTypeChange } from '../../Utils/MarcApiUtils';
import { ActionTypes } from '../../../../redux/actions';

export class Tag007 extends React.Component<Props, {}> {
  handleOnChange = (e) => {
    const headerTypeCode = (e && e.target) ? e.target.value : 23;
    const tag = {
      action: ActionTypes.VALUES_FROM_TAG_007,
      code: TAGS._007,
      name: TAGS_NAME._007,
      default: TAG007_DISPLAY_VALUE_DEFAULT
    };
    handleTagXXXHeaderTypeChange(this.props, tag, headerTypeCode);
  }

  changeDisplayValue = () => {

  }

  render() {
    const { headerTypesResult, tag007ValuesResults, change, dispatch } = this.props;
    const remappedValues = [];
    if (tag007ValuesResults) {
      const result = Object.keys(tag007ValuesResults.results).map((key) => tag007ValuesResults.results[key]);
      remappedValues.push(result);
    } else {
      this.handleOnChange();
    }
    return (headerTypesResult) ? (
      <div>
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
                  dispatch(change(`${TAGS_NAME._007}-${item.name}`, exactDisplayValue));
                  return (
                    <Col xs={4}>
                      <Field
                        component={Select}
                        name={`${TAGS_NAME._007}-${item.name}`}
                        id={`${TAGS_NAME._007}-${item.name}`}
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
  ({ marccat: { data, headerTypes007, tag007Values } }) => ({
    leaderValue: data.emptyRecord.results.leader.value,
    headerTypesResult: headerTypes007.records,
    tag007ValuesResults: tag007Values.records
  }),
)(injectCommonProp(Tag007)));
