import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { RecordFilter, SuppressedFilter, LanguageFilter, FormatTypeFilter } from '../../Search/Filter/';

export default class FiltersContainer extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col xs={12}>
            <RecordFilter />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <SuppressedFilter />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <LanguageFilter />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <FormatTypeFilter />
          </Col>
        </Row>
      </div>
    );
  }
}

