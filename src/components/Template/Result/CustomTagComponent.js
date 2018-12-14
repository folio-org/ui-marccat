import React from 'react';
import { connect } from 'react-redux';
import { TextField } from '@folio/stripes-components';
import { Row, Col } from 'react-flexbox-grid';
import type { Props } from '../../../core';
import { injectCommonProp } from '../../../core';
import style from './style.css';

type P = Props & {
}

export class CustomTagComponent extends React.Component<P, {}> {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  render() {
    return (
      <div className={style.rcornerspanel} id="rcornerspanel">
        <Row>
          <Col xs={3}>
            <TextField
              type="text"
              label="Type"
            />
          </Col>
          <Col xs={3}>
            <TextField
              type="text"
              label="Type"
            />
          </Col>
          <Col xs={3}>
            <TextField
              type="text"
              label="Type"
            />
          </Col>
          <Col xs={3}>
            <TextField
              type="text"
              label="Type"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={3}>
            <TextField
              type="text"
              label="Type"
            />
          </Col>
          <Col xs={3}>
            <TextField
              type="text"
              label="Type"
            />
          </Col>
          <Col xs={3}>
            <TextField
              type="text"
              label="Type"
            />
          </Col>
          <Col xs={3}>
            <TextField
              type="text"
              label="Type"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={3}>
            <TextField
              type="text"
              label="Type"
            />
          </Col>
          <Col xs={3}>
            <TextField
              type="text"
              label="Type"
            />
          </Col>
          <Col xs={3}>
            <TextField
              type="text"
              label="Type"
            />
          </Col>
          <Col xs={3}>
            <TextField
              type="text"
              label="Type"
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default (connect(
  ({ marccat: { template } }) => ({
    templateById: template.recordsById,
  }),
)(injectCommonProp(CustomTagComponent)));
