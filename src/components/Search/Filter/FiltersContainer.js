import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { RecordFilter, SuppressedFilter, LanguageFilter, FormatTypeFilter, FilterTest } from '.';

export default class FiltersContainer extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col xs={12}>
            <FilterTest {...this.props} />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <RecordFilter {...this.props} />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <SuppressedFilter {...this.props} />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <LanguageFilter {...this.props} />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <FormatTypeFilter {...this.props} />
          </Col>
        </Row>
      </div>
    );
  }
}

