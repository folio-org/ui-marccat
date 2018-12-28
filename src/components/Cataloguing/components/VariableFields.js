/**
 * @format
 * @flow
 */
import React from 'react';
import {
  Row,
  Col
} from '@folio/stripes/components';
import type { Props } from '../../../core';
import { CheckboxIconButton } from '../../../lib';

export default class VariableFields extends React.Component<Props, {}> {
  render() {
    const labels = ['1'];
    return (
      <Row>
        <Col xs={12} sm={3} md={2} lg={1} styles={{ backgroundColor: '#0000ff',height: '40px' }} />
        <Col xs={6} sm={6} md={8} lg={10} styles={{ backgroundColor: '#0000ff' , height: '40px' }} />
        <Col xs={6} sm={3} md={2} lg={1} styles={{ backgroundColor: '#0000ff' ,height: '40px' }} />
      </Row>
    );
  }
}
//        <CheckboxIconButton labels={labels} />