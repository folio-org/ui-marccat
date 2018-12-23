/**
 * @format
 * @flow
 */
import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Icon, Selection } from '@folio/stripes/components';
import { injectCommonProp, Props } from '../../../../core';
import style from '../style.css';

type P = Props & {
}

export class CustomLeader extends React.Component<P, {}> {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { leaderValuesResults } = this.props;
    if (leaderValuesResults === undefined) {
      return <Icon icon="spinner-ellipsis" />;
    } else {
      return (
        <div className={style.rcornerspanel} id="rcornerspanel">
          <Row>
            <Col xs={4}>
              <Selection
                label={leaderValuesResults.characterCodingSchemeCode.name}
                placeholder={leaderValuesResults.characterCodingSchemeCode.defaultValue}
                dataOptions={leaderValuesResults.characterCodingSchemeCode.dropdownSelect}
              />
            </Col>
            <Col xs={4}>
              <Selection
                label={leaderValuesResults.descriptiveCataloguingCode.name}
                placeholder={leaderValuesResults.descriptiveCataloguingCode.defaultValue}
                dataOptions={leaderValuesResults.descriptiveCataloguingCode.dropdownSelect}
              />
            </Col>
            <Col xs={4}>
              <Selection
                label={leaderValuesResults.encodingLevel.name}
                placeholder={leaderValuesResults.encodingLevel.defaultValue}
                dataOptions={leaderValuesResults.encodingLevel.dropdownSelect}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <Selection
                label={leaderValuesResults.itemBibliographicLevelCode.name}
                placeholder={leaderValuesResults.itemBibliographicLevelCode.defaultValue}
                dataOptions={leaderValuesResults.itemBibliographicLevelCode.dropdownSelect}
              />
            </Col>
            <Col xs={4}>
              <Selection
                label={leaderValuesResults.itemControlTypeCode.name}
                placeholder={leaderValuesResults.itemControlTypeCode.defaultValue}
                dataOptions={leaderValuesResults.itemControlTypeCode.dropdownSelect}
              />
            </Col>
            <Col xs={4}>
              <Selection
                label={leaderValuesResults.itemRecordStatusCode.name}
                placeholder={leaderValuesResults.itemRecordStatusCode.defaultValue}
                dataOptions={leaderValuesResults.itemRecordStatusCode.dropdownSelect}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <Selection
                label={leaderValuesResults.itemRecordTypeCode.name}
                placeholder={leaderValuesResults.itemRecordTypeCode.defaultValue}
                dataOptions={leaderValuesResults.itemRecordTypeCode.dropdownSelect}
              />
            </Col>
            <Col xs={4}>
              <Selection
                label={leaderValuesResults.linkedRecordCode.name}
                placeholder={leaderValuesResults.linkedRecordCode.defaultValue}
                dataOptions={leaderValuesResults.linkedRecordCode.dropdownSelect}
              />
            </Col>
          </Row>
        </div>
      );
    }
  }
}

export default (connect(
  ({ marccat: { leaderValues } }) => ({
    leaderValuesResults: leaderValues.records.results
  }),
)(injectCommonProp(CustomLeader)));
