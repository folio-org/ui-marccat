/**
 * @format
 * @flow
 */
import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { Row, Col, Select } from '@folio/stripes/components';
import { injectCommonProp, Props } from '../../../../core';
import { ActionTypes } from '../../../../redux/actions';
import { decamelizify } from '../../Utils/MarcUtils';
import { SPACED_STRING, EMPTY_MESSAGE, TAGS, INSERTED_TAGS } from '../../../../utils/Constant';


export class Tag006 extends React.Component<Props, {}> {
  constructor(props:Props) {
    super(props);
    this.state = {
      isChangedHeaderType: false,
    };
  }

  handleOnChange = (e) => {
    const { dispatch, bibliographicRecord, leaderValue } = this.props;
    const headerTypeCode = e.target.value;
    dispatch({ type: ActionTypes.VALUES_FROM_TAG_006, leader: leaderValue, code: TAGS._006, typeCode: headerTypeCode });
    this.state.isChangedHeaderType = true;
    bibliographicRecord.fields.push(INSERTED_TAGS(TAGS._006, headerTypeCode));
  }

  render() {
    const { headerTypesResult, tag006ValuesResults } = this.props;
    const { isChangedHeaderType } = this.state;
    const remappedValues = [];
    if (isChangedHeaderType && tag006ValuesResults) {
      const result = Object.keys(tag006ValuesResults.results).map((key) => tag006ValuesResults.results[key]);
      remappedValues.push(result);
    }
    return (headerTypesResult) ? (
      <div>
        <Row>
          <Col xs={4}>
            <Field
              id="Tag006"
              name="Tag006"
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
            (isChangedHeaderType === true && tag006ValuesResults) &&
              remappedValues.map(elem => {
                return elem.map(item => {
                  let exactDisplayValue = EMPTY_MESSAGE;
                  item.dropdownSelect.filter(x => (x.value === item.defaultValue ? exactDisplayValue = x.label : exactDisplayValue));
                  return (
                    <Col xs={4}>
                      <Field
                        component={Select}
                        name={`Tag006-${item.name}`}
                        id={`Tag006-${item.name}`}
                        label={decamelizify(`${item.name}`, SPACED_STRING)}
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
  ({ marccat: { template, headerTypes006, tag006Values } }) => ({
    leaderValue: template.recordsById.leader.value,
    headerTypesResult: headerTypes006.records,
    tag006ValuesResults: tag006Values.records
  }),
)(injectCommonProp(Tag006)));
