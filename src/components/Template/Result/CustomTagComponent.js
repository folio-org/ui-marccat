import React from 'react';
import { connect } from 'react-redux';
import { Icon, Selection } from '@folio/stripes-components';
import { Row, Col } from 'react-flexbox-grid';
import type { Props } from '../../../core';
import { injectCommonProp } from '../../../core';
import style from './style.css';

type P = Props & {
}

export class CustomTagComponent extends React.Component<P, {}> {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { tagValuesResults } = this.props;
    if (tagValuesResults === undefined) {
      return <Icon icon="spinner-ellipsis" />;
    } else {
      return (
        <div className={style.rcornerspanel} id="rcornerspanel">
          <Row>
            <Col xs={4}>
              <Selection
                label={tagValuesResults.results.characterCodingSchemeCode.name}
                placeholder={tagValuesResults.results.characterCodingSchemeCode.defaultValue}
                dataOptions={tagValuesResults.results.characterCodingSchemeCode.dropdownSelect}
              />
            </Col>
            <Col xs={4}>
              <Selection
                label={tagValuesResults.results.descriptiveCataloguingCode.name}
                placeholder={tagValuesResults.results.descriptiveCataloguingCode.defaultValue}
                dataOptions={tagValuesResults.results.descriptiveCataloguingCode.dropdownSelect}
              />
            </Col>
            <Col xs={4}>
              <Selection
                label={tagValuesResults.results.encodingLevel.name}
                placeholder={tagValuesResults.results.encodingLevel.defaultValue}
                dataOptions={tagValuesResults.results.encodingLevel.dropdownSelect}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <Selection
                label={tagValuesResults.results.itemBibliographicLevelCode.name}
                placeholder={tagValuesResults.results.itemBibliographicLevelCode.defaultValue}
                dataOptions={tagValuesResults.results.itemBibliographicLevelCode.dropdownSelect}
              />
            </Col>
            <Col xs={4}>
              <Selection
                label={tagValuesResults.results.itemControlTypeCode.name}
                placeholder={tagValuesResults.results.itemControlTypeCode.defaultValue}
                dataOptions={tagValuesResults.results.itemControlTypeCode.dropdownSelect}
              />
            </Col>
            <Col xs={4}>
              <Selection
                label={tagValuesResults.results.itemRecordStatusCode.name}
                placeholder={tagValuesResults.results.itemRecordStatusCode.defaultValue}
                dataOptions={tagValuesResults.results.itemRecordStatusCode.dropdownSelect}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <Selection
                label={tagValuesResults.results.itemRecordTypeCode.name}
                placeholder={tagValuesResults.results.itemRecordTypeCode.defaultValue}
                dataOptions={tagValuesResults.results.itemRecordTypeCode.dropdownSelect}
              />
            </Col>
            <Col xs={4}>
              <Selection
                label={tagValuesResults.results.linkedRecordCode.name}
                placeholder={tagValuesResults.results.linkedRecordCode.defaultValue}
                dataOptions={tagValuesResults.results.linkedRecordCode.dropdownSelect}
              />
            </Col>
          </Row>
        </div>
      );
    }
  }
}

export default (connect(
  ({ marccat: { tagValues } }) => ({
    tagValuesResults: tagValues.records.results
  }),
)(injectCommonProp(CustomTagComponent)));
